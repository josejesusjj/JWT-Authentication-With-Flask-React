const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			syncTokenSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("token stored");
				if (token && token != "" && token != undefined)
				  setStore({ token: token });
			  },
		
			  logout: () => {
				sessionStorage.removeItem("token");
				sessionStorage.removeItem("email");
				sessionStorage.removeItem("id");
				console.log("log out");
				setStore({ token: null });
				setStore({ email: null });
				setStore({ id: null });
			  },

			  login: async (email, password) => {
				try {
				  if (email === "" || password === "") {
					setMissingField("Please enter all the fields");
				  } else {
					const response = await fetch(
					  process.env.BACKEND_URL + "/api/login",
					  {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email: email, password: password }),
					  }
					);
		
					if (response.status != 200) {
					  alert("invalid user or password");
					  return false;
					}
					const responseFromApi = await response.json(); //puedo cambiar la alerta por una funcion que suelte un html y así homogeneizar las alertas
					console.log("response from API", responseFromApi);
					sessionStorage.setItem("token", responseFromApi.token);
					sessionStorage.setItem("email", responseFromApi.email); //con esto podemos recuperar el email y el nombre directamente en el front sin tener que hacer llamada
					sessionStorage.setItem("id", responseFromApi.id);
					setStore({
					  token: responseFromApi.token,
					  email: responseFromApi.email,
					});
				  }
				} catch (error) {
				  console.log("There is an error in login process");
				}
			  },
		
		}
	};
};

export default getState;
