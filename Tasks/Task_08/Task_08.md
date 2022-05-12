# Task 08

## Steps

### Step 1 - Delete current resources

- Delete deployments, services, ServiceMonitors, Ingresses
- `kubectl delete service service-hodappba`
- `kubectl delete ingress ingress-hodappba`
- `kubectl delete deployment service-hodappba`
- `kubectl delete servicemonitor servicemonitor-hodappba`

### Step 2 - Helm config

- Found helm template for node.js applications: <https://github.com/tmforum-rand/nodejs-helm-chart-example>
- Create files `Chart.yaml` and `values.yaml`
- Fill those files as described in the presentation

### Step 3 - Install helm

- Install helm with `choco install kubernetes-helm`

### Step 4 - Install helm package

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ helm install service-hodappba charts/service
NAME: service-hodappba
LAST DEPLOYED: Thu May 12 09:06:43 2022
NAMESPACE: cnc
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ curl kube.informatik.hs-furtwangen.de/hodappba
Hello World from Node REST server!
```

- Sweet, that was seamless :)

### Step 5 and 6 - Jenkins

- Create `Jenkinsfile`
- Skip this for now, too complicated without jib
- Maybe i'll try it with gitlab ci/cd later

### Step 7 and 8 - Skaffold

- Install skaffold with `choco install skaffold`
- Create `skaffold.yaml`
- Change the default jib example to docker builder
