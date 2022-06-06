# Task 10

## Subtask 01-03 - HTTP Request

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

## Subtask 04-09 - RabbitMQ

- Using [amqplib](https://www.npmjs.com/package/amqplib) for RabbitMQ in TypeScript
- Trying out this example with adjusted values for our config: <https://www.rabbitmq.com/tutorials/tutorial-one-javascript.html>
- Trying connection with `amqp.connect("amqp://cnc:cnc@localhost:5672", (error0, connection) => {` - not working yet
  - Trying URL `amqp://cnc:cnc@localhost/rabbitmq:5672` instead...
  - `amqp://cnc:cnc@rabbitmq.rabbitmq:5672/cnc` this way maybe?
    - Also turned to <https://www.rabbitmq.com/uri-spec.html> for hints
  - This worked: `amqp://cnc:cnc@rabbitmq.rabbitmq:5672//cnc`
    - For some reason, the vhost needs two forward slashes
- Seems like I also used a classic instead of a quorum queue
  - I don't really know the difference, but yeah. Still seems to work, yay!

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ kubectl logs -l author=hodappba
{"level":30,"time":1654552333358,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552333360,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Received Hello world"}
{"level":30,"time":1654552334358,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552334360,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Received Hello world"}
{"level":30,"time":1654552335359,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552335361,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Received Hello world"}
{"level":30,"time":1654552336359,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552336361,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Received Hello world"}
{"level":30,"time":1654552337359,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552337362,"pid":18,"hostname":"service-hodappba-85fcfd8b86-8xrnq","msg":" [x] Received Hello world"}
{"level":30,"time":1654552333681,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552333683,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Received Hello world"}
{"level":30,"time":1654552334681,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552334683,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Received Hello world"}
{"level":30,"time":1654552335681,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552335684,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Received Hello world"}
{"level":30,"time":1654552336681,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552336684,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Received Hello world"}
{"level":30,"time":1654552337681,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552337687,"pid":18,"hostname":"service-hodappba-85fcfd8b86-h4xf4","msg":" [x] Received Hello world"}
{"level":30,"time":1654552333751,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552333753,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Received Hello world"}
{"level":30,"time":1654552334750,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552334755,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Received Hello world"}
{"level":30,"time":1654552335750,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552335752,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Received Hello world"}
{"level":30,"time":1654552336750,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552336752,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Received Hello world"}
{"level":30,"time":1654552337750,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Sent Hello world"}
{"level":30,"time":1654552337752,"pid":18,"hostname":"service-hodappba-85fcfd8b86-xczzj","msg":" [x] Received Hello world"}
```
