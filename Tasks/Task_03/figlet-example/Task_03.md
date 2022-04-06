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
