import Article from "./Article"

export default function ArticlesList({articles}){
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