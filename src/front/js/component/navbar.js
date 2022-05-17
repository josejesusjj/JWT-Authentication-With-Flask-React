import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Landing Page</span>
				</Link>
				<div className="ml-auto h3">
                {!store.token ? (
                  <div>
                    <Link  type="button" className="btn btn-primary mx-1" to="/login">Login</Link>
                    <Link to="/signup"  type="button" className="btn btn-primary mx-1">SignUp</Link>
                  </div>
                ) : (
                  <div className="loginPadre">
                    <Link to="/private">
                      <button type="button" className="btn btn-primary mx-1" title="Home">Private</button>
                    </Link>
                    <Link to="/">
                      <button onClick={() => actions.logout()} type="button" className="btn btn-primary mx-1" title="Log Out">Log out</button>
                    </Link>
                  </div>
                )}
              </div>
			</div>
		</nav>
	);
};
