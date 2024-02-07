import axios from "axios";

const newsApi = axios.create({baseURL : "https://first-project-svt2.onrender.com/api"})
export const getArticles=(query,sortby,order)=>{
    return newsApi.get('/articles',{
        params:{
            topic:query,
            sort_by:sortby,
            order:order
        }
    }).then((response)=>{
        return response.data;
    })
}

export const getTopics=()=>{
    return newsApi.get('/topics').then((response)=>{
        return response.data;
    })
}

export const getArticleById=(id)=>{
    return newsApi.get(`/articles/${id}`).then((response)=>{
        return response.data.article;
    })
}

export const getArticleComments=(id)=>{
    return newsApi.get(`/articles/${id}/comments`).then((response)=>{
        return response.data;
    })
}

export const patchVotesForArticle=(id , vote)=>{
    const newVote={inc_votes :vote}
    return newsApi.patch(`/articles/${id}`,newVote).then((response)=>{
        return response.data.article;
    })
}

export const postNewComments=(id, comment)=>{
    return newsApi.post(`/articles/${id}/comments`,comment).then((response)=>{
        return response.data;
    })
}

export const deleteComments=(id)=>{
    return newsApi.delete(`/comments/${id}`).then((response)=>{
        return response.data;
    })
}