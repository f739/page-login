const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const User = require("./modules/newUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const URL = "mongodb+srv://shimki:208028506@cluster0.krp7g.mongodb.net/users?retryWrites=true&w=majority"
mongoose.connect(URL, { useUnifiedTopology: true , useCreateIndex: true, useNewUrlParser: true})

app.use(cors());
app.use(bodyParser.json());
app.use(
    express.urlencoded({
        extended: true
    })
);


app.post("/newUser", (req, res) => {
    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    })
    newuser.save(err => {
        if (err) {
            return res.status(400).json({
                title: "error",
                error: "email is use!"
            })
        }
        return res.status(200).json({
            title: "signup succses"
        })
    })

});

app.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).json({
            title: "server error",
            error: err
        })
        if (!user) {
            return res.status(401).json({
                title: "user not found",
                error: "invalid"
            })
        }
        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401).json({
                title: "login fuild",
                error: "password not found"
            })
        }
        let token = jwt.sign({ userId: user._id }, "ninga");
        return res.status(200).json({
            title: "success",
            token: token
        })
    })
})

app.get("/user", (req, res) => {
    let token = req.headers.token;
    jwt.verify(token, "ninga", (err, decoded) => {
        if (err) return res.status(401).json({
            title: "authorization"
        })
        User.findOne({ _id: decoded.userId }, (err, user) => {
            if (err) return console.log(err);
            return res.status(200).json({
                title: "user grabbed",
                user: {
                    name: user.name,
                    email: user.email
                }
            })
        })
    })
})

app.listen(port, () => {
    console.log(`runing on port ${port}`);
})
