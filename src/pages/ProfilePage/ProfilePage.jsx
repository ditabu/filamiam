import React, { useState, useEffect } from "react";
import { Grid, Container } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import * as likesApi from "../../utils/likesApi";
import * as postApi from '../../utils/postApi';

export default function ProfilePage(props) {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    // This variable name is coming from the route definition in app.js
    const { username } = useParams();

    useEffect(() => {
        // async and await on this anoymous function ^
        getProfile();
    }, [username]);

    async function getProfile() {
        try {
            const data = await userService.getProfile(username);
            setPosts(data.posts);
            setUser(data.user);
            setLoading(false);
        } catch (err) {
            setError(err.message);
        }
    }

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId);
            console.log(data, " <- this is data the response from likes create");
            getProfile();
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    async function removeLike(likesId) {
        try {
            const data = await likesApi.removeLike(likesId);
            console.log(data, " <- this is data the response from likes delete");
            getProfile(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    async function removePost(postId) {
        try {
            const data = await postApi.removePost(postId);
            console.log(data, " <- this is data the response from post delete");
            getProfile(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    // Always check the error before loading, because if there is an error
    // we know something went wrong with the fetch call, therefore the http request
    // is complete
    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <Container>
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <ProfileBio float="left" user={user} />
                    </Grid.Column>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <PostsFeed
                            isProfile={true}
                            posts={posts}
                            numPhotosCol={2}
                            user={props.user}
                            addLike={addLike}
                            removeLike={removeLike}
                            removePost={removePost}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}