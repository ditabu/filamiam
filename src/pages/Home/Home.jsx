import React from "react";
import { Link } from 'react-router-dom';
import { Grid, Container, Header, Button, Icon } from "semantic-ui-react";
import "./Home.css";

export default function CreatButton() {


    return (
        <Container>
            <Grid columns={2} centered>
                <Grid.Row>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h1'
                            content='Fil-Am, I Am'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',

                            }}
                        />
                        <h2>a small business owner</h2>
                        <h2>a supporter</h2>
                        <h2>an artist</h2>
                        <h2>a foodie</h2>
                    </Grid.Column>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header
                            as='h1'
                            content='Since 1587,'
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: '1em',
                                marginTop: '2em',
                            }}
                        />
                        <h2>Filipinos have been in America, but why do we not hear much of their stories, their triumphs, their culture, their food, their history as much as we should today? This is the place to represent, to share, story tell, and be proud to say outloud, "Fil-Am, I am!"</h2>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                </Grid.Row>
                <Grid.Row>
                    <Link to="/form">
                        <Button primary size='huge'>
                            Create a post
                            <Icon name='right arrow' />
                        </Button>
                    </Link>
                </Grid.Row>
            </Grid>
        </Container>
    )
}


