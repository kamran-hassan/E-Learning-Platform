const successMessage = {
    LogIn: "User has been logged in",
    userCreated: "User created Succesfully",
    courseadded: "Sucessfully Created a new course"
}

const warningMessage = {

}

const errroMessage = {
    unknownError: "Some error Occured",
    userAlreadyExist: "User is already present",
    whilesave: "Some error occured while save in data base",
    jwterror: "Token generation failed, Can't Provide Login Key at the moment",
    userNotExist: "User Does Not Exist",
    wrongpassword: "Given Credentials are not Valid.",
    notAbletocreateCourse: "Not Able to Create a new Course",
    sessionExpired: "Session has been Expired",
    notAbletoAddCourseData: "Not able to update course Data",
    coursefetcherror: "Not able to load the course.",
    watchKeyerror: "Watch Key Not Found"
}

module.exports = { successMessage, warningMessage, errroMessage };