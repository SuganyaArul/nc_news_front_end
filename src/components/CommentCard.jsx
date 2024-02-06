import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function CommentCard({comment}){
    const loggedInUser = useContext(UserContext)
    return(
        <section>
        <div className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            {comment.author===loggedInUser.username ?
            <button>Delete Comment</button>:null
            }
        </div>
        
        </section>
    )
}