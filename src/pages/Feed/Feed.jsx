import React from "react";
import PageHeader from "../../components/Header/Header";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostsFeed from "../../components/PostsFeed/PostsFeed";


export default function Feed(props){
    return (
        <>
        <PageHeader />
        <AddPostForm />
        <PostsFeed />
        </>
    )
}