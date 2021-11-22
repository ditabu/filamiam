import React from "react";
import { Image, Grid, Segment, Header, Container } from "semantic-ui-react";

export default function ProfileBio({ user }) {
    return (
        <Container>
            <Grid columns={2} className="Profile">
                <Grid.Row>
                    <Grid.Column>
                        <Header
                            as='h1'
                            content='Profile'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '1em',

                            }}
                        />
                        <Image
                            src={`${user.photoUrl
                                ? user.photoUrl
                                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                                } `}
                            avatar
                            size="small"
                        />
                        <Segment vertical>
                            <h3>{user.username}</h3>
                        </Segment>
                        <Segment>
                            <span> <strong>About Me:</strong> {user.bio} </span>
                            <br />
                            <span> <strong>Location:</strong> {user.location} </span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}