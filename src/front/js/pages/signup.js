import React, { useState } from "react";
import "../../styles/home.css";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if ( email === "" || password === "") {
      setError("Please enter all the fields");
    } else {
      fetch(
        process.env.BACKEND_URL + "/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      )
        .then((response) => {
          if (response.ok) {
            setSubmitted(true);
            setError(false);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          setError(data.message);
        });
    }
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {name} Successfully registered!!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error bg-warning m-5 rounded"
        style={{
          display: error != false ? "" : "none",
        }}
      >
        <h3>{error}</h3>
      </div>
    );
  };

  return (
    <div className="container mt-5 card border-info p-5">
      <div clasName="card-header"><h1 className="title p-3">User Registration</h1></div>
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
                <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" for="exampleCheck1" >I Agree</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
                {/* Calling to the methods */}
                <div className="messages">
                {errorMessage()}
                {successMessage()}
                </div>
        </div>
      </div>
    </div>    
  );
}
