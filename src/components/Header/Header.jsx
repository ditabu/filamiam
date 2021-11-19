import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Segment, Image, Icon } from 'semantic-ui-react';


export default function PageHeader({ user, handleLogout }) {
    return (
        <Segment clearing>
            <Header as='h2' floated='right'>
                <Link to={`/${user.username}`}><Image src={user.photoUrl ? user.photoUrl : "https://react.semantic-ui.com/images/wireframe/square-image.png"} avatar></Image></Link>
                <Link to="/"><Icon color='brown' name="home"></Icon></Link>
                <Link to='' onClick={handleLogout}>Logout</Link>
            </Header>
            <Header as='h1' floated='left'>
            <Link to="/"><Image src="https://i.imgur.com/DXZAqxL.png?1" avatar></Image></Link>
            </Header>
        </Segment>
    )
}