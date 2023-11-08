import { api } from "../customHooks/configAxios";

export const getClientData = async (accessToken) => {
    let data = null;
    try {
        
        await api.get('/client/getClientData', {
            headers : {
              'Authorization': `Bearer ${accessToken}`
            }
          })
          .then(res => {
            data = res.data;
            
          })
          .catch(err => console.log(err));

          return data;
          
    } catch (error) {
        console.log(error);
    }
   
}


