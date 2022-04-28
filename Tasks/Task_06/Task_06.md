# Task 06

## Steps

### Step 1 - `/host` endpoint

- Create a `/host` endpoint in Express:

```typescript
import os from "os";

app.get("/host", (request, response) => {
    response.send(`The hostname is: ${os.hostname()}`);
});
```

### Step 2 - Set context path in deployment

- Set the equivalent of a context path (route prefix, <https://stackoverflow.com/a/47059060/3526350>) in Node.js/Express:

```typescript
const router = express.Router();

router.get("/", (request, response) => {
    response.send(`Hello World from Node REST server!`);
});

router.get("/host", (request, response) => {
    response.send(`The hostname is: ${os.hostname()}`);
});

app.use("/hodappba", router);
```

- Also edit the readiness and liveness probes to match
- Rebuild docker image and push it to the registry:
  - 