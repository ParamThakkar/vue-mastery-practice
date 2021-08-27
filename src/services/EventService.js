import axios from 'axios';
import  NProgress  from 'nprogress';

var apiClient = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials : false,
    headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
    },
    timeout:10000
});

// apiClient.interceptors.request.use(request=>{
//     NProgress.start()
//     return request
// })

// apiClient.interceptors.response.use(response=>{
//     NProgress.done()
//     return response
// })

export default{
    getEvents(perPage,page){
        return apiClient.get("/events?_limit="+perPage+"&_page="+page);
    },
    getEvent(id)
    {
        return apiClient.get("/events/"+id)
    },
    postEvent(event)
    {
        return apiClient.post('/events',event)
    }
}