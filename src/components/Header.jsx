import { useContext } from "react"
import UserContext from "../contexts/UserContext"
import { Link } from "react-router-dom"
export default function Header({topics,setQuery,handleSort}){
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
            <div>
                <p>Sort: </p>
                <select onChange={(e)=>{     
                    handleSort(e.target.value)}}>
                    <option value='created_at-desc'>Newest Date</option>
                    <option value='created_at-asc'>Oldest Date</option>
                    <option value='comment_count-desc'>Highest Comment_count</option>
                    <option value='comment_count-asc'>Lowest Comment_count</option>
                    <option value='votes-desc'>Highest Votes</option>
                    <option value='votes-asc'>Lowest Votes</option>
                </select>
            </div>
        </header>
    )
}