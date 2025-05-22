import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addNewPost } from "../services/postService"
import "./form.css"


export const CreatePost = ({ allPosts, allTopics, currentUser, getAndSetAllPosts}) => {

    const [newPost, setNewPost] = useState({})

    const navigate = useNavigate()

    const nextId = allPosts.length + 1

    const handleInputChange = (event) => {
        const stateCopy = { ...newPost }
        stateCopy[event.target.name] = event.target.value
        setNewPost(stateCopy)
    }

    const handleSave = () => {
        event.preventDefault()

        const finalNewPost = {
            id: nextId,
            userId: currentUser.id,
            topicId: Number(newPost.topicId),
            title: newPost.title,
            body: newPost.body,
            // Get current date without time
            postDate: new Date().toISOString().split('T')[0],
            favoriteIds: []
        }

        const isValidPost = 
            finalNewPost.id &&
            finalNewPost.userId &&
            finalNewPost.topicId &&
            finalNewPost.title &&
            finalNewPost.body &&
            finalNewPost.postDate


        if (isValidPost) {
            addNewPost(finalNewPost).then(() => {
                getAndSetAllPosts()
                navigate(`/`)
            })
        }
        else {
            console.warn("Not all required fields are filled.")
        }
    }

    return (
        <form className="create-post">
            <h2>Create Post</h2>
            <fieldset>
                <div className="form-group">
                    <label>Title</label>
                    <input 
                        type="text"
                        name="title"
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Body</label>
                    <input 
                        type="text"
                        name="body"
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Topic</label>
                    <select
                        type="number"
                        name="topicId"
                        onChange={handleInputChange}
                        required
                        className="form-control"
                    >
                        <option value={""}>Select Topic</option>
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
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <button type="submit" className="form-btn btn-primary" onClick={handleSave}>Create Post</button>
                </div>
            </fieldset>
        </form>
    )
}

    