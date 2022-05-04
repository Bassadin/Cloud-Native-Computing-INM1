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
- 
