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
			}
		}
	};
};

export default getState;