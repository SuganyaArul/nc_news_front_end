import { useEffect, useState } from "react";
import { getArticleById , getArticleComments, patchVotesForArticle, postNewComments} from "../utils/api";
import {useParams} from "react-router-dom"
import CommentCard from "./CommentCard";
import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Error from "./Error";

export default function IndividualArticle({article, setArticles}){
    const loggedInUser = useContext(UserContext)
    const [isOpen,setIsOpen] = useState(false)
    const [comments,setComments] = useState([])
    const [newComment,setNewComment] = useState('')
    const [error, setError] =useState(null)
    const [likeError, setLikeError] = useState('')
    const [pointer , setPointer]=useState('button');
    const [divPointer, setDivPointer] =useState('button');
    const [noContentStatus,setNoContentStatus]=useState(false)
    const [postStatus , setPostStatus] = useState(false)
    const {article_id}=useParams()

    const [isLoading,setIsLoading] =useState(true)
    useEffect(()=>{
        getArticleById(article_id).then((body)=>{
            setArticles(body)
        })
        .then(()=>{
        return getArticleComments(article_id)
        })
        .then((body)=>{
            setComments(body)
            setIsLoading(false)
            setError(null)
        })
        .catch((err)=>{
            setIsLoading(false)
            setError(err.message)
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
            setPointer('pointer')
        })
        .catch((error)=>{
            setLikeError(error.message)
        })
    }
    function handleNewComments(e){
        e.preventDefault()
        if(newComment === ''){
            setNoContentStatus(true)
        }
        else{
            setNoContentStatus(false)
        const addComment={
            'body': newComment,
            'username':loggedInUser.username,
        }
        postNewComments(article_id , addComment).then((body)=>{
            setNewComment('')
            getArticleComments(article_id).then((body)=>{
                setComments(body)
            })
            setPostStatus(true)
        }).catch((error)=>{
            setError(error);
        })
    }
    }
    if(isLoading) return <div>🌐🌐🌐Loading Article Page. Please Wait....</div>
    if(error!==null) return <Error error={error}/>
    return (
        <>
        <li className="article" key={article.article_id}>
            <img src={article.article_img_url} alt="Images for this article"/>
            <span>
            <p>Title: {article.title}</p>
            <p>Topic: {article.topic}</p>
            <p>Author: {article.author}</p>
            <p>Votes: {article.votes} 
            {likeError!==''?(<div>Error: {likeError}</div>) :
            (<><button onClick={handleVotes} name="like" className={pointer}>like👍</button>
            <button onClick={handleVotes} name="dislike" className={pointer}>dislike👎</button></>)}
            </p>
            <button onClick={handleComments}>{isOpen?'Hide ':'Show ' }Comments</button>
            </span>
        </li>

        {
            isOpen?(
                <div className={divPointer}>
                   { comments.comments.length!==0?
                   (comments.comments.map((comment)=>{
                        return <CommentCard key={comment.comment_id} comment={comment} setComments={setComments} article_id={article_id} setDivPointer={setDivPointer}/>
                   })):<div className="error"><p>No Comments to show...</p></div>
                   }
                </div>
            ):null
        }
        <form onSubmit={handleNewComments}>
        <div>
            <h4>Add New Comments Here</h4>
            <input type="text" className="new-comment" value={newComment} onChange={(e)=>{setNewComment(e.target.value)}} required/>
            <button>Add Comment</button>
        </div>
        </form>
        
{postStatus?
        <div className='popup'>
        <div className='popup-inner'>
        <h2>Comments Submitted Successfully</h2>
        <button onClick={()=>{setPostStatus(false)
        }}>OK</button>
        </div>
    </div> :null
}
        </>
    )
}