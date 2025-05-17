export const Post = ({ post }) => {

    const numLikes = post.favoriteIds.length

    return (
        <section className="post">
            <header className="post-title">{post.title}</header>
            <div className="post-topic">Topic: {post.topic.name}</div>
            <div className="post-likes">Number of Likes: {numLikes}</div>
        </section>
    )

}