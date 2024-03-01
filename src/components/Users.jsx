import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import UserCard from "./UserCard";

export default function Users(){
    const [users, setUsers] = useState([])
    
    useEffect(()=>{
        getUsers().then((body)=>{
            setUsers(body.users)
        })
    },[])

    return(
        <main>
            <ul>
                {
                    users.map((user)=>{
                        return(
                            <li key={user.username}>
                                <UserCard user={user}/>
                            </li>
                        )
                    })
                }
            </ul>
        </main>
    )
}