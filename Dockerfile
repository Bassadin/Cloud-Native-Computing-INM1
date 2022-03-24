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