import {Link} from 'react-router-dom'

export default function Article({article}){
       return(
        <li className="article">
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <Link to={`/articles/${article.article_id}`}>
            <p>Title: {article.title}</p>
            </Link>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
            <p>Comment Counts: {article.comment_count}</p>
            </span>
        </li>
    )
}