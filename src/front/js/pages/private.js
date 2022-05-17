import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Private = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container text-center">
			<div className="row">
                {!store.token ? (
                  <div>
                    <h2>If you seeing this is because you're not logged. Please log in first</h2>
                  </div>
                ) : (
                  <div>
                   <h3 className="m-3">This is an example of private area, there's nothing to show because this web is only for showing authentication</h3>
                   <br/>
				   <img src="https://c.tenor.com/j5YcO9slE7YAAAAC/leslie-nielsen-nothing-to-see-here.gif"></img>
                  </div>
                )}
            </div>
		</div>
	);
};
