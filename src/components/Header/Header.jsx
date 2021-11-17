import React from 'react';

import { Header, Segment} from 'semantic-ui-react';


export default function PageHeader(){
    return (
        <Segment>
            <Header as='h2' >
              Logo, Home icon, Profile Img, Logout
            </Header>
        </Segment>
    )
}