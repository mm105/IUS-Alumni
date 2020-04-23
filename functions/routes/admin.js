const { db, admin, firebase } = require('../config/firebaseConfig')

const {
	validateLoginData,
	validateChangePasswordData,
	validateNewStudentData,
} = require('../util/validation')

// @route           GET /admin/load
// @desc            Load admin
// @access          Private
exports.adminLoad = (req, res) => {
	return res.json({ isAuthenticated: true })
}

// @route           POST /admin/login
// @desc            Login as admin
// @access          Public
exports.adminLogin = async (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	}

	const { valid, errors } = validateLoginData(user)
	if (!valid) return res.status(400).json(errors)

	try {
		const data = await firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)

		let token = await data.user.getIdToken()
		return res.json({ token })
	} catch (error) {
		console.error(error)

		if (
			error.code === 'auth/wrong-password' ||
			error.code === 'auth/user-not-found'
		)
			return res
				.status(403)
				.json({ general: 'Wrong credentials, please try again' })
		else return res.status(500).json(error)
	}
}

// @route           POST /users/update-password
// @desc            Change user password
// @access          Private
exports.changePassword = async (req, res) => {
	const { valid, errors } = validateChangePasswordData(req.body)
	if (!valid) return res.status(400).json(errors)

	const { email, password, newPassword } = req.body

	try {
		const userCredential = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)

		await userCredential.user.updatePassword(newPassword)

		return res
			.status(201)
			.json({ message: 'Password successfully updated!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           POST /admin/add-student
// @desc            Add new student to database
// @access          Private
exports.addStudent = async (req, res) => {
	const { valid, errors } = validateNewStudentData(req.body)
	if (!valid) return res.status(400).json(errors)

	let { name, surname, graduated, description, location } = req.body

	try {
		const studentsDocs = await db.collection('students').get()
		let studentsLocations = []
		studentsDocs.forEach((doc) => {
			studentsLocations.push(doc.data().location.coordinates)
		})

		while (
			studentsLocations.filter((co) => {
				return (
					co[0] === location.coordinates[0] &&
					co[1] === location.coordinates[1]
				)
			}).length > 0
		) {
			let orientation = Math.round(Math.random() * 10)
			let amount = Math.floor(Math.random() * 4) + 1

			if (orientation >= 0 && orientation < 2.5) {
				switch (amount) {
					case 1:
						location.coordinates[0] -= 0.0002
						break
					case 2:
						location.coordinates[0] -= 0.0004
						break
					case 3:
						location.coordinates[0] -= 0.0005
						break
					case 4:
						location.coordinates[0] -= 0.0006
						break
					default:
						location.coordinates[0] -= 0.00015
						break
				}
			} else if (orientation >= 2.5 && orientation < 5) {
				switch (amount) {
					case 1:
						location.coordinates[0] += 0.0002
						break
					case 2:
						location.coordinates[0] += 0.0004
						break
					case 3:
						location.coordinates[0] += 0.0005
						break
					case 4:
						location.coordinates[0] += 0.0006
						break
					default:
						location.coordinates[0] += 0.00015
						break
				}
			} else if (orientation >= 5 && orientation < 7.5) {
				switch (amount) {
					case 1:
						location.coordinates[1] += 0.0002
						break
					case 2:
						location.coordinates[1] += 0.0004
						break
					case 3:
						location.coordinates[1] += 0.0005
						break
					case 4:
						location.coordinates[1] += 0.0006
						break
					default:
						location.coordinates[1] += 0.00015
						break
				}
			} else {
				switch (amount) {
					case 1:
						location.coordinates[1] -= 0.0002
						break
					case 2:
						location.coordinates[1] -= 0.0004
						break
					case 3:
						location.coordinates[1] -= 0.0005
						break
					case 4:
						location.coordinates[1] -= 0.0006
						break
					default:
						location.coordinates[1] -= 0.00015
						break
				}
			}
		}

		await db
			.collection('students')
			.add({ name, surname, graduated, description, location })

		const stats = (await db.collection('stats').doc('stats').get()).data()
		stats.locations.hasOwnProperty(location.title)
			? (stats.locations[location.title] += 1)
			: (stats.locations[location.title] = 1)
		await db
			.collection('stats')
			.doc('stats')
			.update({
				numberOfStudents: stats.numberOfStudents + 1,
				locations: stats.locations,
			})

		return res
			.status(201)
			.json({ message: 'New student successfully added!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           PUT /admin/edit-student
// @desc            Edit student info
// @access          Private
exports.editStudent = async (req, res) => {
	const { valid, errors } = validateNewStudentData(req.body, true)
	if (!valid) return res.status(400).json(errors)

	let {
		studentId,
		name,
		surname,
		graduated,
		description,
		location,
	} = req.body

	try {
		const previousLocationTitle = (
			await db.collection('students').doc(studentId).get()
		).data().location.title

		await db
			.collection('students')
			.doc(studentId)
			.set({ name, surname, graduated, description, location })

		if (previousLocationTitle !== location.title) {
			const stats = (
				await db.collection('stats').doc('stats').get()
			).data()
			stats.locations[previousLocationTitle] -= 1
			if (stats.locations[previousLocationTitle] === 0)
				delete stats.locations[previousLocationTitle]
			stats.locations.hasOwnProperty(location.title)
				? (stats.locations[location.title] += 1)
				: (stats.locations[location.title] = 1)
			await db.collection('stats').doc('stats').update({
				locations: stats.locations,
			})
		}

		return res
			.status(201)
			.json({ message: 'Student info successfully updated!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           DELETE /admin/delete-student
// @desc            Delete student
// @access          Private
exports.deleteStudent = async (req, res) => {
	const studentId = req.body.studentId
	if (studentId === null || studentId === undefined) {
		return res.status(400).json({ message: 'Data not provided!' })
	}

	try {
		const previousLocationTitle = (
			await db.collection('students').doc(studentId).get()
		).data().location.title

		await db.collection('students').doc(studentId).delete()

		const stats = (await db.collection('stats').doc('stats').get()).data()
		stats.locations[previousLocationTitle] -= 1
		if (stats.locations[previousLocationTitle] === 0)
			delete stats.locations[previousLocationTitle]
		await db
			.collection('stats')
			.doc('stats')
			.update({
				numberOfStudents: stats.numberOfStudents - 1,
				locations: stats.locations,
			})

		return res
			.status(201)
			.json({ message: 'Student successfully deleted!' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}
