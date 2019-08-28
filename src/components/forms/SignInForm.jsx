import React, { Component } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { connect } from "react-redux";
import * as usersHelpers from "../../helpers/user";
import * as authActions from "../../store/auth/actions";

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      error: null
    };
  }

  async signIn(event) {
    event.preventDefault();

    this.setState({ error: null });

    try {
      const userData = await usersHelpers.login({
        email: this.state.email,
        password: this.state.password
      });

      this.props.dispatch(authActions.setToken(userData.token));
      this.props.onSignIn();
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    return (
      <Form onSubmit={event => this.signIn(event)}>
        {!!this.state.error && (
          <Alert variant="danger">{this.state.error.response && this.state.error.response.data && this.state.error.response.data.message ? this.state.error.response.data.message : this.state.error.message}</Alert>
        )}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control required type="email" placeholder="Введіть email" onChange={event => this.setState({ email: event.target.value })} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control required type="password" placeholder="Введіть пароль" onChange={event => this.setState({ password: event.target.value })} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Увійти
        </Button>
      </Form>
    );
  }
}

function mapStateToProps(state, props) {
  return {};
}

export default connect(mapStateToProps)(SignInForm);
