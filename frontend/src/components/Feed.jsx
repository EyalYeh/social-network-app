import Button from "@mui/material/Button";
import { useState } from "react";
import './Feed.css';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

function Feed({currentUser}){

    const [posts, setPosts] =useState([]);
    const [text, setText] = useState("");

    const addPost = (e) =>{
        e.preventDefault();
        if(!text.trim()) return;
        const newPost = {
            id: crypto.randomUUID(), // unique id
            author: currentUser,
            content: text.trim(),
            createdAt: Date.now(),
            likes: 0,
        };
        setPosts([newPost, ...posts]);
        SetText("");
    }

    const likePost = (id) => {
        setPosts(posts.map((p) => 
            (p.id === id ? { ...p, likes: p.likes + 1 } : p)
        ));
    };


    return(
        <>  
            <form className="feed-form-container" onSubmit={addPost}>
                <div className="text-container">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?"></textarea>
                    <Button  type="button" className="photo-btn" startIcon={<AddAPhotoIcon/>}/>
                </div>
                <Button type="submit">Post</Button>
            </form>

            <div className="posts-wrapper">
                {posts.map((post) => (
                <div className="post-container" key={post.id}>
                    <strong>@{post.author} {new Date(post.createdAt).toLocaleString()}</strong>
                    <p>{post.content}</p>

                    <button onClick={() => likePost(post.id)}>
                        ❤️ {post.likes}
                    </button>
                </div>
                ))}

            </div>
        </>
    )

}

export default Feed;