import React from "react";
import "./Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../../firebase/firebase";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ user }, dispatch] = useStateValue();

  // sign in function
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        // console.log(result);
        dispatch({
          type: actionType.SET_USER,
          user: result.user,
        });
      })
      .catch((err) => alert(err.message));
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://whatsappbrand.com/wp-content/themes/whatsapp-brc/images/WhatsApp_Logo_1.png"
          alt=""
        />
        <div className="login__text">
          <h3>Sign In to WhatsApp</h3>
        </div>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  );
};

export default Login;
