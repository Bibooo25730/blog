import axios from "axios";
import { config } from "process";

const axionsInstance = axios.create({
    baseURL:'https://www.bibooo.cn/',
    timeout:60 * 1000
})

axionsInstance.interceptors.request.use(
    config=>{
        return config
    },
    error=>{
        return error
    }
)

axionsInstance.interceptors.response.use(
    res=>{
        return Promise.resolve(res)
    },
    error=>{
        return Promise.reject(error)
    }
)

const axiosFom = {
    onGet:(url,params) =>{
        return new Promise((reslove,reject)=>{
            axionsInstance.get(url,{params})
            .then(res=>reslove(res.data))
            .catch(err=>reject(err))
        })
    }
}
export default axiosFom
