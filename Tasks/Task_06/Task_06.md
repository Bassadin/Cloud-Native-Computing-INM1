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
  - `docker build -t cnc-webservice .`
  - `docker image tag cnc-webservice docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`
  - `docker image push docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`
  - This seems tedious, can't wait to automate it...

### Step 3 - deployment definition

- Created file `src/kubernetes/deployment.yaml` and update according to task description
- Delete file `src/kubernetes/pod.yaml`
- Apply deployment: `kubectl apply -f src/kubernetes/deployment.yaml`

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl get pods | grep hoda
service-hodappba-559fbbb856-7cnkv      1/1     Running            0                 13s
service-hodappba-559fbbb856-sf74p      1/1     Running            0                 13s
service-hodappba-559fbbb856-zjqvg      1/1     Running            0                 13s
```

### Step 4 - Service

