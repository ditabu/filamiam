import React from 'react';
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function PostCard({ post, isProfile, user, addLike, removeLike, removePost }) {
    const likeIndex = post.likes.findIndex(
        (eachLike) => eachLike.username === user.username
    );

    const likeColor = likeIndex > -1 ? "red" : "grey";
    // removeLike needs to accept the like id
    const clickHandler =
        likeIndex > -1
            ? () => removeLike(post.likes[likeIndex]._id)
            : () => addLike(post._id);

    function deleteHandler() {
        console.log("deleteHandler", post._id)
        removePost(post._id)
    }

    return (
        <Card color='red' key={post._id} raised>
            {isProfile ? (
                ""
            ) : (
                <Card.Content textAlign="left">
                    <Card.Header>
                        {post.user._id === user._id ?
                            <Icon 
                                style={{ 
                                    float: "right", 
                                    color: "grey" 
                                }} 
                                name={"delete"} 
                                size={"small"} 
                                onClick={deleteHandler} 
                            />
                        : ""}
                        <Link to={`/${post.user.username}`}>
                            <Image
                                size="large"
                                avatar
                                src={
                                    post.user.photoUrl
                                        ? post.user.photoUrl
                                        : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                }
                            />
                            {post.user.username}
                        </Link>
                    </Card.Header>
                </Card.Content>
            )}
            <Card.Content>
                <Card.Description>{post.description}</Card.Description>
            </Card.Content>
            <Image src={`${post.photoUrl}`} wrapped ui={false} />
            <Card.Content extra textAlign={"left"}>
                <Icon name={"heart"} size="large" color={likeColor} onClick={clickHandler} />
                {post.likes.length} Likes
            </Card.Content>
        </Card>
    );
}