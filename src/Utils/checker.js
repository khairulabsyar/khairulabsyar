export const usernameChecker = (username) => {
	const l = username.length
	if (l >= 8 && l <= 20) {
		return true
	}
	return false
}

export const emailChecker = (email) => {
	return email.match(/^\S+@\S+\.\S+$/) ? true : false
}

export const passwordChecker = (password) => {
	const l = password.length
	if (l >= 8 && l <= 50) {
		return true
	}
	return false
}