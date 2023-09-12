import bcrypt from 'bcrypt'
import { users } from './index.js'

export const addUser = async (req, res) => {
	// check if email has @ and a .com, .net
	// check if password meets minimum requirements (8 or more, complex)
	if (req.body.email && req.body.password) {
		try {
			const hashedPassword = await bcrypt.hash(req.body.password, 10)

			const userAdded = await users.insertOne({ email: req.body.email.toLowerCase(), password: hashedPassword })
			res.send(userAdded)
		} catch (err) {
			console.log(err)
			res.send(err)
		}
	}
}

export const loginUser = async (req, res) => {
	try {
		const userFound = await users.findOne({ email: req.body.email })

		if (userFound) {
			bcrypt.compare(req.body.password, userFound.password, (err, passwordOk) => {
				if (!err && passwordOk) {
					res.send(userFound)
				} else {
					console.log('err -> ', err)
					res.send({ error: 'User not found or password incorrect' })
				}
			})
		} else {
			res.send({ error: 'User not found or password incorrect' })
		}
	} catch (err) {
		console.log(err)
		res.send(err)
	}
}
