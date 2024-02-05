export default function CommentCard({comment}){
    return(
        <section>
        <div className="comment">
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
        </div>
        <button>Delete Comment</button>
        </section>
    )
}