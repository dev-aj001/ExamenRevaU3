import axios from 'axios';

export const postUser = async (user) => {
    return new Promise((resolve, reject) => {
         
        const apiUrl = 'https://reqres.in/api/users';
        
        axios.post(apiUrl, user)
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

const user = {
    name: "morpheus",
    job: "leader"
}

postUser(user);