# Task 05

## Steps

### Step 1 - Delete existing service deployment

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl get deployments | grep hodapp
pingpong-hodappba     1/1     1            1           7d5h
```

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl delete deployment pingpong-hodappba
deployment.apps "pingpong-hodappba" deleted
```

### Step 2, 3 - create pod.yaml

- Image-Adresse: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice
- Create `src/kubernetes/pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: service-hodappba
spec:
    containers:
        - name: api-service
          image: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice

```

- Test if pod creation was successful

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl get pods | grep hodapp
service-hodappba                       1/1     Running   0             2m19s
```

- Wieder beenden:

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl delete -f src/kubernetes/pod.yaml
pod "service-hodappba" deleted
```

### Step 4 - Resource limits

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: service-hodappba
spec:
    containers:
        - name: api-service
          image: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice
          resources:
              requests:
                  memory: "32Mi"
              limits:
                  memory: "64Mi"
```

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl apply -f src/kubernetes/pod.yaml
pod/service-hodappba created
```

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl describe pod service-hodappba
...
Status:       Running
...
```

I assumed you mean "Status" instead of "State". I also assume that you expected the deployment to fail but it probably won't for me since I'm using Node.js instead of java. For that reason, I tried creating the pod with these values:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: service-hodappba
spec:
    containers:
        - name: api-service
          image: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice
          resources:
              requests:
                  memory: "1Mi"
              limits:
                  memory: "2Mi"
```

This puts the pod in the (I think) desired OOM state:

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl describe pod service-hodappba
...
Status:       Pending
...
Events:
  Type     Reason                  Age              From               Message
  ----     ------                  ----             ----               -------
  Normal   Scheduled               7s               default-scheduler  Successfully assigned cnc/service-hodappba to docker7
  Warning  FailedCreatePodSandBox  2s (x7 over 7s)  kubelet            Failed to create pod sandbox: rpc error: code = Unknown desc = failed to start sandbox container for pod "service-hodappba": Error response from daemon: failed to create shim task: OCI 
runtime create failed: runc create failed: unable to start container process: container init was OOM-killed (memory limit too low?): unknown
  Normal   SandboxChanged          1s (x7 over 7s)  kubelet            Pod sandbox changed, it will be killed and re-created.
```

Afterwards, I changed the memory limit back up to 256Mi as intended:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: service-hodappba
spec:
    containers:
        - name: api-service
          image: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice
          resources:
              requests:
                  memory: "32Mi"
              limits:
                  memory: "256Mi"
```

### Step 5 - create endpoints for liveness/readiness checks

- I'm using `terminus` for the liveness/readiness checks here: <https://github.com/godaddy/terminus>
  - I'm not quite satisfied with how this package works but I'll see if I can find any replacements in the future
- New `pod.yaml`:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: service-hodappba
spec:
    containers:
        - name: api-service
          image: docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice
          resources:
              requests:
                  memory: "32Mi"
              limits:
                  memory: "256Mi"
          readinessProbe:
              httpGet:
                  path: /_health/readiness
                  port: 443
          livenessProbe:
              httpGet:
                  path: /_health/liveness
                  port: 443

```

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl describe pod service-hodappba
...
    Liveness:     http-get http://:443/_health/liveness delay=0s timeout=1s period=10s #success=1 #failure=3
    Readiness:    http-get http://:443/_health/readiness delay=0s timeout=1s period=10s #success=1 #failure=3
...
```

### Step 6 - Port forwarding

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl port-forward service-hodappba 34000:443
Forwarding from 127.0.0.1:34000 -> 443
Forwarding from [::1]:34000 -> 443
Handling connection for 34000
Handling connection for 34000
Handling connection for 34000
```
