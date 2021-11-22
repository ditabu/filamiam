import React from "react";
import { Image, Grid, Segment, Header, Container } from "semantic-ui-react";

export default function ProfileBio({ user }) {
    return (
        <Container>
            <Grid columns={2} className="Profile">
                <Grid.Row>
                    <Grid.Column width={12}>
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
                            size="large"
                            bordered
                                
                        />
                        <Segment>
                            <h3>{user.username}</h3>
                        </Segment>
                        <Segment>
                            <span><strong>About Me:</strong></span>
                            <br />
                            <span> {user.bio} </span>
                            <br />
                            <br />
                            <span><strong>Location:</strong></span>
                            <br />
                            <span> {user.location} </span>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
}