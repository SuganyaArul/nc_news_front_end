import { useContext } from "react"
import UserContext from "../contexts/UserContext"

export default function UserCard({user}){
    const {loggedInUser, setLoggedInUser} =useContext(UserContext)
    return (
        <div className="users">
            <h2>{user.username}</h2>
            <img src={user.avatar_url}/>
            {user.username !== loggedInUser.username?
            <button onClick={()=>setLoggedInUser(user)}>Log In</button>:null
            }
        </div>
    )
}