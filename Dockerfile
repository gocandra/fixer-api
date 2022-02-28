FROM node:14-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY .npmrc .npmrc 

# RUN npm install
# If you are building your code for production
RUN npm ci --only=production
RUN rm -f .npmrc

# Bundle app source
COPY src/ src/

# Build Typescript
COPY tsconfig.json tsconfig.json
RUN npm install typescript --saved-dev
RUN npx tsc -p tsconfig.json
RUN rm -f tsconfig.json

EXPOSE 8080
CMD [ "node", "dist/index" ]