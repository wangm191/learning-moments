import { useEffect, useState } from "react"
import { deletePost, getMyPosts } from "../../services/postService"
import { useNavigate } from "react-router-dom"
import "./Posts.css"


export const MyPosts = ({ currentUser, getAndSetAllPosts}) => {
    const [myPosts, setMyPosts] = useState([])  
    
    const navigate = useNavigate()

    useEffect(() => {
        getMyPosts(Number(currentUser.id)).then((postsArray) => {
            setMyPosts(postsArray)
        })
    }, [currentUser])

    const handleDelete = (id) => {
        deletePost(id)
        getAndSetAllPosts()
        navigate(`/`)
    } 

    return (
        <div className="posts-container">
            <h2>My Posts</h2>
            <article className="posts">
                { myPosts.map((postObj) => {
                    return (
                        <section className="post post-details" key={postObj.id} >
                            <header className="post-header" onClick={() => { navigate(`/post/${postObj.id}`)}} >{postObj.title}</header>
                            <div>
                                <span className="post-info">Topic:</span>
                            {postObj.topic?.name}
                            </div>
                            <div>
                                <span className="post-info">Number Of Likes:</span>
                            {postObj.favoriteIds?.length || 0}
                            </div>
                            <div className="btn-container">
                                {postObj.userId === currentUser.id ? (
                                    <button className="btn btn-warning" onClick={() => handleDelete(postObj.id)}>Delete Post</button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </section>
                    )
                })}
            </article>
        </div>
    )
}