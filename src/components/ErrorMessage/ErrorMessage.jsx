import React from "react";
import { Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ErrorMessage(props) {
  return (
    <Message warning>
      <Message.Header>{props.error}</Message.Header>
      <Message.List>
        <Message.Item>
          <Link to="/signup">Sign Up</Link>
        </Message.Item>
        <Message.Item>
          <Link to="/login">login</Link>
        </Message.Item>
        <Message.Item>
          <Link to="/">Home</Link>
        </Message.Item>
      </Message.List>
    </Message>
  );
}