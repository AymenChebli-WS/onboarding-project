import './navbar-style.css';
import { app } from '../../firebase';
import { useHistory, useLocation, withRouter } from 'react-router-dom'
import { BoxArrowLeft, BoxArrowRight } from 'react-bootstrap-icons';
import { store } from 'react-notifications-component';

const Navigbar = () => {

    let location = useLocation();
    if (location.pathname.match(/login/)){
        return null;
      }

    const handleSignOut = () => {
        app.auth().signOut();
        store.addNotification({
            title: "Alert!",
            message: "You have logged out.",
            type: "danger",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
        });
    };

    return (
        <div className="w-100 colorize">
            <header
                className="
                d-flex
                flex-row-reverse flex-wrap
                align-items-end
                justify-content-center justify-content-md-between
                py-2
                mb-4
                border-bottom"
            >
                    <div className="d-flex align-items-center">
                        <div>
                        <button className="btn purpleBC btn-raised me-3" onClick={handleSignOut}>Log out</button>
                        </div>
                    </div>
            </header>
        </div>

    )
}


export default Navigbar
