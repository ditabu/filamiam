import React, { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import AddPostForm from "../../components/AddPostForm/AddPostForm";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import * as postsApi from '../../utils/postApi';
import { Grid, Container } from "semantic-ui-react";
import * as likesApi from '../../utils/likesApi';

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

    async function addLike(postId){
        try {
            const data = await likesApi.create(postId);
            console.log(data, ' <- this is data the response from likes create')
            getPosts()
  
        } catch(err){
            console.log(err)
            setError(err.message)
        }
    }
  
    async function removeLike(likesId){
      try {
          const data = await likesApi.removeLike(likesId);
          console.log(data, ' <- this is data the response from likes delete')
          getPosts(false)
  
      } catch(err){
          console.log(err)
          setError(err.message)
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
              <Container textAlign="left">
                <p>
                    <strong>Fil-Am, I Am</strong>
                    <br/>
                    <br/>
                    a small business owner
                    <br/>
                    a supporter
                    <br/>
                    a lola
                    <br/>
                    a tita
                    <br/>
                    a kuya
                    <br/>
                    <br/>
                    Filipinos have been in America since 1587, but why do we not hear much of their stories, their triumphs, their culture, their food, their history as much as should today? This is the place to represent, to share, and be proud to be Fil-Am, I am. 
                </p>
              </Container>
              <AddPostForm handleAddPostForm={handleAddPostForm} />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column style={{ maxWidth: 450 }}>
              <PostsFeed
                posts={posts}
                isProfile={false}
                numPhotosCol={1}
                loading={loading}
                user={props.user}
                addLike={addLike}
                removeLike={removeLike}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
    }