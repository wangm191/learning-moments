import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">All Posts</Link>
            </li>
            <li className="navbar-item">
                <Link to="/createPost">Create Post </Link>
            </li>
            <li className="navbar-item">
                <Link to="/myPosts">My Posts</Link>
            </li>
            {localStorage.getItem("learning_user") ? (
            <li className="navbar-item">
                <Link
                    className="navbar-link navbar-logout"
                    to=""
                    onClick={() => {
                        localStorage.removeItem("learning_user")
                        navigate("/login", { replace: true })
                    }}
                >
                    Logout
                </Link>
            </li>
        ) : (
            ""
        )}
        </ul>
    )
}