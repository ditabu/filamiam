import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import userService from '../../utils/userService';
import { useNavigate } from 'react-router-dom';



export default function SignUpPage(props){

  const navigate = useNavigate();

  const [error, setError] = useState('');
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '', 
    passwordConf: '',
    bio: '',
    location: '',
  });

  const [selectedFile, setSelectedFile] = useState('');

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', selectedFile)

    for (let key in state){
      console.log(key, state[key])
      formData.append(key, state[key])
    }
    console.log(formData.forEach((item) => console.log(item)))
    
    try {

      await userService.signup(formData);
      props.handleSignUpOrLogin() // decodes our token in localstorage, and sets the users information in our App.js state
      navigate('/') // navigates to the home page route

    } catch (err) {
      console.log(err.message)
      setError(err.message)
    }
  }

  function handleFileInput(e){
    console.log(e.target.files)
    setSelectedFile(e.target.files[0])
  }
    
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="blue" textAlign="center">
          <Image src="https://i.imgur.com/DXZAqxL.png?1" /> <br/> <br/>Welcome! Mabuhay! <br/> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              placeholder="Tell us why you are proud to be Fil-Am..."
              onChange={handleChange}
            />
            <Form.Input
              name="location"
              placeholder="City, State"
              value={state.location}
              onChange={handleChange}
              required
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button color="blue" type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
   );
}
