#----------------------------------
#    STAGE 1: Building
#----------------------------------
# Base Image
FROM debian:trixie as builder

# Install system dependency
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -f
RUN apt-get install curl build-essential -y

# Install Rustup
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | bash -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"
RUN . "$HOME/.cargo/env"

# Prepare Application
RUN mkdir app
WORKDIR /app
COPY src/ src/
COPY Cargo.toml .

# Build release binary
RUN cargo build --release

#----------------------------------
#    STAGE 2: Running
#----------------------------------
FROM debian:trixie-slim as runner

# Update dependencies
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install -f

# Set up user
RUN useradd -ms /bin/bash backend-user
USER backend-user
WORKDIR /home/backend-user

# Copy Binary
COPY --from=builder --chown=backend-user:backend-user /app/target/release/speedtest /usr/local/bin/speedtest

# Run command
USER backend-user
WORKDIR /home/backend-user
CMD ["speedtest"]
