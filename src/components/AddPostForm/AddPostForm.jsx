import React, { useState } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';


export default function AddPostForm(props) {
    const [selectedFile, setSelectedFile] = useState('')
    const [state, setState] = useState({
        description: '',
    });

    function handleFileInput(e) {
        setSelectedFile(e.target.files[0]);
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault()
        
        const formData = new FormData();
        formData.append('photo', selectedFile);
        formData.append('description', state.description);
        props.handleAddPostForm(formData);
    }

    return (
        <Grid textAlign='left' style={{ height: '25vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment>
                    Create Post
                    <br/>
                    <Form color='red' autoComplete="off" onSubmit={handleSubmit}>
                        <Form.Input
                            className="form-control"
                            name="description"
                            value={state.description}
                            placeholder="Share your Fil-Am experience, discoveries, and learnings"
                            onChange={handleChange}
                            required
                        />
                        <Form.Input 
                            className="form-control"
                            type="file" 
                            name="photo"
                            placeholder="upload image"
                            onChange={handleFileInput}
                        />
                        <Button color='blue' 
                            type="submit"
                            className="btn"
                            size='mini'
                        >
                            Add Post
                        </Button>
                    </Form>
                </Segment>
            </Grid.Column>
        </Grid>

    );
}