import React, { Component } from "react";
import { Button, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import SignUpForm from "../forms/SignUpForm";
import SignInForm from "../forms/SignInForm";
import * as authActions from "../../store/auth/actions";

class MainHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSignUpModal: false,
      showSignInModal: false
    };
  }

  onSignUp() {
    this.setState({ showSignUpModal: false });
    this.setState({ showSignInModal: true });
  }

  onSignIn() {
    this.setState({ showSignInModal: false });
  }

  logOut() {
    this.props.dispatch(authActions.logout());
  }

  render() {
    return (
      <header className="p-3 shadow-sm d-flex flex-row justify-content-sm-between align-items-center">
        <h1 className="mb-0">Айосвіта</h1>
        {!this.props.token && (
          <div>
            <Button onClick={() => this.setState({ showSignUpModal: true })}>Реєстрація</Button>
            <Button className="ml-3" variant="success" onClick={() => this.setState({ showSignInModal: true })}>
              Вхід
            </Button>
          </div>
        )}
        {!!this.props.token && (
          <div>
            <Button className="ml-3" variant="success" onClick={() => this.logOut()}>
              Вихід
            </Button>
          </div>
        )}
        <Modal show={this.state.showSignUpModal} onHide={() => this.setState({ showSignUpModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Реєстрація</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignUpForm onSignUp={event => this.onSignUp(event)} />
          </Modal.Body>
        </Modal>

        <Modal show={this.state.showSignInModal} onHide={() => this.setState({ showSignInModal: false })}>
          <Modal.Header closeButton>
            <Modal.Title>Вхід</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <SignInForm onSignIn={event => this.onSignIn(event)} />
          </Modal.Body>
        </Modal>
      </header>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    token: state.auth.token
  };
}

export default connect(mapStateToProps)(MainHeader);
