import Button from "@mui/material/Button";
import { useState } from "react";
import './Feed.css';

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
        setPosts(posts.map(
            (p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p)
        ));
    };


    return(
        <>  
            <form className="feed-form-container" onSubmit={addPost}>
                <textarea className="text-container" value={text} onChange={(e) => setText(e.target.value)} placeholder="What's on your mind?"></textarea>
                <Button type="submit">Post</Button>
            </form>

            <div>
                {posts.map((post) => (
                <div key={post.id}>
                    <strong>@{post.author}</strong>
                    <p>{post.content}</p>

                    <button onClick={() => likePost(posts.id)}>
                        ❤️ {posts.likes}
                    </button>
                </div>
                ))}

            </div>
        </>
    )

}

export default Feed;