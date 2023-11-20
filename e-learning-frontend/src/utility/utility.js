const baseurl = "http://localhost:8080"
const requestUrls = {
    signUp : baseurl + "/backend/api/v1/signUp/",
    logIn : baseurl + "/backend/api/v1/LogIn/",
    createCourse: baseurl + "/backend/api/v1/CreateCourse/",
    updateContent: baseurl + "/backend/api/v1/courseContentHandler/",
    getCoursespecificdetails: baseurl + "/backend/api/v1/course/view/",
    getWatchKeydetails: baseurl + "/backend/api/v1/course/getWatchKey/",
    allcourses: baseurl + "/backend/api/v1/course/all/",
    quickBucketUpload: "http://localhost:9999/quickBucket/upload/",
    quickBucketWatch: "http://localhost:9999/quickBucket/watch/"

}

export { requestUrls }