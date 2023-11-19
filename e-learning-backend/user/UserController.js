const mongoose = require("mongoose");
const User = require("./User");
const { connectionUriSecret } = require("../db/dbKeys");
const { errroMessage, successMessage } = require("../responseMessage/messageProvider");
const { encryptPassword, generateJwtToken, verifyPassword } = require("../auth/authUtility");

const createUserApi = (req, res) => {
        createUser(req.body).then((r) => {
            res.status(200);
            res.send({message: r[0], jwt: r[1]});
        }).catch((e) => {
            res.status(400);
            res.send({message: e.message});
        })  
}

const loginUserApi = (req, res) => {
    loginUser(req.body).then((r) => {
        res.status(200);
        res.send({message: r[0], jwt: r[1]});
    }).catch((e) => {
        res.status(400);
        res.send({message: e.message});
    })
    
}

const loginUser = async(u) => {
    try {
        var exist = await isExist(u.email);
        if(exist){
            await mongoose.connect(connectionUriSecret);
            var result = await User.find({email: u.email});  //  already checked if user exist or not
            var user = result[0];
            let checkPassword = await verifyPassword(user.password, u.password);
            if(checkPassword){
                let payload = {full_name: user.full_name, dateofbirth: user.dateofbirth, email: user.email};
                let jwt = await generateJwtToken(payload);
                return [successMessage.LogIn, jwt];
            }
            else{
                throw new Error(errroMessage.wrongpassword);
            }
            mongoose.connection.close();
        }
        else{
            throw new Error(errroMessage.userNotExist);
        }
    }
    catch(error) {
        const messageexists = Object.values(errroMessage).some(errorMessage => errorMessage.includes(error.message));
        if(messageexists){  // for known errors 
            throw error;
        }
        else{
            throw new Error(errroMessage.unknownError)  // for all unknow errors, we can log using a logger for analysys. but for user a genral message should be sent.
        }
    }

}

const createUser = async(u) => {
    try{
        var exist = await isExist(u.email);
        if(!exist){
            u.password = await encryptPassword(u.password);
            let newuser = User(u);
            await mongoose.connect(connectionUriSecret);
            let res = await newuser.save();
            mongoose.connection.close();
            if(res == newuser){
                let payload = {full_name: res.full_name, dateofbirth: res.dateofbirth, email: res.email}
                let jwt = await generateJwtToken(payload);
                return [successMessage.userCreated, jwt];
            }
            else{
                throw new Error(errroMessage.whilesave)
            }
        }
        else{
            throw new Error(errroMessage.userAlreadyExist);
        }
    }
    catch(error){
        const messageexists = Object.values(errroMessage).some(errorMessage => errorMessage.includes(error.message));
        if(messageexists){  // for known errors 
            throw error;
        }
        else{
            throw new Error(errroMessage.unknownError)  // for all unknow errors, we can log using a logger for analysys. but for user a genral message should be sent.
        }
    }
}

const isExist = async(email) => {
    try{
        await mongoose.connect(connectionUriSecret);
        result = await User.find({email: email});
        mongoose.connection.close();
        if(result.length == 0){
            return false;
        }
        else{
            return true;
        }
    }
    catch(error){

    }
}


module.exports = { createUserApi, loginUserApi }

