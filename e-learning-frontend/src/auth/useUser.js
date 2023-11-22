import { useToken } from "./useToken"

export const useUser = () => {
    const [token, ] = useToken();

    if(token != null ){
        return JSON.parse(atob(token.split('.')[1]));   
    }
    else {
        return null;
    }
}