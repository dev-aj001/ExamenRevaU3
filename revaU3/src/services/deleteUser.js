import axios from 'axios';

export const deleteUser = async (id, user) => {
    return new Promise((resolve, reject) => {
         
        const apiUrl = `https://reqres.in/api/users/${id}`;
        
        axios.delete(apiUrl)
          .then((response) => {
            const data = response.status;
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

deleteUser(2);