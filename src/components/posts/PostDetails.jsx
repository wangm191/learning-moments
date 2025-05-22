import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../../services/postService";
import { addUserToFavoriteIds } from "../../services/postService";

export const PostDetails = ({ currentUser, getAndSetAllPosts }) => {
    const { postId } = useParams()
    const [selectedPost, setSelectedPost] = useState({})

    useEffect(() => {
        getPostById(Number(postId)).then((data) => {
            setSelectedPost(data)
        })
        
    }, [postId])

    const numberOfLikes = selectedPost.favoriteIds?.length || 0

    const handleLike = () => {
        const updatedPost = { ...selectedPost }

        updatedPost.favoriteIds.push(Number(currentUser.id));
        addUserToFavoriteIds(updatedPost)
        getAndSetAllPosts()
        
    }

    const handleEdit = () => {
        console.log("Edit.")
    }

    return (
        <section className="post post-details">
            <header className="post-header">{selectedPost.title}</header>
            <div>
                <span className="post-info">Author:</span>
                {selectedPost.user?.fullName}
            </div>
            <div>
                <span className="post-info">Topic:</span>
                {selectedPost.topic?.name}
            </div>
            <div>
                <span className="post-info">Date:</span>
                {selectedPost.postDate}
            </div>
            <div>
                <span className="post-info">Body:</span>
                {selectedPost.body}
            </div>
            <div>
                <span className="post-info">Number of likes:</span>
                {numberOfLikes}
            </div>
            <div className="btn-container">
                {selectedPost.userId !== currentUser.id && !selectedPost.favoriteIds?.includes(currentUser.id) ? (
                    <button className="btn btn-secondary" onClick={handleLike}>Like Post</button> 
                ) : (
                    ""
                )}
                {selectedPost.userId === currentUser.id ? (
                    <button className="btn btn-primary" onClick={handleEdit}>Edit Post</button>
                ) : (
                    ""
                )}
            </div>
        </section>
    )
}
