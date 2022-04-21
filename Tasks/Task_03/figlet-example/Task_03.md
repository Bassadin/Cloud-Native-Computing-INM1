# Task 03

## Steps

### Step 1 - Ubuntu figlet image with Dockerfile

- Create dockerfile in subfolder since I already created one for our web service

```dockerfile
FROM ubuntu

RUN apt-get update
RUN apt-get install figlet

ENTRYPOINT ["figlet", "-f", "slant"]
```

- Run docker build: `docker build -t ubuntu:figlet .`
- Start image with argument: `docker run ubuntu:figlet "Cloud-Native Computing"`
- Returned text:

```bash
   ________                __      _   __      __  _
  / ____/ /___  __  ______/ /     / | / /___ _/ /_(_)   _____
 / /   / / __ \/ / / / __  /_____/  |/ / __ `/ __/ / | / / _ \
/ /___/ / /_/ / /_/ / /_/ /_____/ /|  / /_/ / /_/ /| |/ /  __/
\____/_/\____/\__,_/\__,_/     /_/ |_/\__,_/\__/_/ |___/\___/

   ______                            __  _
  / ____/___  ____ ___  ____  __  __/ /_(_)___  ____ _
 / /   / __ \/ __ `__ \/ __ \/ / / / __/ / __ \/ __ `/
/ /___/ /_/ / / / / / / /_/ / /_/ / /_/ / / / / /_/ /
\____/\____/_/ /_/ /_/ .___/\__,_/\__/_/_/ /_/\__, /
                    /_/                      /____/
```

### Step 2 - Dockerizing the webservice

- Login to HFU docker registry: `docker login -u hodappba docker.informatik.hs-furtwangen.de`
- Use password prompt to authenticate (should probably use SSH key later?)
- Create Dockerfile for web service:

```dockerfile
# Dockerfile-test
FROM node:16.14.2-alpine

# Create the directory!
WORKDIR /usr/src/app

# Our precious app
COPY . .
RUN npm install
RUN npm run build

#Expose needed ports
EXPOSE 443

CMD npm run start
```

- Build docker image with a name/tag: `docker build -t cnc-webservice .`
- Tag the newly created image to be uploaded to the HFU registry `docker image tag cnc-webservice docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`
- Push the image: `docker image push docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`

### Step 3 - Check if available in the repo

- The image seems to have been successfully uploaded to the repository (<https://repo.informatik.hs-furtwangen.de/#browse/browse:docker.hosted:v2%2Fcnc-hodappba%2Fcnc-webservice>)

### Step 4 - Use the image from the registry

- Try to start the image directly from the repo: `docker run -d --name webservice-from-repo -p 8080:443 docker.informatik.hs-furtwangen.de/cnc-hodappba/cnc-webservice`
- Try to call it:

```bash
basti@BASTIAN-RTX2080 MINGW64 ~/Documents/Git-Repos/Cloud-Native-Computing-INM1 (main)
$ curl localhost:8080
Hello World from Node REST server!
```
