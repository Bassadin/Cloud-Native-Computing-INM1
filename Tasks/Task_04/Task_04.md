# Task 04

## Steps

### Step 1 - Install `kubectl`

- `choco install kubernetes-cli`

### Step 2 - Connect to HFU kube cluster

- `kubectl version` output:

```Powershell
PS C:\Users\basti\.kube> kubectl version
Client Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", GitTreeState:"clean", BuildDate:"2022-03-16T15:58:47Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"windows/amd64"}
Server Version: version.Info{Major:"1", Minor:"23", GitVersion:"v1.23.5", GitCommit:"c285e781331a3785a7f436042c65c5641ce8a9e9", GitTreeState:"clean", BuildDate:"2022-03-16T15:52:18Z", GoVersion:"go1.17.8", Compiler:"gc", Platform:"linux/amd64"}
```

### Step 3 - Get Nodes

- `kubectl get nodes`

```Powershell
PS C:\Users\basti\.kube> kubectl get nodes
NAME      STATUS   ROLES                                  AGE     VERSION
docker7   Ready    compute                                621d    v1.23.5
docker8   Ready    compute                                621d    v1.23.5
kube1     Ready    control-plane,ingress,master,storage   2y45d   v1.23.5
kube2     Ready    control-plane,ingress,master,storage   2y45d   v1.23.5
kube3     Ready    control-plane,ingress,master,storage   2y45d   v1.23.5
```

### Step 4 - first deployment

- `PS C:\Users\basti\.kube> kubectl create deployment pingpong-hodappba --image=jpetazzo/ping --replicas=3`

```bash
basti@YOGA-460 MINGW64 /d/Dokumente/GitHub/Cloud-Native-Computing-INM1 (main)
$ kubectl get pods | grep hodapp
pingpong-hodappba-77775fc588-g7r95     1/1     Running   0              58s
pingpong-hodappba-77775fc588-gs8hz     1/1     Running   0              58s
pingpong-hodappba-77775fc588-px5lq     1/1     Running   0              58s
```

### Step 5 - Reduce deployment replicas to 1

- `kubectl scale deployment pingpong-hodappba --replicas 1`
- `kubectl get pods`

```Powershell
PS C:\Users\basti\.kube> kubectl get pods
NAME                                   READY   STATUS    RESTARTS       AGE
...
pingpong-hodappba-77775fc588-gs8hz     1/1     Running   0              2m20s
...
```

### Step 6 - Start own service as deployment

- `kubectl create deployment service-hodappba --image="docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice"`

```bash
basti@YOGA-460 MINGW64 /d/Dokumente/GitHub/Cloud-Native-Computing-INM1 (main)
$ kubectl get pods | grep hodapp
pingpong-hodappba-77775fc588-gs8hz     1/1     Running   0              18m
service-hodappba-7568448c7f-96h8k      1/1     Running   0              80s
```

### Step 7 - get Pod IP Address

- `kubectl describe pod service-hodappba`

Output:

```bash
IP:           10.244.10.9

Conditions:
  Type              Status
  Initialized       True
  Ready             True
  ContainersReady   True
  PodScheduled      True

Events:
  Type    Reason     Age    From               Message
  ----    ------     ----   ----               -------
  Normal  Scheduled  2m49s  default-scheduler  Successfully assigned cnc/service-hodappba-7568448c7f-96h8k to docker8
  Normal  Pulling    2m49s  kubelet            Pulling image "docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice"
  Normal  Pulled     2m39s  kubelet            Successfully pulled image "docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice" in 9.811641304s
  Normal  Created    2m38s  kubelet            Created container cnc-webservice
  Normal  Started    2m38s  kubelet            Started container cnc-webservice
```

### Step 8 - delete service deployment

- `kubectl delete deployment service-hodappba`

```bash
basti@YOGA-460 MINGW64 /d/Dokumente/GitHub/Cloud-Native-Computing-INM1 (main)
$ kubectl delete deployment service-hodappba
deployment.apps "service-hodappba" deleted
```
