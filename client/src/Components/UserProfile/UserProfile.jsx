import "./UserProfile.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Form } from "react-router-dom";

export default function UserProfile({ newUser }) {
  const userProfile = useLoaderData();
  const navigate = useNavigate();
  const [localUser, setLocalUser] = useState(userProfile);
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    if (!newUser) setCurrentUser(userProfile);
    setLocalUser(userProfile);
  }, [userProfile]);

  const logOut = () => {
    localStorage.clear();
    setCurrentUser("");
    navigate("/");
  };

  const onFocus = (e) => {
    e.target.select();
  };

  return (
    <div id="userProfile">
      <Form id="form-profile" method="post">
      {newUser ? (
          <button type="submit">Create</button>
        ) : (
          <div id="profile-button-list">
            <button type="submit">Edit</button>
            <button type="button" onClick={({ target }) =>
              navigate(`/Posts/user/${userProfile?.id}`)
            }>Posts</button>
            <button type="button" onClick={logOut}>
              Logout
            </button>
          </div>
        )}
        <div className="formitem">
          {newUser ? null : (
            <input
              type="hidden"
              name="id"
              defaultValue={userProfile?.id}
            ></input>
          )}
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            defaultValue={localUser?.username}
            placeholder="enter a username"
            onChange={({ target }) =>
              setLocalUser({ ...currentUser, username: target.value })
            }
            onFocus={onFocus}
            pattern="^[a-zA-Z0-9_\-']+$"
            minLength="2"
            maxLength="20"
            required={true}
          />
        </div>
        <div id="form-name">
          <div className="formitem">
            <label htmlFor="first_name">First Name: </label>
            <input
              type="text"
              name="first_name"
              defaultValue={localUser?.first_name}
              placeholder="first name"
              onChange={({ target }) =>
                setLocalUser({ ...currentUser, first_name: target.value })
              }
              onFocus={onFocus}
              pattern="^[a-zA-Z0-9_\-']+$"
              minLength="2"
              maxLength="20"
              required={true}
            />
          </div>
          <div className="formitem">
            <label htmlFor="last_name">Last Name: </label>
            <input
              type="text"
              name="last_name"
              defaultValue={localUser?.last_name}
              placeholder="first name"
              onChange={({ target }) =>
                setLocalUser({ ...currentUser, last_name: target.value })
              }
              onFocus={onFocus}
              pattern="^[a-zA-Z0-9_\-']+$"
              minLength="2"
              maxLength="20"
              required={true}
            />
          </div>
        </div>
        <div className="formitem email">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            defaultValue={localUser?.email}
            placeholder="email"
            onChange={({ target }) =>
              setLocalUser({ ...currentUser, email: target.value })
            }
            onFocus={onFocus}
            required={true}
          />
        </div>
        <div className="icon_id">
          <input
            type="hidden"
            name="icon_id"
            defaultValue={localUser?.icon_id}
            placeholder="icon id"
            onChange={({ target }) =>
              setLocalUser({ ...currentUser, icon_id: target.value })
            }
            onFocus={onFocus}
            required={true}
          />
        </div>
      </Form>
    </div>
  );
}
