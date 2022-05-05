# Task 07

## Steps

### Step 1 - Endpoints for metrics

- Alternatives to micrometer I found for node.js:
  - <https://swaggerstats.io/>
  - <https://www.npmjs.com/package/prometheus-api-metrics>
- I'll try to use swaggerstats for now since [it is recommended on the official Prometheus site](https://prometheus.io/docs/instrumenting/exporters/#other-third-party-utilities)
- Installed swagger-stats from npm and [used it like described here](https://swaggerstats.io/guide/#express)
- Note: won't use swagger-stats after all since its intended use is with the OpenAPI 2.0 (swagger specification)
  - Will try promethues-api-metrics instead.
- Rebuild image and push to registry again...
  - `docker build docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice .`
  - `docker image push docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`
- Shutdown old pods: `kubectl delete pods -l author=hodappba`

### Step 2 - Check metrics

- Not sure why we need the portfoward here, the service is still working after all: `curl https://kube.informatik.hs-furtwangen.de/hodappba/metrics` works just fine.

### Step 3 - Prometheus service monitor

- Created `src/kubernetes/servicemonitor.yaml`
- Apply it with `kubectl apply -f`
- Check if it's running under <https://kube.informatik.hs-furtwangen.de/prometheus/targets#pool-serviceMonitor/cnc/servicemonitor-hodappba/0>

### Step 4 - Custom counter for host endpoint

- Using the prom-client peer dependency of `promethues-api-metrics` to create a prometheus counter:

```typescript
const Prometheus = require("prom-client");
...
const numberOfHostCalls = new Prometheus.Counter({
    name: "number_of_host_calls",
    help: "Total number of times the /host endpoint has been called",
});
...
router.get("/host", (request, response) => {
    numberOfHostCalls.inc();
    response.send(`The hostname is: ${os.hostname()}`);
});
```
