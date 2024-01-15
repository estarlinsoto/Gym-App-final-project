

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			userData: null,
			isLoggedIn: false,
			newUserRes: '',
			privateData: "",
			loginRes: "",
			role: '',
			adminUserData: "",
			adminTrainerData: "",
			newTrainerRes: "",
			loginTrainerRes: "",
			routineData: "",
			privateRes: "",
			setRoutineRes: "",
			deleteRoutineMsg: "",
			setDietRes: "",
			deleteDietMsg: "",
			dietData: "",
			routineDataTrainer: "",
			dietDataUser: "",
			client: "",
			secret: "",
			product_id: "",
			redirectToPaypal: "",
			newUser: "",
			suscriptioId: "",
			getUser: "",
			editUserRes: "",
			paymentIdRes: ""

		},
		actions: {
			logout: () => {
				sessionStorage.removeItem("access_token");
				setStore({
					message: null,
					userData: null,
					isLoggedIn: false,
					newUserRes: '',
					privateData: "",
					loginRes: "",
					role: '',
					adminUserData: "",
					adminTrainerData: "",
					newTrainerRes: "",
					loginTrainerRes: "",
					routineData: "",
					privateRes: "",
					setRoutineRes: "",
					deleteRoutineMsg: "",
					setDietRes: "",
					deleteDietMsg: "",
					dietData: "",
					routineDataTrainer: "",
					dietDataUser: "",
					client: "",
					secret: "",
					product_id: "",
					redirectToPaypal: "",
					newUser: "",
					suscriptioId: "",
					getUser: "",
					editUserRes: "",
					paymentIdRes: ""
				});


			},

			logIn: async (userEmail, password) => {
				const store = getStore()
				const actions = getActions()
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
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else if (res.status == 402) {
							actions.getUserForPayment(userEmail)
							setStore({ store: store.loginRes = "user not pay, redirecting to paypal" })
							throw Error(res.statusText)
						} else if (res.status == 401) {
							setStore({ store: store.loginRes = "Incorrect password" })
							throw Error(res.statusText)
						} else if (res.status == 404) {
							setStore({ store: store.loginRes = "this email is not registered" })
							throw Error(res.statusText)
						} else {
							setStore({ store: store.loginRes = "this email is not registered" })
							throw Error(res.statusText)
						}
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);

						setStore({ store: store.loginRes = data.msg })
						setStore({ store: store.role = data.role })
						setStore({ store: store.privateRes = "" })
					})
			},
			adminLogIn: async (user) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify(user),
				};
				await fetch(`${process.env.BACKEND_URL}/api/log`, opts)
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else if (res.status == 401) {
							setStore({ store: store.loginRes = "Incorrect password" })
							throw Error(res.statusText)
						} else if (res.status == 404) {
							setStore({ store: store.loginRes = "this email is not registered" })
							throw Error(res.statusText)
						} else {
							setStore({ store: store.loginRes = "this email is not registered" })
							throw Error(res.statusText)
						}
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);

						setStore({ store: store.loginRes = data.msg })
						setStore({ store: store.role = data.role })
						setStore({ store: store.privateRes = "" })
					})
			},
			getUserForPayment: async (email) => {
				const store = getStore()
				const actions = getActions()
				await fetch(`${process.env.BACKEND_URL}/api/get`, {
					body: JSON.stringify({ email: email }),
					method: 'POST',
					headers: {
						"Content-type": "application/json",
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
						}
					})
					.then((json) => {
						setStore({ store: store.newUser = json })
						setStore({ store: store.client = json.client })
						setStore({ store: store.secret = json.secret })
						actions.createProductPaypal()
					})


			},

			trainerLogIn: async (email, password) => {
				const store = getStore()
				const opts = {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};
				await fetch(process.env.BACKEND_URL + "/api/login/trainer", opts)
					.then((resp) => {
						if (resp.status === 200) return resp.json();
					})
					.then((data) => {
						sessionStorage.setItem("access_token", data.access_token);

						setStore({ store: store.loginTrainerRes = data.msg })
						setStore({ store: store.role = data.role })
						setStore({ store: store.privateRes = "" })

					})
					.catch((error) => {
						console.error("There was an error", error);

					});
			},
			createNewUser: async (newUser) => {
				try {
					const store = getStore()
					const actions = getActions()
					setStore({ store: store.newUser = newUser })
					setStore({ store: store.newUserRes = "" })

					await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: {

							"Content-type": "application/json",
						},

						body: JSON.stringify(newUser)
					})
						.then((res) => {
							if (res.status == 200) {
								return res.json()
							} if (res.status == 409) {
								setStore({ store: store.newUserRes = "Email already exists." })
								throw Error(res.statusText)
							} else {
								setStore({ store: store.newUserRes = res })
								throw Error(res.statusText)
							}
						})
						.then((json) => {
							setStore({ store: store.newUserRes = "success" })
							//console.log(json.user_added.client)
							setStore({ store: store.client = json.user_added.client })
							setStore({ store: store.secret = json.user_added.secret })

						})

					actions.createProductPaypal()

				} catch (error) {
					console.log("Create user function error==", error)
				}

			},
			createNewAdmin: async (admin) => {
				const store = getStore()
				setStore({ store: store.newUserRes = "" })
				await fetch(process.env.BACKEND_URL + "/api/admin", {
					method: "POST",
					headers: {
						"Content-type": "application/json",
					},

					body: JSON.stringify(admin)
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} if (res.status == 409) {
							setStore({ store: store.newUserRes = "Email already exists" })
							throw Error(res.statusText)
						} else {
							setStore({ store: store.newUserRes = "error" })
							throw Error(res.statusText)
						}
					})
					.then((json) => setStore({ store: store.newUserRes = "success" }))


			},
			privateViewRequest: async () => {

				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/private", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)
						}
					})
					.then((json) => store.privateRes = json.msg)
				setStore({ store: store.privateRes })
				//console.log(privateRes)
			},
			privateViewRequestTrainer: async () => {

				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/private/trainer", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)
						}
					})
					.then((json) => setStore({ store: store.privateRes = json.msg }))


			},

			privateViewRequestAdmin: async () => {

				const store = getStore()
				await fetch(`${process.env.BACKEND_URL}/api/private/private`, {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)
						}
					})
					.then((json) => store.privateData = json)
				setStore({ store: store.privateRes = "success" })
				setStore({ store: store.privateData })
			},
			getAllUsers: async () => {

				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/all", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							//console.log(store.adminUserData)
							throw Error(res.statusText)
						}
					})
					.then((json) => {
						setStore({ store: store.adminUserData = json })
					})
			},
			getAllTrainers: async () => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/all/trainers", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.adminTrainerData = json }))


			},
			deleteUser: async (id) => {
				try {
					const store = getStore()
					//setStore({ store: store.adminUserData = "" })
					await fetch(process.env.BACKEND_URL + `/api/user/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteUserMsg = json.msg }))
					location.reload(true)



				} catch (error) {
					console.log("delete user function error==", error)
				}
			},
			deleteRoutine: async (id) => {
				try {
					const store = getStore()
					await fetch(process.env.BACKEND_URL + `/api/routine/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteRoutineMsg = json.msg }))




				} catch (error) {
					console.log("delete routine function error==", error)
				}
			},
			deleteDiet: async (id) => {
				try {
					const store = getStore()
					await fetch(process.env.BACKEND_URL + `/api/diet/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteDietMsg = json.msg }))

				} catch (error) {
					console.log("delete diet function error==", error)
				}
			},
			deleteTrainer: async (id) => {
				try {
					const store = getStore()

					await fetch(process.env.BACKEND_URL + `/api/trainer/delete/${id}`, {
						method: "DELETE",
						headers: {
							"Content-type": "application/json",
						}
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.deleteUserMsg = json.msg }))
					location.reload(true)



				} catch (error) {
					console.log("delete user function error==", error)
				}
			},
			createNewTrainer: async (newTrainer) => {
				try {
					const store = getStore()
					setStore({ store: store.newTrainerRes = "" })
					await fetch(process.env.BACKEND_URL + "/api/signup/trainer", {
						method: "POST",
						headers: {

							"Content-type": "application/json",
						},

						body: JSON.stringify(newTrainer)
					})
						.then((res) => res.json())
						.then((json) => setStore({ store: store.newTrainerRes = json.msg }))

				} catch (error) {
					console.log("Create new trainer function error==", error)
				}

			},
			getRoutine: async () => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/get/routine", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.routineData = json }))



			},
			getRoutine: async () => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/get/routine", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.routineData = json }))



			},
			getDiet: async () => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/get/diet", {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.dietDataUser = json }))



			},
			assignRoutine: async (routine) => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/assign/routine", {
					method: "POST",
					body: JSON.stringify(routine),
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`,
						"Content-type": "application/json"
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.setRoutineRes = json }))
			},
			assignDiet: async (diet) => {
				const store = getStore()
				await fetch(process.env.BACKEND_URL + "/api/assign/diet", {
					method: "POST",
					body: JSON.stringify(diet),
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`,
						"Content-type": "application/json"
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} if (res.status == 400) {
							setStore({ store: store.setDietRes = { 'msg': "user already have diet assigned" } })
							throw Error(res.statusText)
						} else {
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.setDietRes = json }))
			},

			getOneDiet: async (userId) => {
				const store = getStore()
				setStore({ store: store.dietData = "" })
				await fetch(process.env.BACKEND_URL + `/api/get/diet/${userId}`, {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {

							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.dietData = json }))

			},
			getOneUser: async (userId) => {
				const store = getStore()
				setStore({ store: store.getUser = "" })
				await fetch(process.env.BACKEND_URL + `/api/get/user/${userId}`, {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.getUser = json }))

			},
			getOneRoutine: async (userId) => {
				const store = getStore()
				setStore({ store: store.routineDataTrainer = "" })
				await fetch(process.env.BACKEND_URL + `/api/get/routine/${userId}`, {
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`
					}
				})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							setStore({ store: store.privateRes = true })
							throw Error(res.statusText)

						}
					})
					.then((json) => setStore({ store: store.routineDataTrainer = json }))

			},
			createProductPaypal: async () => {
				const store = getStore()
				const actions = getActions()

				const product = {
					name: 'GYM APP',
					description: "Subscription of GYMAPP",
					type: 'SERVICE',
					category: 'SERVICES',
					image_url: 'https://st3.depositphotos.com/1030956/15040/v/450/depositphotos_150400242-stock-illustration-sport-club-logotype-template.jpg',
					return_url: `${process.env.FRONTEND_URL}/home`

				}

				await fetch(`${process.env.PAYPAL_URL}/v1/catalogs/products`, {
					body: JSON.stringify(product),
					method: 'POST',
					headers: {
						Authorization:
							`Basic ${btoa(store.client + ":" + store.secret)}`,
						"Content-type": "application/json"

					},
				})
					.then((res) => {
						if (res.status !== 200) {
							return res.json()
						} else {
							throw Error(res.statusText)
						}
					})
					.then((json) => {
						setStore({ store: store.product_id = json.id })
						actions.createPlan()
					})

			},
			createPlan: async () => {
				const store = getStore()
				const actions = getActions()
				const plan = {
					name: 'Gym suscription',
					product_id: store.product_id,
					status: "ACTIVE",
					return_url: "https://cuddly-train-69g46jgrrpqq3r9pg-3000.app.github.dev/home",
					billing_cycles: [
						{
							frequency: {
								interval_unit: "MONTH",
								interval_count: 1
							},
							tenure_type: "REGULAR",
							sequence: 1,
							total_cycles: 12,
							pricing_scheme: {
								fixed_price: {
									value: "12",
									currency_code: "USD"
								}
							}
						}],
					payment_preferences: {
						auto_bill_outstanding: true,
						setup_fee: {
							value: "12",
							currency_code: "USD"
						},
						setup_fee_failure_action: "CONTINUE",
						payment_failure_threshold: 3
					},
					taxes: {
						percentage: "10",
						inclusive: false
					}
				}


				await fetch(`${process.env.PAYPAL_URL}/v1/billing/plans`, {
					body: JSON.stringify(plan),
					method: 'POST',
					headers: {
						Authorization:
							`Basic ${btoa(store.client + ":" + store.secret)}`,
						"Content-type": "application/json"
					},
				})
					.then((res) => {
						if (res.status == 201) {
							return res.json()
						} else {

							throw Error(res.statusText)
						}
					})
					.then((json) => {
						setStore({ store: store.planId = json.id })
						actions.generatesuscription()

					})
			},
			generatesuscription: async () => {
				const store = getStore()
				const actions = getActions()
				const subscription = {
					plan_id: store.planId,
					quantity: 1,
					subscriber: {
						name: {
							given_name: store.newUser.first_name,
							surname: store.newUser.last_name
						},
						email_address: store.newUser.email,
					},
					return_url: `${process.env.FRONTEND_URL}/login`,
					cancel_url: `${process.env.FRONTEND_URL}/home`
				}
				await fetch(`${process.env.PAYPAL_URL}/v1/billing/subscriptions`, {
					body: JSON.stringify(subscription),
					method: 'POST',
					headers: {
						Authorization:
							`Basic ${btoa(store.client + ":" + store.secret)}`,
						"Content-type": "application/json"
					},
				})
					.then((res) => {
						if (res.status == 201) {
							return res.json()
						} else {

							throw Error(res.statusText)
						}
					})
					.then((json) => {
						setStore({ store: store.redirectToPaypal = json.links[0].href })
						setStore({ store: store.suscriptioId = json.id })
						actions.sendEmail()
						//console.log(json)
					})
			},

			sendEmail: async () => {
				const store = getStore()
				localStorage.setItem('email', store.newUser.email)
				await fetch(`${process.env.BACKEND_URL}/api/payment/update`, {
					body: JSON.stringify({
						email: store.newUser.email,
						id: store.suscriptioId
					}),
					method: 'PUT',
					headers: {
						"Content-type": "application/json"
					},
				})
					.then((res) => res.json())
					.then((json) => json)
			},
			editUser: async (user) => {
				const store = getStore()
				await fetch(`${process.env.BACKEND_URL}/api/user/edit`, {
					body: JSON.stringify(user),
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${sessionStorage.access_token}`,
						"Content-type": "application/json"
					},
				})
					.then((res) => res.json())
					.then((json) => setStore({ store: store.editUserRes = json.msg }))
			},
			get_payment: async () => {
				const store = getStore()
				setStore({ store: store.paymentIdRes = "" })
				await fetch(`${process.env.BACKEND_URL}/api/get/pay/${localStorage.getItem('email')}`, {})
					.then((res) => {
						if (res.status == 200) {
							return res.json()
						} else {
							throw Error(res.statusText)
						}
					})
					.then((json) => setStore({ store: store.paymentIdRes = json.msg }))
				//console.log(store.paymentIdRes)
				//console.log(localStorage.getItem('email'))

			},


		}
	};
}

export default getState;