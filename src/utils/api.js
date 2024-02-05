import axios from "axios";

const newsApi = axios.create({baseURL : "https://first-project-svt2.onrender.com/api"})
export const getArticles=(query)=>{
    let article = '/articles'
    if(query!== null){
        article+=`?topic=${query}`
    }
    return newsApi.get(article).then((response)=>{
        return response.data;
    })
}

export const getTopics=()=>{
    return newsApi.get('/topics').then((response)=>{
        return response.data;
    })
}