import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import * as postsApi from '../../utils/postApi';
import { Grid } from "semantic-ui-react";

export default function Feed(props){
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function handleAddPostForm (post) {
        console.log(post)
        try {
            setLoading(true);
            const data = await postsApi.create(post);
            console.log(data, " this is response from the server, in handleAddPost");
            setPosts([data.post, ...posts]);
            setLoading(false);
        } catch(err){
            setError(err.message);
            console.log(err)
        }
    }

    async function getPosts(showLoading) {
        try {
          
    
          showLoading ? setLoading(true) : setLoading(false)
          const data = await postsApi.getAll();
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

      return (
        <Grid centered>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <AddPostForm handleAddPostForm={handleAddPostForm} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <PostsFeed
                posts={posts}
                isProfile={false}
                numPhotosCol={3}
                loading={loading}
                user={props.user}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }