import Article from "./Article"
import { getArticles } from "../utils/api"
import {useSearchParams} from "react-router-dom"
import { useEffect } from "react"
export default function ArticlesList({articles,setArticles}){
    const [searchParams]=useSearchParams()
    const topic=searchParams.get('topic')
    useEffect(()=>{
        if(topic!==undefined ){
            console.log(topic);
        getArticles(topic).then((body)=>{
            console.log(body,'response');
            setArticles(body)
        })
    }
},[])
    return(
        <ol>
        { articles.length!==0?(
            articles.articles.map((article)=>{
              return  <Article key={article.article_id} article={article}/>
            })
        ):null}
        </ol>
    )

}