const bcrypt = require('bcrypt');
const userDbModel = require('../models/user.js');
const userModel = new userDbModel();

class userController {

    async registerPage(req, res){
        res.render('register');
    }

    async register(req, res) {
        try {

            const { username, email, password } = req.body;

            const existingUser = await userModel.findByUsername(username);
            if (existingUser) {
                return res.status(409).render('register', {
                    error: "Username already exists.",
                    username,
                    email
                });
            }

            const existingEmail = await userModel.findByEmail(email);
            if (existingEmail) {
                return res.status(409).render('register', {
                    error: "Email already exists.",
                    username,
                    email
                });
            }

            if (!password || password.length < 6) {
                return res.status(400).render('register', {
                    error: "Password must be at least 6 characters long.",
                    username,
                    email
                });
            }

            const cryptPassword = await bcrypt.hash(password, 10);

            const registeredId = await userModel.create({
                username,
                email,
                password_hash: cryptPassword
            });

            const userData = await userModel.findByUsernameWithRole(username);

            req.session.user = {
                id: userData.id,
                username: userData.username,
                role: userData.role
            };


            return res.redirect('/');

        } catch (err) {
            console.error(err);
            return res.status(500).render('register', {
                error: "Internal server error."
            });
        }
    }
   
    async login(req, res) {
        try {
            const { username, password } = req.body;

            const existingUser = await userModel.findByUsernameWithRole(username);

            if (!existingUser) {
                return res.status(401).json({
                    error: "Invalid username or password."
                });
            }

            const passwordMatch = await bcrypt.compare(
                password,
                existingUser.password_hash
            );

            if (!passwordMatch) {
                return res.status(401).json({
                    error: "Invalid username or password."
                });
            }

            req.session.user = {
                id: existingUser.id,
                username: existingUser.username,
                role: existingUser.role
            };

            return res.json({
                success: true,
                username: existingUser.username,
                role: existingUser.role
            });

        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: "Something went wrong."
            });
        }
    }

    async logout(req, res) {
        req.session.destroy(err => {
            if (err) {
                console.error(err);
                return res.redirect('/');
            }

            res.clearCookie('connect.sid');
            return res.redirect('/');
        });
    }

}



module.exports = userController