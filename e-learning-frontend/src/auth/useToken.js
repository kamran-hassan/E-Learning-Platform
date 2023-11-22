export const useToken = () => {

    const token = localStorage.getItem("e-learning-platform-token") != null ?  localStorage.getItem("e-learning-platform-token") : null;

    function setTokenInternal(token){
        if(token != null) {
            localStorage.setItem("e-learning-platform-token", token);
        } else {
            localStorage.removeItem("e-learning-platform-token");
        }
    }

    return [token, setTokenInternal];
}