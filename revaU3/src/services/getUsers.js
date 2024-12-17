import axios from 'axios';

export const getUsers = async () => {
    return new Promise((resolve, reject) => {
         
        const apiUrl = 'https://reqres.in/api/users';
        
        axios.get(apiUrl)
          .then((response) => {
            const data = response.data;
            console.log(data);
            resolve(data);
          })
          .catch((error) => {
            console.error("Error los usuarios:", error);
            reject(error);
          });
    
    })
}