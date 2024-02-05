import ArticlesList from "./ArticlesList"
import '../App.css'

export default function Home({articles}){
    return(
        <ArticlesList articles={articles}/>
    )
}