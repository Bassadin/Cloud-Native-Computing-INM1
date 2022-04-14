# Task 03

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

- 