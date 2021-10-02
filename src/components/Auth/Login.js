import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from 'react-router';
import { app } from '../../firebase'
import { AuthContext } from './Status';
import '../comp-css/Login-style.css';
import { store } from "react-notifications-component";

const Login = ({ history }) => {

    const handleLogin = useCallback(
        async event => {
          event.preventDefault();
          const { email, password } = event.target.elements;
          try {
            await app
              .auth()
              .signInWithEmailAndPassword(email.value, password.value);
            history.push("/");
          } catch (error) {
            alert(error);
          }
          store.addNotification({
            title: "Alert!",
            message: "You have logged in.",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
        });
        },
        [history]
      );
    
      const { currentUser, pending } = useContext(AuthContext);

      if(pending){
        return <>Loading...</>
      };
    
      if (currentUser) {
        return <Redirect to="/" />;
      }

    return (
        <div>
          <div className="middle">
            <div>
              <h1 className="display-1 text-center mb-3">Recruit Management</h1>
              <h1 className="display-6 text-center mb-3 purpleC">Sign into your account</h1>
              <form onSubmit={handleLogin}>
                <div className="login-box">
                    <div className="form-group elem-center">
                        <p className="label-style">Email</p>
                        <input className="form-control text-center" name="email" type="email" placeholder=""></input>
                    </div>
                    <div className="form-group elem-center">
                        <p className="label-style mt-3">Password</p>
                        <input className="form-control text-center" name="password" type="password" placeholder=""></input>
                    </div>
                    <div className="text-center">
                      <button type="submit" className="btn btn-dark login-button btn-raised mt-3">Login</button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>


            
    )
}

export default withRouter(Login)
