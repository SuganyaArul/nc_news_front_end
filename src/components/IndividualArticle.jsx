import { useEffect, useState } from "react";
import { getArticleById , getArticleComments} from "../utils/api";
import {useParams} from "react-router-dom"
import CommentCard from "./CommentCard";

export default function IndividualArticle({article, setArticles}){
    const [isOpen,setIsOpen] = useState(false)
    const [comments,setComments] = useState([])
    const {article_id}=useParams()
    useEffect(()=>{
        getArticleById(article_id).then((body)=>{
            console.log(body);
            setArticles(body)
        })
        getArticleComments(article_id).then((body)=>{
            setComments(body)
        })
    },[])
    function handleComments(){
        setIsOpen(!isOpen)
    }
    return (
        <>
        <li className="article">
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <p>Title: {article.title}</p>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes}</p>
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
            <input type="text"/>
            <button>Add Comment</button>
        </div>
        </>
    )
}