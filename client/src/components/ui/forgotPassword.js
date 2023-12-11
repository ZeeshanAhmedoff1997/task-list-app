import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import {grLock} from "react-icons/gr"
import { FaKey } from 'react-icons/fa';
import axios from 'axios';
import Loader from 'react-loader-spinner';

export default function forgotPassword() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const submitHandler = async e => {
    e.preventDefault();
    setError(null);
    setLoader(true);
    const data = e.target[0].value;
    try {
      const res = await axios.post('/users/passwordReset', {
        email: data,
      });
      setUser(res.data.user.name);
    } catch (e) {
      setError('User with this email does not exists.');
    }
    setLoader(false);
  };

  const form = (
    <form onSubmit={submitHandler}>
      <p>
        Enter your email and we'll send you a link to get back into your
        account.
      </p>
      <input
        type="email"
        required
        style={{
          width: '100%',
          margin: '10px 0px',
          borderRadius: '5px',
          border: '1px solid',
          padding: '5px 10px',
          backgroundColor: '#fafafa',
        }}
        placeholder="Email"
      />
      <button
        type="submit"
        style={{ padding: '5px 10px', margin: '10px 0px' }}
        className="btn btn-dark btn-lg btn-block "
      >
        Send Login Link
      </button>
    </form>
  );
  const text = (
    <div>
      <p style={{ fontWeight: '550' }}>Email Sent</p>
      <p>
        Hi {user}, We have sent a mail to you with a link to get back into your
        account.
      </p>{' '}
    </div>
  );

  return (
    <React.Fragment>
      <div className="inner password">
        <FaKey
          color="#333"
          style={{
            paddingTop: '2px',
            fontSize: '4.6rem',
            textAlign: 'center',
          }}
        />
        <p style={{ fontWeight: '600', margin: '20px' }}>Trouble Logging In?</p>
        {user === null ? form : text}
        <p style={{ color: '#bf3636', textAlign: 'center' }}>{error}</p>
        <hr style={{ borderTop: '1px solid #ddd' }} />
        <p>
          <Link to={'/sign-up'}>Create New Account</Link>
        </p>
        <br />
        <p>
          <Link to={'/sign-in'}>Back To Login</Link>
        </p>
      </div>
      {loader ? (
        <Loader
          className="loader"
          type="Grid"
          color="#808080"
          height={40}
          width={40}
        />
      ) : null}
    </React.Fragment>
  );
}
