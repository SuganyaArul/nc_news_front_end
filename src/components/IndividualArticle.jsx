import { useEffect, useState } from "react";
import { getArticleById , getArticleComments, patchVotesForArticle} from "../utils/api";
import {useParams} from "react-router-dom"
import CommentCard from "./CommentCard";

export default function IndividualArticle({article, setArticles}){
    const [isOpen,setIsOpen] = useState(false)
    const [comments,setComments] = useState([])
    const [error, setError] =useState('')
    const {article_id}=useParams()
    useEffect(()=>{
        getArticleById(article_id).then((body)=>{
            setArticles(body)
        })
        getArticleComments(article_id).then((body)=>{
            setComments(body)
        })
    },[])
    function handleComments(){
        setIsOpen(!isOpen)
    }
    function handleVotes(e){
        let newVote;
        if(e.target.name==='like')
        newVote =1;
        else
        newVote = -1;
        patchVotesForArticle(article_id , newVote).then((body)=>{
            setArticles(body)
        })
        .catch((error)=>{
            setError(error)
        })
    }
    return (
        <>
        <li className="article">
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <p>Title: {article.title}</p>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes} 
            {error!==''?(<div>Error: {error}</div>) :
            (<><button onClick={handleVotes} name="like">like</button>
            <button onClick={handleVotes} name="dislike">dislike</button></>)}
            </p>
            <button onClick={handleComments}>{isOpen?'Hide ':'Show ' }Comments</button>
            </span>
        </li>
        {
            isOpen?(
                <div>
                   { 
                   comments.comments.map((comment)=>{
                        return <CommentCard comment={comment}/>
                   })
                   }
                </div>
            ):null
        }
        <div>
            <p>Add New Comments Here</p>
            <input type="text" className="new-comment"/>
            <button>Add Comment</button>
        </div>
        </>
    )
}