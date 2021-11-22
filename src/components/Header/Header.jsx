import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({ user, handleLogout }) {
    return (
        <Segment clearing>
            <Header as='h3' floated='right'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image></Link>
                <Link to="/"><Icon color='grey' name="home"></Icon></Link>
                <Link to="/feed"><Icon color='grey' name='grid layout'></Icon></Link>
                <Link to='' color='grey' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h4' floated='left'>
                <Link to="/"><Image src="https://i.imgur.com/SF5qL1x.png" size="small"></Image></Link>
            </Header>
        </Segment>
    );
}