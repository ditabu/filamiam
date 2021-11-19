import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostsFeed from "../../components/PostsFeed/PostsFeed";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";

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
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
            <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostsFeed
            isProfile={true}
            posts={posts}
            numPhotosCol={2}
            user={props.user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}