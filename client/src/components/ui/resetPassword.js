import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";

class ResetPassword extends React.Component {
    async componentDidMount() {
        const token = this.props.match.params.token;
        const history = this.props.history;
        if (!token) {
            history.push("/");
        }
        try {
            const _res = await axios.get("/users/me", {
                headers: { Authorization: `Bearer ${token}` },
            });
            this.props.setToken(token);
            history.push("/update-password");
        } catch (error) {
            history.push("/");
        }
    }
    render() {
        return (
            <Loader
                className="loader"
                type="Grid"
                color="#808080"
                height={40}
                width={40}
            />
        );
    }
}

export default withRouter(ResetPassword);
