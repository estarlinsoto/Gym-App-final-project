const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false,
			newUserRes: ''
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

			}
		}
	};
};

export default getState;