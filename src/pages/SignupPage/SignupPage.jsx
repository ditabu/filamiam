import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { Button, Form, Grid, Header, Image, Segment } from 'semantic-ui-react';
import userService from '../../utils/userService';



export default function SignUpPage(props){

  const [error, setError] = useState('');
  const [inputInfo, setInputInfo] = useState({
    username: '',
    email: '',
    password: '', 
    passwordConf: '',
    bio: '',
    location: '',
  });

  const [selectedFile, setSelectedFile] = useState('');

  function handleChange(e){
    setInputInfo({
      ...inputInfo,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
    e.preventDefault()
    const formData = new FormData()
    formData.append('photo', selectedFile)

    for (let fieldName in inputInfo){
      console.log(fieldName, inputInfo[fieldName])
      formData.append(fieldName, inputInfo[fieldName])
    }
    try {
      console.log(formData.forEach((item) => console.log(item)))

      await userService.signup(formData);
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
          <Image src="https://i.imgur.com/DXZAqxLs.png?1" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={inputInfo.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={inputInfo.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={inputInfo.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={inputInfo.passwordConf}
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
              value={inputInfo.location}
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
