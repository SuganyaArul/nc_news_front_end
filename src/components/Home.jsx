import ArticlesList from "./ArticlesList"
import '../App.css'

export default function Home({articles , setArticles}){
    return(
        <ArticlesList articles={articles} setArticles={setArticles}/>
    )
}