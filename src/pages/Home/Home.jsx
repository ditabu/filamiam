import React, { useState } from "react";
import Header from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import * as postsApi from '../../utils/postApi';


export default function Feed(props){
    const [posts, setPosts] = useState([])

    async function handleAddPostForm (post) {
        console.log(post)
        try {
            const data = await postsApi.create(post);
            console.log(data, " this is response from the server, in handleAddPost");
            setPosts([data.post, ...posts]);
        } catch(err){
            console.log(err)
        }
    }

    return (
        <>
        <AddPostForm handleAddPostForm={handleAddPostForm}/>
        <PostsFeed />
        </>
    )
}