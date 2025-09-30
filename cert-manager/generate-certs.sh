#!/bin/bash

# Enhanced OpenBalena Certificate Generation Script

set -e

DOMAIN=${DOMAIN:-openbalena.local}
CERT_DIR=${CERT_DIR:-/certs}

echo "Generating certificates for domain: $DOMAIN"

# Create certificate directory structure
mkdir -p "$CERT_DIR/private"
mkdir -p "$CERT_DIR/certs"

# Generate CA private key
if [ ! -f "$CERT_DIR/private/ca-key.pem" ]; then
    echo "Generating CA private key..."
    openssl genrsa -out "$CERT_DIR/private/ca-key.pem" 4096
fi

# Generate CA certificate
if [ ! -f "$CERT_DIR/certs/ca.pem" ]; then
    echo "Generating CA certificate..."
    openssl req -new -x509 -days 365 -key "$CERT_DIR/private/ca-key.pem" \
        -out "$CERT_DIR/certs/ca.pem" \
        -subj "/C=US/ST=CA/L=San Francisco/O=Enhanced OpenBalena/CN=Enhanced OpenBalena CA"
fi

# Generate server private key
if [ ! -f "$CERT_DIR/private/server-key.pem" ]; then
    echo "Generating server private key..."
    openssl genrsa -out "$CERT_DIR/private/server-key.pem" 4096
fi

# Generate server certificate signing request
echo "Generating server certificate..."
openssl req -new -key "$CERT_DIR/private/server-key.pem" \
    -out "$CERT_DIR/server.csr" \
    -subj "/C=US/ST=CA/L=San Francisco/O=Enhanced OpenBalena/CN=*.$DOMAIN"

# Create extensions file for SAN
cat > "$CERT_DIR/server-extensions.cnf" << EOF
[req]
distinguished_name = req_distinguished_name
req_extensions = v3_req

[req_distinguished_name]

[v3_req]
basicConstraints = CA:FALSE
keyUsage = nonRepudiation, digitalSignature, keyEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = $DOMAIN
DNS.2 = *.$DOMAIN
DNS.3 = api.$DOMAIN
DNS.4 = registry.$DOMAIN
DNS.5 = vpn.$DOMAIN
DNS.6 = s3.$DOMAIN
DNS.7 = admin.$DOMAIN
DNS.8 = localhost
IP.1 = 127.0.0.1
EOF

# Generate server certificate
openssl x509 -req -days 365 -in "$CERT_DIR/server.csr" \
    -CA "$CERT_DIR/certs/ca.pem" \
    -CAkey "$CERT_DIR/private/ca-key.pem" \
    -CAcreateserial \
    -out "$CERT_DIR/certs/server.pem" \
    -extensions v3_req \
    -extfile "$CERT_DIR/server-extensions.cnf"

# Generate client private key
if [ ! -f "$CERT_DIR/private/client-key.pem" ]; then
    echo "Generating client private key..."
    openssl genrsa -out "$CERT_DIR/private/client-key.pem" 4096
fi

# Generate client certificate
echo "Generating client certificate..."
openssl req -new -key "$CERT_DIR/private/client-key.pem" \
    -out "$CERT_DIR/client.csr" \
    -subj "/C=US/ST=CA/L=San Francisco/O=Enhanced OpenBalena/CN=client"

openssl x509 -req -days 365 -in "$CERT_DIR/client.csr" \
    -CA "$CERT_DIR/certs/ca.pem" \
    -CAkey "$CERT_DIR/private/ca-key.pem" \
    -CAcreateserial \
    -out "$CERT_DIR/certs/client.pem"

# Set proper permissions
chmod 600 "$CERT_DIR/private/"*
chmod 644 "$CERT_DIR/certs/"*

# Clean up temporary files
rm -f "$CERT_DIR/server.csr" "$CERT_DIR/client.csr" "$CERT_DIR/server-extensions.cnf"

echo "Certificates generated successfully!"
echo "CA Certificate: $CERT_DIR/certs/ca.pem"
echo "Server Certificate: $CERT_DIR/certs/server.pem"
echo "Client Certificate: $CERT_DIR/certs/client.pem"

# Keep container running
tail -f /dev/null
