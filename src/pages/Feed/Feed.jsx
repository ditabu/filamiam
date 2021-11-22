import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import * as postApi from '../../utils/postApi';
import { Grid, Container, Header } from "semantic-ui-react";
import * as likesApi from '../../utils/likesApi';
import AddPostForm from "../../components/AddPostForm/AddPostForm";

export default function Feed(props) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function handleAddPostForm(post) {
        console.log(post)
        try {
            setLoading(true);
            const data = await postApi.create(post);
            console.log(data, " this is response from the server, in handleAddPost");
            setPosts([data.post, ...posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err)
        }
    }

    async function addLike(postId) {
        try {
            const data = await likesApi.create(postId);
            console.log(data, ' <- this is data the response from likes create')
            getPosts()

        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function removeLike(likesId) {
        try {
            const data = await likesApi.removeLike(likesId);
            console.log(data, ' <- this is data the response from likes delete')
            getPosts(false)

        } catch (err) {
            console.log(err)
            setError(err.message)
        }
    }

    async function getPosts(showLoading) {
        try {

            showLoading ? setLoading(true) : setLoading(false)
            const data = await postApi.getAll();
            setPosts([...data.posts]);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            console.log(err, " this is the error");
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    if (error) {
        return <ErrorMessage error={error} />;
    }

    if (loading) {
        return <Loader />;
    }

    async function removePost(postId) {
        try {
            const data = await postApi.removePost(postId);
            console.log(data, " <- this is data the response from post delete");
            getPosts(false);
        } catch (err) {
            console.log(err);
            setError(err.message);
        }
    }

    return (
        <Container>
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Header
                            as='h1'
                            content='Feed'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',
                        

                            }}
                        />
                    </Grid.Column>
                    <Grid.Column width={12} >
                        <PostsFeed
                            posts={posts}
                            isProfile={false}
                            numPhotosCol={2}
                            loading={loading}
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