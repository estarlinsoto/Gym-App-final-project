const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false,
			newUserRes: '',
			infoUser: []
		},
		actions: {
			logout: () => {
				localStorage.removeItem("access_token");

				if (setStore) {
					setStore({
						isLoggedIn: false,
						userData: null,
						message: null
					});
				}
			},

			logIn: async (userEmail, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: userEmail,
						password: password,
					}),
				};
				await fetch(process.env.BACKEND_URL + "/api/login", opts)
					.then((resp) => {
						if (resp.status === 200) return resp.json();
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);
						
						setStore({ store: store.loginRes = data.msg})
						console.log(store.loginRes)
					})
					.catch((error) => {
						console.error("There was an error", error);

					});
			},


			createNewUser: async (newUser) => {
				try {
					const store = getStore()
					setStore({ store: store.newUserRes = "" })
					await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {
							
							"Content-type": "application/json",
						},

						body: JSON.stringify(newUser)
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.newUserRes = json.msg }))
						console.log(store.newUserRes)



				} catch (error) {
					console.log("Create user function error==", error)
				}

			},

			getUser: async (id) => {
				try {
					const url = process.env.BACKEND_URL + `/api/user/${id}`;
					
					const response = await fetch(url);
					if(!response.ok){
						throw new Error("error:", response.status, response.statusText)
					}
					const data = await response.json()
					const store = getStore()
					setStore({...store, infoUser: data})
					console.log("Answer:", data)

				} catch (error) {
					console.log("Error obtaining information:", error)
				}
			},

		}
	};
};

export default getState;