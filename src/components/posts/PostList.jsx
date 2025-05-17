import { useEffect } from "react"
import { useState } from "react"
import { getAllPosts } from "../../services/postService"
import { getAllTopics } from "../../services/topicService"
import { Post } from "./Post"
import "./Posts.css"

export const PostList = () => {

    const [allPosts, setAllPosts] = useState([])
    const [allTopics, setAllTopics] = useState([])
    const [filteredPosts, setFilteredPosts] = useState([])
    const [topicIdFilter, setTopicIdFilter] = useState("")
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
        getAllPosts().then((postsArray) => {
            setAllPosts(postsArray)
        })
    }, [])

    useEffect(() => {
        getAllTopics().then((topicsArray) => {
            setAllTopics(topicsArray)
        })
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
            <div className="filter-bar">
                <select
                    onChange={(event) => setTopicIdFilter(Number(event.target.value))}
                >
                    <option value="">
                        {topicIdFilter === "" ? "Select Topic" : "All Posts"}
                    </option>
                    {allTopics.map((topicObj) => (
                        
                        <option
                            key={topicObj.id}
                            className="filter-topic"
                            value={topicObj.id}
                        >
                            {topicObj.name}
                        </option>
                    ))}
                </select>
                <input 
                    type="text" 
                    placeholder="Search Posts" 
                    className="post-search"
                    onChange={(event) => {
                        setSearchTerm(event.target.value)
                    }}
                />
            </div>
            <article className="posts">
                { filteredPosts.map((postObj) => {
                    return <Post post={postObj} key={postObj.id}/>
                })}
            </article>
        </div>
    )
}