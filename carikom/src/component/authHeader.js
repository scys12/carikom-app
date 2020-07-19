export default function authHeader(){
    const user = JSON.parse(localStorage.getItem("user"));

    if(user && user.token){
        return {
            "Authorization" : `${user.type} ${user.token}`,
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*"
        };
    }else{
        return {};
    }
}