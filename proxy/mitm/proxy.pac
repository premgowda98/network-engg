function FindProxyForURL(url, host) {
    // Route everything (both HTTP and HTTPS) through the local proxy
    return "PROXY 127.0.0.1:8080";
}
