import { Route,Routes } from "react-router-dom"
import Home from "./components/Home"
import UserContext from "./contexts/UserContext"
import { useEffect, useState } from "react"
import ArticlesList from "./components/ArticlesList"
import { getArticles , getTopics} from "./utils/api"
import Header from "./components/Header"
import IndividualArticle from "./components/IndividualArticle"

function App() {
  const [query,setQuery] =useState('')
  const [articles,setArticles] = useState([])
  const [topics,setTopics] =useState([])
  const [loggedInUser,setLoggedInUser] = useState({
    "username": "happyamy2016",
    "name": "Amy Happy",
    "avatar_url": "https://vignette1.wikia.nocookie.net/mrmen/images/7/7f/Mr_Happy.jpg/revision/latest?cb=20140102171729"
  })

  useEffect(()=>{
    getArticles(query).then((body)=>{
      setArticles(body)
    })
    getTopics().then((body)=>{
      setTopics(body)
  }).catch((err)=>{
      console.log(err,'err');
  })
  },[query])
  return (
    <div className="App">
    <UserContext.Provider value={loggedInUser}>
    <Header topics={topics} setQuery={setQuery}/>
      <Routes>
        <Route path='/' element={<Home articles={articles} setQuery={setQuery}/>}></Route>
        <Route path='/articles' element={<ArticlesList articles={articles} setArticles={setArticles}/>}></Route>
        <Route path='/articles/:article_id' element={<IndividualArticle article={articles} setArticles={setArticles}/>}></Route>
      </Routes>
    </UserContext.Provider>
    </div>
  )
}

export default App
