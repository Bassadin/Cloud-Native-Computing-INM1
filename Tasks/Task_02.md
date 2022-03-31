# Task 02

## Steps

### Step 1 - Ubuntu image

- Run command `docker pull ubuntu` in Windows Terminal shell
- Output:

```#!/bin/bash
PS C:\Users\basti> docker pull ubuntu
Using default tag: latest
latest: Pulling from library/ubuntu
4d32b49e2995: Pull complete
Digest: sha256:bea6d19168bbfd6af8d77c2cc3c572114eb5d113e6f422573c93cb605a0e2ffb
Status: Downloaded newer image for ubuntu:latest
docker.io/library/ubuntu:latest
```

- Start with docker CLI:

```#!/bin/bash
PS C:\Users\basti> docker run -it ubuntu
root@e444b39028b9:/# echo "Cloud-Native Computing"
Cloud-Native Computing
root@e444b39028b9:/#
```

### Step 2 - Container logs

- Start container again two times:

```#!/bin/bash
PS C:\Users\basti> docker run -dit --name ubuntu_1 ubuntu
PS C:\Users\basti> docker run -dit --name ubuntu_2 ubuntu
```

-
