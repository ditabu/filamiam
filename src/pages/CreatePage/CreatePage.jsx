import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import { Grid, Button, Container, Header, Icon } from "semantic-ui-react";
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
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column width={10}>
                        <Header
                            as='h1'
                            content='Create a post'
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '0',
                            }}
                        />
                    </Grid.Column>
                    <Grid.Column style={{background: "white", maxWidth: 450}}>
                        <AddPostForm handleAddPostForm={handleAddPostForm} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
                        // <Grid.Column>
                        //     <Link to="/feed">
                        //         <Button primary size='huge'>
                        //         Go to feed
                        //         <Icon name='right arrow' />
                        //         </Button>
                        //     </Link>
                        // </Grid.Column>
            
    );
}