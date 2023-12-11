import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from 'react-loader-spinner';

const url =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC';

export default function updatePassword(props) {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [imgData, setImg] = useState(null);

  const AUTH_TOKEN = `Bearer ${props.token}`;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

  const profile = (
    <img
      style={{ borderRadius: '50%' }}
      src={imgData}
      alt="Profile pic"
      width="80"
      height="80"
    />
  );
  const noProfile = (
    <img
      style={{ borderRadius: '50%' }}
      src={url}
      alt="Profile pic"
      width="80"
      height="80"
    />
  );

  useEffect(async () => {
    setLoader(true);
    try {
      const res = await axios.get('/users/me');
      setUser(res.data.name);
      if (res.data.avatar) {
        setImg(`data:image/jpeg;base64,${res.data.avatar}`);
      }
    } catch (e) {}
    setLoader(false);
  }, []);

  const inputStyle = {
    width: '100%',
    margin: '10px 0px',
    borderRadius: '5px',
    border: '1px solid',
    padding: '5px 10px',
    backgroundColor: '#fafafa',
  };
  const history = useHistory();
  const submitHandler = async e => {
    e.preventDefault();
    setLoader(true);
    setError(null);
    if (e.target[0].value !== e.target[1].value) {
      setError('Please make sure both passwords match.');
      setLoader(false);
      return;
    }
    try {
      const pwd = e.target[0].value;
      const _res = await axios.patch('/users/me', { password: pwd });
      history.push('/todo');
    } catch (e) {
      setLoader(false);
    }
  };

  return (
    <React.Fragment>
      <div className="inner password">
        {imgData ? profile : noProfile}
        <p style={{ fontSize: '1.8rem', margin: '20px' }}>{user}</p>
        <p style={{ color: '#bf3636', textAlign: 'center' }}>{error}</p>

        <form onSubmit={submitHandler}>
          <input
            type="password"
            minLength="7"
            style={inputStyle}
            placeholder="New Password"
            required
          />
          <input
            type="password"
            minLength="7"
            style={inputStyle}
            placeholder="Confirm New Password"
            required
          />
          <button
            type="submit"
            style={{ padding: '5px 10px', margin: '10px 0px' }}
            className="btn btn-dark btn-lg btn-block"
          >
            Change Password
          </button>
        </form>
        <p
          style={{ textAlign: 'center' }}
          className="forgot-password text-right"
        >
          <Link to={'/'}>Cancel</Link>
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
