const corsUrl = "http://localhost:3000"
const hostinfo = {
    PORT : 8080
}
const salt_value = 10;
const jwtSignatureSecret = "FURNCGY58FHE6GJFI09D"
const defaultExpire = '1h'

module.exports = { hostinfo, corsUrl, salt_value, jwtSignatureSecret, defaultExpire  }