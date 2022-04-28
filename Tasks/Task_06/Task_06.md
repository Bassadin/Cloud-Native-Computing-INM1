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

- Set the equivalent of a context path in Node.js/Express

```typescript

```