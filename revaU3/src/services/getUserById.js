import axios from 'axios';

export const getUserById = async (id) => {
  return new Promise((resolve, reject) => {

    const apiUrl = `https://reqres.in/api/users/${id}`;

    axios.get(apiUrl)
      .then((response) => {
        const data = response.data.data;
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error("Error los usuarios:", error);
        reject(error);
      });

  })
}

getUserById(2);