import {Link} from 'react-router-dom'

export default function Article({article}){
       return(
       <Link to={`/articles/${article.article_id}`}>
        <li className="article">
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <p>{article.title}</p>
            <p>Topic: {article.topic}</p>
            <p>{article.author}📖🖊️👨‍🦳👱‍♀️</p>
            <p>{article.votes} 💙</p>
            <p>{article.comment_count} 📨</p>
            </span>
        </li>
       </Link>
    )
}