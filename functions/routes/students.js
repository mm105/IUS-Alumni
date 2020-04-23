const fuzz = require('fuzzball')
const { db, admin, firebase } = require('../config/firebaseConfig')

// @route           GET /students/locations
// @desc            Get all students locations
// @access          Public
exports.getStudentsLocations = async (req, res) => {
	try {
		const studentsDocs = await db.collection('students').get()

		let locations = []

		studentsDocs.forEach((doc) => {
			locations.push({
				studentId: doc.id,
				coordinates: doc.data().location.coordinates,
			})
		})

		return res.json(locations)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           GET /students
// @desc            Get all students info
// @access          Public
exports.getAllStudents = async (req, res) => {
	try {
		const studentsDocs = await db.collection('students').get()
		let students = []
		studentsDocs.forEach((doc) =>
			students.push({ studentId: doc.id, ...doc.data() })
		)

		return res.json(students)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           GET /student/:studentId
// @desc            Get student info
// @access          Public
exports.getStudentById = async (req, res) => {
	try {
		const studentDoc = await db
			.collection('students')
			.doc(req.params.studentId)
			.get()
		const studentData = { studentId: studentDoc.id, ...studentDoc.data() }

		return res.json(studentData)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           GET /students/stats
// @desc            Get statistics from the app
// @access          Public
exports.getStudnetsStats = async (req, res) => {
	try {
		const statsDoc = await db.collection('stats').doc('stats').get()
		const stats = statsDoc.data()
		let locs = []
		for (let title in stats.locations) {
			locs.push([title, stats.locations[title]])
		}
		locs.sort((a, b) => (a[1] > b[1] ? -1 : 1))
		if (locs.length > 5) locs = locs.slice(0, 5)
		stats.locations = locs
		return res.json(stats)
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}

// @route           GET /students/search/:search_text
// @desc            Search students by name, position or location
// @access          Public
exports.searchStudents = async (req, res) => {
	let searchText = req.params.search_text
	searchText = searchText.replace('+', ' ')
	searchText = searchText.trim()
	if (searchText.length < 3)
		return res.status(400).json({
			message:
				'Invalid request! Search text must be at least 3 characters long!',
		})
	searchTokens = searchText.split(' ')
	try {
		const studentsDocs = await db.collection('students').get()
		let studentsInfo = []
		studentsDocs.forEach((doc) =>
			studentsInfo.push({ studentId: doc.id, ...doc.data() })
		)

		let students = []
		let positions = []
		let locations = []

		studentsInfo.forEach((student) => {
			let fullName = student.name + student.surname
			let fuzzRatioName = 0
			let fuzzRatioPosition = 0
			let fuzzRatioLocation = 0
			searchTokens.forEach((token) => {
				fuzzRatioName += fuzz.partial_ratio(token, fullName)
				fuzzRatioPosition += fuzz.partial_ratio(
					token,
					student.description
				)
				fuzzRatioLocation += fuzz.partial_ratio(
					token,
					student.location.title
				)
			})
			fuzzRatioName = fuzzRatioName / searchTokens.length
			fuzzRatioPosition = fuzzRatioPosition / searchTokens.length
			fuzzRatioLocation = fuzzRatioLocation / searchTokens.length
			if (fuzzRatioName >= 80) students.push(student)
			if (fuzzRatioPosition >= 80) positions.push(student)
			if (fuzzRatioLocation >= 80) locations.push(student)
		})

		return res.json({ students, positions, locations })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ error })
	}
}
