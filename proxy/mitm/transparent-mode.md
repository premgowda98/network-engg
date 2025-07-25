## Run MITM in transparent mode

To run MITM in transparent mode, you need to set up your system to redirect traffic to the MITM proxy. This typically involves configuring your network settings and using tools like `iptables` on Linux.

### Install MITM Proxy
Make sure you have MITM Proxy installed. You can install it using pip:
```bash
pip install mitmproxy
```

### Update CA Certificates

To intercept HTTPS traffic, you need to install the MITM Proxy CA certificate on your system. You can do this by running:
```bash
# Copy mitmproxy root cert to system trust store
sudo cp ~/.mitmproxy/mitmproxy-ca-cert.pem /usr/local/share/ca-certificates/mitmproxy-ca-cert.crt

# Update CA trust
sudo update-ca-certificates
```

### Configure MITM Proxy

You need to set up `iptables` to redirect traffic to the MITM proxy. Here’s an example of how to do this on a Linux system:
```bash
# Enable IP forwarding
sudo sysctl -w net.ipv4.ip_forward=1

sudo iptables -t nat -A PREROUTING -i ens18 -p tcp --dport 80  -j REDIRECT --to-port 8080
sudo iptables -t nat -A PREROUTING -i ens18 -p tcp --dport 443 -j REDIRECT --to-port 8080

sudo iptables -t nat -A OUTPUT -p tcp --dport 80  -j REDIRECT --to-port 8080
sudo iptables -t nat -A OUTPUT -p tcp --dport 443 -j REDIRECT --to-port 8080

sudo mitmweb --mode transparent --showhost -p 8080
```

### Revert Changes


```bash
sudo sysctl -w net.ipv4.ip_forward=0

sudo iptables -t nat -D PREROUTING -i ens18 -p tcp --dport 80  -j REDIRECT --to-port 8080
sudo iptables -t nat -D PREROUTING -i ens18 -p tcp --dport 443 -j REDIRECT --to-port 8080


sudo iptables -t nat -D OUTPUT -p tcp --dport 80  -j REDIRECT --to-port 8080
sudo iptables -t nat -D OUTPUT -p tcp --dport 443 -j REDIRECT --to-port 8080

```

