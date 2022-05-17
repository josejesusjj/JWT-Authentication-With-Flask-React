import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {Context} from "../store/appContext";

export const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();
	const {store, actions} = useContext(Context)
  
	// Handling the email change
	const handleEmail = (e) => {setEmail(e.target.value)};
  
	// Handling the password change
	const handlePassword = (e) => {setPassword(e.target.value);};
  
	// Handling the login form
	const handleLogin = (e) => {
		e.preventDefault();
				if (email === "" || password === "") {
				  alert("Please enter all the fields");
				} else { 
					actions.login(email, password)
			//here we redirect the user to the Private Area: history.push("/private"); o window.location("/private")
		}};

	if(store.token && store.token != "" && store.token != undefined) history.push("/private");

  
	return (
        <div className="container mt-5 card border-info p-5">
            <div clasName="card-header"><h1 className="title p-3">Login</h1></div>
            <div className="row mx-5">
                <div className="col-5">
                    <form>
                        <div className="mb-3">
                        <label for="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" onChange={handleEmail} value={email} className="form-control input" id="exampleInputEmail1" aria-describedby="emailHelp"/>

                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                        <label for="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1 input" onChange={handlePassword} value={password}/>
                        </div>
                        <button type="login" className="btn btn-primary" onClick={handleLogin}>Login</button>
                    </form>
                </div>
            </div>
        </div>
)
	}