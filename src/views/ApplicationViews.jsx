import { useEffect, useState } from "react"
import { Routes, Route, Outlet } from "react-router-dom"
import { PostList } from "../components/posts/PostList"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/posts/PostDetails"
import { getAllPosts } from "../services/postService"
import { getAllTopics } from "../services/topicService"
import { CreatePost } from "../forms/CreatePost"
import { MyPosts } from "../components/posts/MyPosts"


export const ApplicationViews = () => {
    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const getAndSetAllPosts = () => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }

    const getAndSetAllTopics = () => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
    }

    useEffect(() => {
        getAndSetAllPosts()
        getAndSetAllTopics()
    }, [])

    useEffect(() => {
        const localLearningUser = localStorage.getItem("learning_user")
        const learningUserObj = JSON.parse(localLearningUser)

        setCurrentUser(learningUserObj)
    },[])    

    return (
        <Routes>
            <Route path="/"
                element={
                    <>
                        <NavBar />
                        <Outlet />
                    </>
                }
            >   
                <Route index element={<PostList allPosts={allPosts} allTopics={allTopics} getAndSetAllPosts={getAndSetAllPosts}/>} />
                <Route path="post">
                    <Route path=":postId" element={
                        <PostDetails 
                            currentUser={currentUser} 
                            getAndSetAllPosts={getAndSetAllPosts}
                        />} 
                    />
                </Route>
                <Route path="createPost" element={
                    <CreatePost 
                        currentUser={currentUser} 
                        allPosts={allPosts}
                        allTopics={allTopics}
                        getAndSetAllPosts={getAndSetAllPosts}
                    />}
                />
                <Route path="myPosts" element={
                    <MyPosts
                        currentUser={currentUser}
                        getAndSetAllPosts={getAndSetAllPosts}
                    />}
                />
            </Route>
        </Routes>
    )
}