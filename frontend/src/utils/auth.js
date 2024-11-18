
class Auth {
    static TOKEN = "authToken";
    static EXPIRATION = "tokenExpiration";

    static isTokenExpired() {
        const expirationTime = localStorage.getItem(this.EXPIRATION);

        if(!expirationTime || isNaN(expirationTime)) {
            return true;
        }

        return new Date().getTime() > expirationTime;
    }

    static logout() {
        localStorage.removeItem(this.TOKEN);
        localStorage.removeItem(this.EXPIRATION);
    }

    static isAuthenticated() {
        if(this.isTokenExpired()) {
            this.logout();
            window.location.href="/login";
            return false;
        } else if(!localStorage.getItem(this.TOKEN)) {
            return false;
        }
        return true;
    }
}

export default Auth;