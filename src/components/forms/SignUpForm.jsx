import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import * as usersHelpers from "../../helpers/user";

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      email: null,
      password: null,
      error: null
    };
  }

  async signUp(event) {
    event.preventDefault();

    this.setState({ error: null });

    try {
      await usersHelpers.registration({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      });

      this.props.onSignUp({ email: this.state.email });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return (
      <Form onSubmit={event => this.signUp(event)}>
        {!!this.state.error && (
          <Alert variant="danger">{this.state.error.response && this.state.error.response.data && this.state.error.response.data.message ? this.state.error.response.data.message : this.state.error.message}</Alert>
        )}

        <Form.Group>
          <Form.Label>Імя</Form.Label>
          <Form.Control type="text" placeholder="Іван Іванов" onChange={event => this.setState({ name: event.target.value })} />
          <Form.Text className="text-muted">Введіть імя та прізвище</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Введіть email" onChange={event => this.setState({ email: event.target.value })} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control required type="password" placeholder="Введіть пароль" onChange={event => this.setState({ password: event.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Реєстрація
        </Button>
      </Form>
    );
  }
}
