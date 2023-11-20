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

const getCourseContentApi = async (req, res) => {
    try{
        const result = await getCourseContent(req.body)
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
            res.send({message: errroMessage.coursefetcherror})
        }
    }
}

const getWatchKeysApi = async (req, res) => {
    try{
        const result = await getWatchGetFromQuickbucket(req.body)
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
            res.send({message: errroMessage.watchKeyerror})
        }
    }
}

const getWatchGetFromQuickbucket = async (c_c) => {
    try{
        try {
            var userdetails = await verifyJwtToken(c_c.jwt);
            // console.log(userdetails)
            // console.log(c_c.course_content)
            if(userdetails){
                await mongoose.connect(connectionUriSecret);
                const cour = await Course.findById(c_c._id).select('course_content')
                if(cour){
                    var payload = {
                        "userid" : quickBucketService.userid,
                        "password" : quickBucketService.password,
                        "fileNames" : { }
                    }
                    const available_module = Object.keys(cour.course_content);
                    if(c_c.keys){
                        c_c.keys.forEach(e => {
                            if(available_module.includes(e)){
                                payload.fileNames[e] = c_c._id+'_module'+e.charAt[1]+'_video'
                            }
                        })
                    }

                    const rawResponse = await fetch(quickBucketService.watchKeyUrl, {
                        method: 'POST',
                        headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    const content = await rawResponse.json();
                    content.course_content = cour.course_content
                    return content;
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


const getAllCourseApi = async (req, res) => {
    try{
        const result = await getAllCourse(req.body)
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
            res.send({message: errroMessage.coursefetcherror})
        }
    }
}


const getAllCourse = async (c_c) => {
    try{
        try {
            var userdetails = await verifyJwtToken(c_c.jwt);
            // console.log(userdetails)
            // console.log(c_c.course_content)
            if(userdetails){
                await mongoose.connect(connectionUriSecret);
                const cour = await Course.find({}).select('course_name description')
                return cour;


            }
        }
        catch (error) {
            // console.log("===",error);
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


const getCourseContent = async (c_c) => {
    try{
        try {
            var userdetails = await verifyJwtToken(c_c.jwt);
            // console.log(userdetails)
            // console.log(c_c.course_content)
            if(userdetails){
                await mongoose.connect(connectionUriSecret);
                var usr = await User.find({email: userdetails.email});
                if(usr != null){
                    const cour = await Course.find({_id: c_c.course_details._id})
                    const created_by_usr = await User.find({_id: cour[0].created_by});
                    console.log(cour[0], created_by_usr[0].full_name)
                    var ccourse = cour[0];
                    ccourse.created_by = created_by_usr[0].full_name;
                    return ccourse;
                }

            }
        }
        catch (error) {
            // console.log("===",error);
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
            // console.log("===",error);
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


module.exports = { createCourseApi, courseContentApi, getCourseContentApi, getWatchKeysApi, getAllCourseApi }