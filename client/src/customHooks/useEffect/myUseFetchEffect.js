import { useEffect } from 'react';
import { api } from '../configAxios';
import { getCookie } from '../cookiesHandler'; 

//fetch client username 
export const useFetchUsername= (username, login) => {
    useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (username == null) {
      api
        .get('/client/getUsername', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })  
        .then(res => {
          const { username } = res.data;
          login(username);
        })
        .catch(err => console.log(err));
    }
  }, []);
}


