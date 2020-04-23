const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (email.match(regEx)) return true
	else return false
}

const isEmpty = (string) => {
	if (string.trim() === '') return true
	else return false
}

exports.validateLoginData = (data) => {
	let errors = {}

	if (isEmpty(data.email)) errors.email = 'Must not be empty!'
	else if (!isEmail(data.email))
		errors.email = 'Must be a valid email address!'
	if (isEmpty(data.password)) errors.password = 'Must not be empty!'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}

exports.validateChangePasswordData = (data) => {
	let errors = {}

	if (!isEmail(data.email)) errors.email = 'Must be valid email address!'
	if (isEmpty(data.email)) errors.email = 'Must not be empty!'
	if (isEmpty(data.password)) errors.password = 'Must not be empty!'
	if (isEmpty(data.newPassword)) errors.newPassword = 'Must not be empty!'
	if (isEmpty(data.newPasswordConfirm))
		errors.newPasswordConfirm = 'Must not be empty!'
	if (data.newPassword !== data.newPasswordConfirm)
		errors.newPasswordConfirm = 'Passwords must match!'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}

exports.validateNewStudentData = (data, edit = false) => {
	let errors = {}

	if (!('name' in data) || isEmpty(data.name))
		errors.name = 'Must not be empty!'
	if (!('surname' in data) || isEmpty(data.surname))
		errors.surname = 'Must not be empty!'
	if (!('graduated' in data) || isEmpty(data.graduated))
		errors.graduated = 'Must not be empty!'
	if (!('description' in data) || isEmpty(data.description))
		errors.description = 'Must not be empty!'

	if ('location' in data) {
		if (!('title' in data.location) || isEmpty(data.location.title))
			errors.location.title = 'Must not be empty!'
		if (
			!('coordinates' in data.location) ||
			data.location.coordinates.length != 2
		)
			errors.location.coordinates = 'Location coordinates invalid!'
		if (!('type' in data.location) && isEmpty(data.location.type))
			errors.location.type = 'Must not be empty!'
	} else {
		errors.location = 'Location details are required!'
	}

	if (edit && !('studentId' in data))
		errors.studentId = 'Student ID is required for this action!'

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	}
}
