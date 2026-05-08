export function validateLogin(storedObject, enteredInfo) {
	if (
		storedObject.username === enteredInfo.username &&
		storedObject.password === enteredInfo.password
	)
		return true;
	else return false;
}
