# Task 10

## Subtask 01-03

- Synchronous REST requests in node - I'm usually using [axios](https://github.com/axios/axios) for this at work and for my private js projects
- Forgot how to check error logs in hfu cluster.
  - Note to self: [kibana/logs](https://kube.informatik.hs-furtwangen.de/kibana/app/logs) with `kubernetes.labels.author:hodappba`
- Needed to pass in Axios base url via `.env` variable and also set that one in kubernetes template like so:

```yaml
- name: BACKEND_HOST
  value: http://localhost:{{ .Values.remote_port }}/hodappba
```

- And with that, Axios is working:

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ curl https://kube.informatik.hs-furtwangen.de/hodappba/firstUser
{"_id":"629e66855988f067f55f8857","firstName":"Tara","lastName":"Ledner"}
```

## Subtask 04