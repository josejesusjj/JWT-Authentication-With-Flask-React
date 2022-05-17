import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5 ">
			<h1>Welcome to my authentication page code</h1>
			<p>
				<img className="keyword" src="https://media.giphy.com/media/1oDsJobSjjdHxoLxZv/giphy.gif"/>
			</p>
			<h5>please <Link  className="" to="/login"><button type="button" className="btn btn-primary">Login</button></Link> or <Link to="/signup"><button type="button" className="btn btn-primary">SignUp</button></Link> in order to go to the private area</h5>
		</div>
	);
};
