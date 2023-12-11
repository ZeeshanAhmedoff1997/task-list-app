import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import logo from '../../assets/images/checked.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();

    this.state = {
      error: null,
      loader: false,
    };
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ error: null });
    const user = {
      email: this.emailInput.current.value,
      password: this.passwordInput.current.value,
    };
    this.setState({ loader: true });
    try {
      const res = await axios.post('/users/login', user);
      localStorage.setItem('token', res.data.token);
      this.props.setToken(res.data.token);
      this.props.history.push('/todo');
    } catch (e) {
      this.setState({ loader: false });
      this.setState({
        error: 'Your mail or password is invalid, please try again.',
      });
    }
  };

  render() {
    return (
      <div className="inner">
        <form onSubmit={this.handleSubmit}>
          <img
            src={logo}
            alt="logo"
            width="50px"
            style={{
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: '25px',
              marginTop: '-10px',
            }}
          />

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              required
              ref={this.emailInput}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              required
              ref={this.passwordInput}
            />
          </div>
          <p style={{ color: '#bf3636', textAlign: 'center' }}>
            {this.state.error}
          </p>
          <button type="submit" className="btn btn-dark btn-lg btn-block">
            Sign in
          </button>
          <p className="forgot-password text-right">
            <Link to={'/password/reset'}>Forgot password?</Link>
          </p>
          <p className="forgot-password text-right">
            Don't have an account? <Link to={'/sign-up'}>Sign Up</Link>
          </p>
        </form>
        {this.state.loader ? (
          <Loader
            className="loader"
            type="Grid"
            color="#808080"
            height={40}
            width={40}
          />
        ) : null}
      </div>
    );
  }
}

export default withRouter(Login);
