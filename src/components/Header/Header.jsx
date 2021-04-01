import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase';

const Header = ({loggedInUser}) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">BOIGHOR</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ms-auto">
                        <Link className="nav-link" to="/">HOME</Link>
                        <Link className="nav-link" to={`/orders/${loggedInUser?.uid}`}>ORDERS</Link>
                        <Link className="nav-link" to="/admin">ADMIN</Link>
                        <Link className="nav-link" to="/">DEALS</Link>
                        <Link className="nav-link disabled" to="/"  tabIndex="-1" aria-disabled="true">{loggedInUser?.displayName || loggedInUser?.email}</Link>
                        {
                            loggedInUser ? 
                            <button className="nav-link btn btn-danger text-white" onClick={() => auth.signOut()}>Logout</button>
                            :
                            <Link className="nav-link btn btn-success text-white" to="/login">LOGIN</Link>
                            
                        }
                    </div>
                </div>
            </div>
        </nav>

    );
};

export default Header;