import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import { Link } from "react-router-dom"
export default function Header({topics,setQuery}){
    const loggedInUser = useContext(UserContext)
    function handleEvent(e){
        if(e.target.name==='article')
        setQuery('');
    else
        setQuery(e.target.name)
    }
    return (
        <header className="head">
            <h1>NC NEWS</h1>
            <div className="user">
                <p>User: {loggedInUser.username}</p>
                <img src={loggedInUser.avatar_url}/>
            </div>
            <div>
                <Link to='/' onClick={handleEvent} name='article' className="head-link">Articles</Link>
                {topics.length!==0?(topics.topics.map((topic)=>{
                    return <Link key={topic.slug} name={topic.slug} to={{pathname:'/articles',search:`?topic=${topic.slug}`}} onClick={handleEvent} className="head-link">{topic.slug}</Link>
                })):null
                }
            </div>
        </header>
    )
}