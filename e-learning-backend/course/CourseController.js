const mongoose = require("mongoose");
const Course = require("./Course");
const { verifyJwtToken } = require("../auth/authUtility");
const User = require("../user/User");
const { connectionUriSecret } = require("../db/dbKeys");
const { errroMessage } = require("../responseMessage/messageProvider");
const { TokenExpiredError } = require("jsonwebtoken");
const { quickBucketService } = require("../utility/utility");


const createCourseApi = async (req, res) => {
    // console.log(req.body)
    try {
        var result = await createCourse(req.body);
        res.send(result);
    }
    catch (error) {
        if(error instanceof TokenExpiredError){
            res.status(401);
            res.send({message: errroMessage.sessionExpired})
        }
        else {
            res.status(400);
            res.send({message: errroMessage.notAbletocreateCourse})
        }
    }
};

const courseContentApi = async (req, res) => {
        try{
            const result = await updateCourseContent(req.body)
            if(result){
                res.send(result);
            }
            else{
                throw new Error();
            }
        }
        catch (error) {
            if(error instanceof TokenExpiredError){
                res.status(401);
                res.send({message: errroMessage.sessionExpired})
            }
            else {
                res.status(400);
                res.send({message: errroMessage.notAbletoAddCourseData})
            }
        }

}

const updateCourseContent = async (c_c) => {
    try{
        try {
            var userdetails = await verifyJwtToken(c_c.jwt);
            // console.log(userdetails)
            // console.log(c_c.course_content)
            if(userdetails){
                await mongoose.connect(connectionUriSecret);
                var usr = await User.find({email: userdetails.email});
                if(usr != null){
                    var result = await Course.findOneAndUpdate({_id: c_c.course_details._id}, {course_content: c_c.course_content});
                    if(result){
                        // console.log(result.course_content)
                        var files = {};
                        Object.keys(result.course_content).forEach(e => {
                            files[e] = c_c.course_details._id+'_module'+e.charAt[1]+'_video'
                        })
                        const rawResponse = await fetch(quickBucketService.updateKeyUrl, {
                            method: 'POST',
                            headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userid : quickBucketService.userid,
                                password : quickBucketService.password,
                                fileNames : files
                            })
                        });
                        const content = await rawResponse.json();
                        // console.log(content, result.course_content);
                        content.course_content = result.course_content;
                        return content;
                    }
                    else {
                        throw new Error();
                    }
                }

            }
        }
        catch (error) {
            console.log("===",error);
            throw error;
        }
        finally{
            mongoose.connection.close();
            console.log("Closing Connection ")
        }
    }
    catch (error){
        throw error;
    }
}


const createCourse = async (c) => {
    try {
        var userdetails = await verifyJwtToken(c.jwt);
        console.log(userdetails.email)
        if(userdetails){
            await mongoose.connect(connectionUriSecret);
            var u = await User.find({email: userdetails.email});
            if(u){
                c.course_details.created_by = u[0]._id;
                console.log(c);
                const course = Course(c.course_details);
                const result = await course.save();
                return result;
            }
            // console.log(u[0]._id);    
            
        }
    }
    catch (error) {
        //console.log("===",error);
        throw error;
    }
    finally{
        mongoose.connection.close();
        console.log("Closing Connection ")
    }
}


module.exports = { createCourseApi, courseContentApi }