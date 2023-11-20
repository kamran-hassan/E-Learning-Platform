const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { keyGeneratorKey, jwtSignatureSecret } = require('./authKeys');


function AuthApiUpKey(req, res){
    try {
        var x = req.body;
        
        if(x.userid == keyGeneratorKey.userid){
            verifyPassword(keyGeneratorKey.password, x.password).then((r) => {
                if(r){
                    const promises = Object.keys(x.fileNames).map(element =>
                        getAccessKey({ key: x.fileNames[element], type: "upload" })
                      );
                      
                      Promise.all(promises)
                        .then(keys => {
                          const AccessKey = {};
                          keys.forEach((key, index) => {
                            const element = Object.keys(x.fileNames)[index];
                            AccessKey[element] = key;
                          });
                          res.send(AccessKey);
                          console.log('All keys generated Success ');
                        })
                        .catch(error => {
                          console.error('Error generating keys:', error);
                          res.status(400);
                          res.send();
                        });
                }
                else {
                    res.status(400);
                    res.send();
                }
            })
        }
        else{
            res.status(400);
            res.send();
        }
    }
    catch(error){
        res.status(400);
        res.send();
    }
}

function AuthApiWaKey(req, res){
    try {
        var x = req.body;
        if(x.userid == keyGeneratorKey.userid){
            verifyPassword(keyGeneratorKey.password, x.password).then((r) => {
                if(r){
                    const promises = Object.keys(x.fileNames).map(element =>
                        getAccessKey({ key: x.fileNames[element], type: "watch" })
                      );
                      
                      Promise.all(promises)
                        .then(keys => {
                          const AccessKey = {};
                          keys.forEach((key, index) => {
                            const element = Object.keys(x.fileNames)[index];
                            AccessKey[element] = key;
                          });
                          res.send(AccessKey);
                          console.log('All keys generated Success ');
                        })
                        .catch(error => {
                          console.error('Error generating keys:', error);
                          res.status(400);
                          res.send();
                        });
                }
                else {
                    res.status(400);
                    res.send();
                }
            })
        }
        else{
            res.status(400);
            res.send();
        }
    }
    catch(error){
        res.status(400);
        res.send();
    }
}

async function verifyPassword(encpassword, password) {
      try {
        return await bcrypt.compare(password, encpassword);
      } catch (error) {
          throw new Error("Some error in comparing password"); 
      }
    }
  

  
  const getAccessKey = async (payload) => {
    try {
      const expiresIn = '2h';
      const token = await jwt.sign(payload, jwtSignatureSecret, { expiresIn } );
      return token;
    } catch (error) {
      console.log(error)
      throw new Error("Some Error");
    }
  };

  const verifyJwt = async (token) => {
    try {
        decoded = await jwt.verify(token, jwtSignatureSecret)
        return decoded;
      } catch (error) {
        console.log(error)
        throw new Error("Some Error");
      }
  }

  const upAuthenticateHeaderToken = (req, res, next) => {
    // console.log(req.headers)
    var token = req.headers.authorization;
    // console.log(token)
    if (token == null) {
      return res.sendStatus(401); // Unauthorized if token is missing
    } else {
        token = token.split(' ')[1]
    }
  
    jwt.verify(token, jwtSignatureSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      if (user.type == 'upload'){
        req.user = user;
        next(); // Proceed to the next middleware
      } else {
        return res.sendStatus(403); // wrong token  
      }
    });
  };

  const waAuthenticateHeaderToken = (req, res, next) => {
    var token = req.query.token;

    console.log(token)
    if (token == null) {
      return res.sendStatus(401); // Unauthorized if token is missing
    }
  
    jwt.verify(token, jwtSignatureSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      if (user.type == 'watch'){
        req.user = user;
        next(); // Proceed to the next middleware
      } else {
        return res.sendStatus(403); // wrong token  
      }
    });
  };

  

module.exports = { AuthApiUpKey, AuthApiWaKey, verifyJwt, upAuthenticateHeaderToken, waAuthenticateHeaderToken }