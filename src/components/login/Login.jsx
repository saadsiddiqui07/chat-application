import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../context/StateProvider";

const Login = () => {
  const [{},dispatch] = useStateValue();

  // sign in function
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: "SET_USER",
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://cdn.dribbble.com/users/1139587/screenshots/14727882/media/d8bf906f70115d4af55f4f265349780c.png?compress=1&resize=400x300"
          alt=""
        />
        <div className="login__text">
          <h3>Sign In to NextChat</h3>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
