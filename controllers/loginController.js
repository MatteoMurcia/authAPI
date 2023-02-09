const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const User = require("../models/users");
const jwt = require('jsonwebtoken');

const usersDbPath = path.join(__dirname, "../db/users.json");

const readJsonFile = (path) => {
    const data = fs.readFileSync(path, "utf-8");
    const dataParsed = JSON.parse(data);
    return dataParsed;
};

const getUser = async (user) => {
    let userToLogin = User.findByField('user', user);
    return userToLogin
};

const controller = {
    register : function(req,res){
        const users = readJsonFile(usersDbPath);
        const passHasheada = bcrypt.hashSync(req.body.password, 10)

        let user = {
            id: (users.length)>0 ? users[users.length - 1].id + 1 : 1,
            user:req.body.user,
            password: passHasheada,
            status:false 
        }
        users.push(user)
        newUsers = JSON.stringify(users)
        fs.writeFileSync(usersDbPath, newUsers)
        res.sendStatus(201)
    },
    login:async function(req,res){
        const users = readJsonFile(usersDbPath);
        const { username, password } = req.body;

        try {
            let user = await getUser(username);
        
            if (!user) {
              return res.status(400).json({ status: 'failure', message: 'Invalid username or password' });
            }
            if(user.status==true){
                return res.status(400).json({ status: 'failure', message: 'User already logged in'});
            }
        
            const passwordMatch = await bcrypt.compare(password, user.password);
        
            if (!passwordMatch) {
              return res.status(400).json({ status: 'failure', message: 'Invalid username or password' });
            }
        
            const token = jwt.sign({ username: user.username }, 'secret-key', { expiresIn: '1h' });
            user.status = true;
            users[user.id-1]=user;
            newUsers = JSON.stringify(users)
            fs.writeFileSync(usersDbPath, newUsers)
        
            return res.status(200).json({ status: 'success', token });
          } catch (err) {
            return res.status(500).json({ status: 'failure', message: 'Server error:'+ err });
        }
    },
    logout:async function(req,res){
        const users = readJsonFile(usersDbPath);
        const username= req.body.username;

        try{
            let user = await getUser(username);

            if (!user) {
                return res.status(400).json({ status: 'failure', message: 'Invalid username or password' });
              }

            user.status = false;
            users[user.id-1]=user;
            newUsers = JSON.stringify(users)
            fs.writeFileSync(usersDbPath, newUsers)
        
            return res.status(200).json({ status: 'success'});
        }
        catch (err) {
            return res.status(500).json({ status: 'failure', message: 'Server error:'+ err });
        }
    }
};

module.exports = controller;