  
const axios = require('axios').default;

export async  function api(id ,url ,tag ){
   
    const instance = axios.create({
    baseURL: url,
     headers: {"accept": "application/json","apiKey":process.env.API_KEY,
    }
    });
    let res= await instance.get(`${tag}/${id}`)
    if(res && res.data){
      
       return res
    }

}



// import { BadRequestException } from "@nestjs/common";
 
// const axios = require('axios').default;

// export async  function api(id , tag){
   
//     const instance = axios.create({
//     baseURL: 'https://api.wathq.sa/v4/commercialregistration/',
//      headers: {"accept": "application/json","apiKey":process.env.API_KEY,
//     }
//     });
//     let res= await instance.get(`${tag}+'/${+id}`)
//        // console.log(res);
//      if(res && res.data){
//          if(tag==='fullinfo'){
//          return res.data.crName
//         }
//          if(tag==='info'){
//          return res.data.name
//         }
//          if(tag==='address'){
//          console.log(res.data)
       
//          return res.data
//            }
//         }
      
 
// }