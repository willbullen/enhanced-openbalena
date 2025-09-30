FROM alpine:3.18

# Install dependencies
RUN apk add --no-cache \
    openssl \
    bash \
    curl

# Create directories
RUN mkdir -p /certs /scripts

# Copy certificate generation script
COPY generate-certs.sh /scripts/
RUN chmod +x /scripts/generate-certs.sh

# Set working directory
WORKDIR /certs

# Run certificate generation
CMD ["/scripts/generate-certs.sh"]
