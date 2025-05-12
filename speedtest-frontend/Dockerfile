# Base Image
FROM alpine:latest

# System Dependendencies
RUN apk update
RUN apk upgrade
RUN apk add npm

# Prepare User (ToDo)
RUN adduser -D frontend-user
USER frontend-user

# Copy Files
WORKDIR /home/frontend-user/app/
COPY --chown=frontend-user:frontend-user . .

# Prepare application
RUN npm install
RUN npm run build

CMD ["npx", "serve", "dist", "-l", "tcp://0.0.0.0:8080"]