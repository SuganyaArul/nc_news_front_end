export default function Article({article}){
    return(
        <li className="article">
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <p>Title: {article.title}</p>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            </span>
        </li>
    )
}