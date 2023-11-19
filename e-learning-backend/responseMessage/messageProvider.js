const successMessage = {
    LogIn: "User has been logged in",
    userCreated: "User created Succesfully"
}

const warningMessage = {

}

const errroMessage = {
    unknownError: "Some error Occured",
    userAlreadyExist: "User is already present",
    whilesave: "Some error occured while save in data base",
    jwterror: "Token generation failed, Can't Provide Login Key at the moment",
    userNotExist: "User Does Not Exist",
    wrongpassword: "Given Credentials are not Valid."
}

module.exports = { successMessage, warningMessage, errroMessage };