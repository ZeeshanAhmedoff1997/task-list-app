import React, { useState, useEffect, useRef } from "react";
import { FaPencilAlt, FaKey, FaTrash, FaRegSave } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "react-moment";
import Loader from "react-loader-spinner";

const url =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC";

export default function Profile(props) {
    const AUTH_TOKEN = `Bearer ${props.token}`;
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const nameInput = useRef();
    const ageInput = useRef();
    const emailInput = useRef();

    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [imgData, setImg] = useState(null);
    const [error, setError] = useState(null);
    const [time, setTime] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(async () => {
        setLoader(true);
        try {
            const res = await axios.get("/users/me");
            setName(res.data.name);
            setAge(res.data.age);
            setEmail(res.data.email);
            setTime(res.data.createdAt);
            if (res.data.avatar) {
                setImg(`data:image/jpeg;base64,${res.data.avatar}`);
            }
        } catch (e) {}
        setLoader(false);
    }, []);

    const profile = (
        <img
            style={{ borderRadius: "50%" }}
            src={imgData}
            alt="Profile pic"
            width="120"
            height="120"
        />
    );
    const noProfile = (
        <img
            style={{ borderRadius: "50%" }}
            src={url}
            alt="Profile pic"
            width="120"
            height="120"
        />
    );

    const submitHandler = async (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            age,
        };
        setLoader(true);
        try {
            await axios.patch("/users/me", data);
            setEdit(false);
            setError(null);
        } catch (e) {
            setError("This email already exists.");
        }
        setLoader(false);
    };

    function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    }

    const onDeleteAvatar = async () => {
        setLoader(true);
        try {
            await axios.delete("/users/me/avatar");
        } catch (error) {}
        setImg(null);
        setLoader(false);
    };

    const onFileInput = async (e) => {
        setLoader(true);
        let formData = new FormData();
        formData.append("avatar", e.target.files[0]);
        try {
            await axios.post("/users/me/avatar", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const dataUrl = await getBase64(e.target.files[0]);
            setImg(dataUrl);
        } catch (error) {}
        setLoader(false);
    };

    const inputForm = (
        <form onSubmit={submitHandler} style={{ marginLeft: "20px" }}>
            <label>Name:</label>
            <input
                type="text"
                style={{ textTransform: "capitalize" }}
                ref={nameInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            ></input>
            <label>Age:</label>
            <input
                type="number"
                min="0"
                ref={ageInput}
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
            ></input>
            <label>Mail:</label>
            <input
                type="email"
                ref={emailInput}
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <button type="submit">
                Save info{" "}
                <FaRegSave
                    color="#333"
                    style={{ paddingTop: "2px", fontSize: "1.6rem" }}
                />
            </button>
        </form>
    );

    const details = (
        <div>
            <div style={{ textTransform: "capitalize" }}>
                <label>Name:</label> {name}{" "}
            </div>
            <div>
                <label>Age:</label> {age}{" "}
            </div>
            <div>
                <label>Mail:</label> {email}{" "}
            </div>
        </div>
    );

    const imageInput = (
        <div className="custom-file-upload">
            <label>
                <input type="file" onChange={onFileInput} />
                <span className="icon">
                    {" "}
                    <FaPencilAlt
                        color="#333"
                        cursor="pointer"
                        fontSize="1.5rem"
                    />{" "}
                </span>
            </label>
            <FaTrash
                className="icon"
                onClick={onDeleteAvatar}
                cursor="pointer"
                color="#333"
                fontSize="1.5rem"
            />
        </div>
    );

    const editAndDelte = (
        <div className="edit">
            <p className="forgot-password text-right textClick">
                Update info{" "}
                <button onClick={() => setEdit(true)}>
                    <span className="icon" style={{ marginLeft: "5px" }}>
                        <FaPencilAlt color="#333" fontSize="1.5rem" />
                    </span>
                </button>{" "}
            </p>
            <p className="forgot-password text-right textClick">
                Update password{" "}
                <button onClick={() => history.push("/update-password")}>
                    <span className="icon" style={{ marginLeft: "5px" }}>
                        <FaKey color="#333" fontSize="1.5rem" />
                    </span>
                </button>{" "}
            </p>
            <p className="forgot-password text-right textClick">
                Delete account{" "}
                <button disabled={edit}>
                    <span className="icon" style={{ marginLeft: "5px" }}>
                        <FaTrash
                            onClick={() => history.push("/delete")}
                            color="#333"
                            fontSize="1.5rem"
                        />{" "}
                    </span>{" "}
                </button>
            </p>
        </div>
    );

    const dateToFormat = new Date(time);
    const date = (
        <div>
            <label>Member Since: </label>{" "}
            <Moment date={dateToFormat} format="D MMM YYYY" />
        </div>
    );

    return (
        <div className="inner" style={{ padding: "50px 20px" }}>
            <div className="profile">
                <div>
                    {imgData ? profile : noProfile}
                    <div style={{ marginTop: "10px" }}>
                        {edit ? imageInput : null}
                    </div>
                </div>
                <div style={{ marginTop: "20px" }}>
                    {edit ? inputForm : details}
                    {edit ? null : date}
                </div>
            </div>
            {error ? (
                <p
                    style={{
                        color: "#bf3636",
                        textAlign: "center",
                        fontWeight: "500",
                    }}
                >
                    {error}
                </p>
            ) : null}
            {edit ? null : editAndDelte}
            {loader ? (
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
