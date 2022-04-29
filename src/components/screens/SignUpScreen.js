import React, { useRef, useState } from "react";
import "../../style/signupScreen.css";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../firebse";
import { useNavigate } from "react-router-dom";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  // const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(
      auth,
      emailRef.current.value,
      passwordRef.current.value
    )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
    // setLoading(false);
  };

  return (
    <div className="signupScreen">
      <form onSubmit={signIn}>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Password" />
        <button type="submit">Sign In</button>

        <h4>
          <span className="signupScreen__gray">New to Netflix?</span>
          <span className="signupScreen__link" onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
