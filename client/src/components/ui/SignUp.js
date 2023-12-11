import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.ageInput = React.createRef();
        this.emailInput = React.createRef();
        this.passwordInput = React.createRef();

        this.state = {
            error: null,
            loader: false,
        };
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            name: this.nameInput.current.value,
            age: this.ageInput.current.value,
            email: this.emailInput.current.value,
            password: this.passwordInput.current.value,
        };
        this.setState({ loader: true });
        try {
            const res = await axios.post("/users", user);
            localStorage.setItem("token", res.data.token);
            this.props.setToken(res.data.token);
            this.props.history.push("/todo");
        } catch (err) {
            this.setState({ loader: false });
            this.setState({
                error:
                    err.response.data.message || "This email already exists.",
            });
        }
    };

    render() {
        return (
            <div className="inner">
                <form onSubmit={this.handleSubmit}>
                    <h3>Register</h3>

                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            required
                            ref={this.nameInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            min="0"
                            className="form-control"
                            placeholder="Age"
                            ref={this.ageInput}
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            ref={this.emailInput}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            minLength="7"
                            className="form-control"
                            placeholder="Enter password"
                            ref={this.passwordInput}
                            required
                        />
                    </div>

                    <p style={{ color: "#bf3636", textAlign: "center" }}>
                        {this.state.error}
                    </p>

                    <button
                        type="submit"
                        className="btn btn-dark btn-lg btn-block"
                    >
                        Sign up
                    </button>
                    <p className="forgot-password text-right">
                        Already registered <Link to={"/"}>log in?</Link>
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

export default withRouter(SignUp);
