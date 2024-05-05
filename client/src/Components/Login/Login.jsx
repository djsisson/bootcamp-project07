import "./Login.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
  const [username, setUserName] = useState("");
  const navigate = useNavigate();
  let { invalid } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/User/${username}`);
  };

  const handleNew = async (e) => {
    e.preventDefault();
    navigate("/User/new/a");
  };

  const onFocus = (e) => {
    e.target.select();
  };

  return (
    <div id="login">
      <form onSubmit={handleSubmit} id="login-form">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          value={username}
          placeholder="enter a username"
          onChange={({ target }) => setUserName(target.value)}
          onFocus={onFocus}
          pattern="^[a-zA-Z0-9_\-]+$"
          minLength="2"
          maxLength="20"
          required={true}
        />
        {invalid ? <div>Invalid UserName</div> : null}
        <div id="login-buttons">
          <button type="submit">Login</button>
          <button type="button" onClick={handleNew}>
            New
          </button>
        </div>
      </form>
    </div>
  );
}
