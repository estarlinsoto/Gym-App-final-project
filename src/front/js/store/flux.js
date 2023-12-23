const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false
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

		}
	};
};

export default getState;