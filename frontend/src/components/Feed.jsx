import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import './Feed.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Feed({currentUser}){

    const [posts, setPosts] =useState([]);
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");

    useEffect (() => {
        (async () => {
            try {
                const res = await fetch("http://localhost:5000/posts");
                if (!res.ok) throw new Error("Failed to load posts");
                const data = await res.json();
                setPosts(data);
            } catch(e) {
                setErr(e.message);
            } finally { 
                setLoading(false);
            }
        }) ();
    }, []);

    const addPost = async (e) =>{
        e.preventDefault();
        if(!text.trim()) return;
        
        try {
        const res = await fetch("http://localhost:5000/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ author: currentUser, content: text.trim() }),
        });
        if (!res.ok) throw new Error("Failed to create post");
        const newPost = await res.json();
        setPosts((p) => [newPost, ...p]);
        setText("");
        } catch (e) {
        setErr(e.message);
        }
    };

    const likePost = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/posts/${id}/like`, { method: "POST" });
            if (!res.ok) throw new Error("Failed to like");
            const updated = await res.json();
            setPosts((p) => p.map((post) => (post.id === id ? updated : post)));
            } catch (e) {
            setErr(e.message);
            }
    };

    const deletePost = async (id) => {
        try {
        const res = await fetch(`http://localhost:5000/posts/${id}`, { method: "DELETE" });
        if (res.status !== 204) throw new Error("Failed to delete");
        setPosts((p) => p.filter((post) => post.id !== id));
        } catch (e) {
        setErr(e.message);
        }
    };

    if (loading) return <p>Loading…</p>;
    if (err) return <p style={{ color: "crimson" }}>{err}</p>;


    return(
        <>  
            <form className="feed-form-container" onSubmit={addPost}>
                <div className="text-container">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?"></textarea>
                    <button  type="button" className="button-design photo-btn"> <AddAPhotoIcon/></button>
                </div>
                <button className="button-design" type="submit">Post</button>
            </form>

            <div className="posts-wrapper">
                {posts.map((post) => (
                <div className="post-container" key={post.id}>
                    <strong>@{post.author} {new Date(post.created_at).toLocaleString()}</strong>
                    <p>{post.content}</p>
                    <div className="like-delete-container">
                         <button className="delete-button-design" onClick={
                            () => {
                                if (localStorage.getItem("username") != post.author) {
                                    window.alert("You can't delete a post that is not yours");
                                    return;
                                }
                                if (window.confirm("Are you sure you want to delete this post?")) {
                                    deletePost(post.id);
                                } 
                            }
                        }
                        > <DeleteOutlineIcon /> </button>

                        <button className="button-design" onClick={() => likePost(post.id)}>
                            <FavoriteBorderIcon/> {post.likes}
                        </button>
                    </div>
                </div>
                ))}

            </div>
        </>
    )

}

export default Feed;