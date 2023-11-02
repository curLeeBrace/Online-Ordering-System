
import Cookie from 'js-cookie';

export const setCookie = (key, value, option) =>{
    Cookie.set(key, value, option);
}

export const getCookie = (key) => {
    return Cookie.get(key);

}
export const removeCookies = (keys) => {
    for(let i = 0; i < keys.length; i++) {
        Cookie.remove(keys[i]);
    }
}
export const removeCookie = (key) => {
    return Cookie.remove(key);

} 

