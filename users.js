import { users } from './index.js'

export const addUser = async (req, res) => {
	const userAdded = await users.insertOne(req.body)

	res.send(userAdded)
}

export const loginUser = async (req, res) => {
	try {
		const userFound = await users.findOne({ email: req.body.email })
		const dbPassword = userFound.password // password saved in db
		const passwordSent = req.body.password // password coming in from body

		if (userFound && dbPassword === passwordSent) {
			res.send(userFound)
		} else {
			res.send('User NOT Allowed')
		}
	} catch (err) {
		console.log(err)
	}

	// we need to add user into mongodb
}
