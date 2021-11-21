import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Grid, Container, Header, Button, Icon } from "semantic-ui-react";

export default function CreatButton() {


    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={2} style={{ maxWidth: 450 }}>
                    <Container text>
                        <Header
                            as='h1'
                            content='Fil-Am, I Am'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: 0,
                                marginTop: '1em',

                            }}
                        />
                        <Header
                            as='h2'
                            content='a small business owner'
                            inverted
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'normal',
                                marginTop: '.25em',
                            }}
                        />
                        <Header
                            as='h2'
                            content='a supporter'
                            inverted
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'normal',
                                marginTop: '.25em',
                            }}
                        />
                        <Header
                            as='h2'
                            content='an artist'
                            inverted
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'normal',
                                marginTop: '.25em',
                            }}
                        />
                        <Header
                            as='h2'
                            content='a foodie'
                            inverted
                            style={{
                                fontSize: '1.5em',
                                fontWeight: 'normal',
                                marginTop: '.25em',
                            }}
                        />
                        <Header
                            as='h1'
                            content='I Am, Fil-Am'
                            inverted
                            style={{
                                fontSize: '4em',
                                fontWeight: 'bold',
                                marginBottom: 0,
                            }}
                        />
                        <Header
                            as='h6'
                            content='Filipinos have been in America since 1587, but why do we not hear much of their stories, their triumphs, their culture, their food, their history as much as we should today? This is the place to represent, to share, story tell, and be proud to say outloud, "Fil-Am, I am!"'
                            inverted
                            style={{
                                fontSize: '1em',
                                fontWeight: 'normal',
                                marginTop: '.75em',
                                maxWidth: 450
                            }}
                        />
                        <Link to="/form">
                            <Button primary size='huge'><Icon name='right arrow' />
                            Create a post
                            </Button>
                        </Link>
                    </Container>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


