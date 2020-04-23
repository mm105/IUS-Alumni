const functions = require('firebase-functions')
const app = require('express')()
const cors = require('cors')
const {
	adminLogin,
	changePassword,
	addStudent,
	editStudent,
	adminLoad,
	deleteStudent,
} = require('./routes/admin')
const {
	getStudentsLocations,
	getAllStudents,
	getStudentById,
	getStudnetsStats,
	searchStudents,
} = require('./routes/students')
const auth = require('./util/auth')

app.use(cors())

app.post('/admin/login', adminLogin)
app.post('/admin/change-password', auth, changePassword)
app.post('/admin/add-student', auth, addStudent)
app.put('/admin/edit-student', auth, editStudent)
app.delete('/admin/delete-student', auth, deleteStudent)
app.get('/admin/load', auth, adminLoad)

app.get('/students/locations', getStudentsLocations)
app.get('/students', getAllStudents)
app.get('/student/:studentId', getStudentById)
app.get('/students/stats', getStudnetsStats)
app.get('/students/search/:search_text', searchStudents)

exports.api = functions.region('europe-west1').https.onRequest(app)
