import { useContext, useState } from "react"
import UserContext from "../contexts/UserContext"
import { deleteComments, getArticleComments } from "../utils/api";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
export default function CommentCard({comment,setDivPointer, article_id, setComments}){
    const loggedInUser = useContext(UserContext)
    const [deleteStatus, setDeleteStatus] = useState(false)
    function handleDelete(e){
        const id=e.target.name;
        setDivPointer('pointer')
        deleteComments(id).then(()=>{
            setDivPointer('button')
            setDeleteStatus(true)
            getArticleComments(article_id).then((body)=>{
                setComments(body)
            })
        })
    }
    return(
        <section>
        <div className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            {comment.author===loggedInUser.username ?
            <button onClick={handleDelete} name={comment.comment_id}>Delete Comment</button>:null
            }
        </div>
        {deleteStatus?
        <div className='popup'>
        <div className='popup-inner'>
        <h2>Comments deleted Successfully</h2>
        <button onClick={()=>{setDeleteStatus(false)
        }}>OK</button>
        </div>
    </div> :null
}
        </section>
    )
}