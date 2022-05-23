# Task 09

- Using the npm mongodb package for using MongoDB
- Environment variable handling with node.js seems a little more difficult...
  - Actually, env variables from kubernetes can be passed directly into node's .env!
    - Which makes it rather easy to access
- Using [https://www.postman.com/](Postman) for test requests
  - Support for local and dev environments with different urls and such
  - Example users data from mongo: `[{"_id":"628b827b86426a791d0d6d9a","firstName":"Bart","lastName":"Mohr"},{"_id":"628b827c924f033abdc03330","firstName":"Bette","lastName":"Fahey"}]`
  - Skaffold also still workd and is pretty awesome to develop with
  - CI/CD didn't work
    - I tried using dind (docker in docker) to build an image, but didn't quite get the GitLab pipeline to work
    - Unfortunately, node doesn't seem to have a tool to build images without docker
