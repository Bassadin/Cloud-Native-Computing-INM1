# Task 08

## Steps

### Step 1 - Delete current resources

- Delete deployments, services, ServiceMonitors, Ingresses
- `kubectl delete service service-hodappba`
- `kubectl delete ingress ingress-hodappba`
- `kubectl delete deployment service-hodappba`

### Step 2 - Helm config

- Found helm template for node.js applications: <https://github.com/tmforum-rand/nodejs-helm-chart-example>
- Create files `Chart.yaml` and `values.yaml`

### Step 3 - Install helm

- Install helm with `choco install kubernetes-helm`
