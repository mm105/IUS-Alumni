const { admin, db } = require('../config/firebaseConfig')

module.exports = async (req, res, next) => {
	let idToken
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer ')
	)
		idToken = req.headers.authorization.split('Bearer ')[1]
	else {
		console.error('No token found!')
		return res.status(403).json({ error: 'Unauthorized!' })
	}

	try {
		const decodedToken = await admin.auth().verifyIdToken(idToken)
		req.user = decodedToken

		return next()
	} catch (err) {
		console.error(err)
		return res.status(403).json({ error: err })
	}
}
