import { useEffect } from "react"
import { useState } from "react"
import { Post } from "./Post"
import "./Posts.css"
import { PostFilterBar } from "./PostFilterBar"
import { Link } from "react-router-dom"

export const PostList = ({ allPosts, allTopics, getAndSetAllPosts }) => {
    const [filteredPosts, setFilteredPosts] = useState([])
    const [topicIdFilter, setTopicIdFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getAndSetAllPosts()
    }, [])

    useEffect(() => {
        if (topicIdFilter === "" || topicIdFilter === 0) {
            setFilteredPosts(allPosts)
        }
        else {
            const foundPosts = allPosts.filter((post) => post.topicId === topicIdFilter)
            setFilteredPosts(foundPosts)
        }
    }, [topicIdFilter, allPosts])

    useEffect(() => {
        const foundPosts = allPosts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredPosts(foundPosts)
    }, [searchTerm, allPosts])

    return (
        <div className="posts-container">
        <h2>All Posts</h2>
            <PostFilterBar allTopics={allTopics} topicIdFilter={topicIdFilter} setTopicIdFilter={setTopicIdFilter} setSearchTerm={setSearchTerm} />
            <article className="posts">
                { filteredPosts.map((postObj) => {
                    
                    return (
                        <Link to={`/post/${postObj.id}`} key={postObj.id} >
                            <Post post={postObj} />
                        </Link>
                    )
                })}
            </article>
        </div>
    )
}