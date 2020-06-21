import Vue from 'vue'
import axios from 'axios';


const api =  {

     getClubs() {
       return axios
            .get('https://instasport.co/dashboard/api/v1/clubs/')
            .then((response) => {
                return response.data
            })
           .catch(error =>{
               return "error value getting data from api"
           })

    }
}

export default api