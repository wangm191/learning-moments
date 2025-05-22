export const getAllPosts = () => {
    return fetch(`http://localhost:8088/posts?_expand=user&_expand=topic`)
    .then((response) => response.json())
}

export const getMyPosts = (currentId) => {
    return fetch(`http://localhost:8088/posts/?userId=${currentId}&_expand=user&_expand=topic`)
        .then((response) => response.json())
}

export const getPostById = (id) => {
    // If id=${id} will return singular post as array not object 
    return fetch(`http://localhost:8088/posts/${id}?_expand=user&_expand=topic`)
        .then((response) => response.json())
}

export const addUserToFavoriteIds = (post) => {
    return fetch(`http://localhost:8088/posts/${post.id}`, {
        method: 'PUT',

        headers: { 
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(post)
    })
}

export const addNewPost = (newPost) => {
    return fetch(`http://localhost:8088/posts`, {
        method: "POST",

        headers: {
          "content-Type": "application/json",
        },

        body: JSON.stringify(newPost),
    })
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8088/posts/${id}`, {
        method: "DELETE",

        headers: {
          "content-Type": "application/json",
        }
    })
}