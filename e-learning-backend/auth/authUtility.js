const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { salt_value, jwtSignatureSecret, defaultExpire } = require('../utility/utility');
const { errroMessage } = require('../responseMessage/messageProvider');

async function encryptPassword(password) {
  try {
    const salt = salt_value;
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error('Encryption failed'); // Handle error if bcrypt hash fails
  }
}

async function verifyPassword(encpassword, password) {
    try {
      return await bcrypt.compare(password, encpassword);
    } catch (error) {
        throw new Error("Some error in comparing password"); 
    }
  }



const generateJwtToken = async (payload) => {
  try {
    const expiresIn = defaultExpire;
    const token = await jwt.sign(payload, jwtSignatureSecret, { expiresIn } );
    return token;
  } catch (error) {
    console.log(error)
    throw new Error(errroMessage.jwterror);
  }
};

const verifyJwtToken = async (token) => {
  try {
    var result = await jwt.verify(token, jwtSignatureSecret);
    return result;
  }
  catch (error) {
    throw error;
  }
}


module.exports = { encryptPassword, generateJwtToken, verifyPassword, verifyJwtToken }
