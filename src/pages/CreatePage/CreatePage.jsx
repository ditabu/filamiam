import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Grid, Button } from "semantic-ui-react";
import * as postApi from '../../utils/postApi';
import { Link } from 'react-router-dom';

export default function CreateForm(props) {
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

    return (

        <Grid centered>
            <Grid.Row>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <AddPostForm color='yellow' inverted handleAddPostForm={handleAddPostForm} />
                    <Link to="/feed">
                            <Button primary size='huge'>
                            Read, Learn, Explore, Experience
                            </Button>
                        </Link>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}