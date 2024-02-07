import Article from "./Article"
import { getArticles } from "../utils/api"
import {useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react"
import Error from "./Error"
export default function ArticlesList({articles,setArticles}){
    const [searchParams]=useSearchParams()
    const [isLoading, setIsLoading] =useState(true)
    const [error, setError] =useState(null)
    const topic=searchParams.get('topic')
    const sort_by=searchParams.get('sort_by')
    const order=searchParams.get('order')
    useEffect(()=>{
        getArticles(topic,sort_by,order).then((body)=>{
            setArticles(body)
            setIsLoading(false)
            setError(null)
        }).catch((error)=>{
            setIsLoading(false)
            setError(error.message)
        })
    
},[topic, sort_by,order])
    if(isLoading) return <p>Loading Articles. Please wait</p>
    if(error!=null) return <Error error={error} />
    return(
        <>
        <ol>
        { articles.length!==0?(
            articles.articles.map((article)=>{
              return  <Article key={article.article_id} article={article}/>
            })
        ):<p>No Articles to show now.</p>}
        </ol>
        </>
    )

}