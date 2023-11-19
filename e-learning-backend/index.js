const express = require("express");
const cors = require("cors");
const { hostinfo, corsUrl } = require("./utility/utility");
const { createUserApi, loginUserApi } = require("./user/UserController");

const app = express();

var corsOptions = {
  origin: corsUrl
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/backend/test/", (req, res) => {res.json({ message: "Welcome to e-learning backend service" });});

app.post("/backend/api/v1/signUp/", createUserApi );

app.post("/backend/api/v1/LogIn/", loginUserApi );



app.listen(hostinfo.PORT, () => {
  console.log(`Server is running on port ${hostinfo.PORT}.`);
});