import Article from "./Article"
import { getArticles } from "../utils/api"
import {useSearchParams} from "react-router-dom"
import { useEffect, useState } from "react"
export default function ArticlesList({articles,setArticles}){
    const [searchParams]=useSearchParams()
    const [isLoading, setIsLoading] =useState(true)
    const topic=searchParams.get('topic')
    const sort_by=searchParams.get('sort_by')
    const order=searchParams.get('order')
    useEffect(()=>{
        getArticles(topic,sort_by,order).then((body)=>{
            setArticles(body)
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error.message);
        })
    
},[topic, sort_by,order])
    return(
        <>
        {isLoading?<p>Loading Articles. Please wait</p>:
        <ol>
        { articles.length!==0?(
            articles.articles.map((article)=>{
              return  <Article key={article.article_id} article={article}/>
            })
        ):<p>No Articles to show now.</p>}
        </ol>
        }
        </>
    )

}