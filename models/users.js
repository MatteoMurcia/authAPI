const fs = require("fs");
const path = require("path");
const { send } = require("process");
const { stringify } = require("querystring");

const DbPath = path.join(__dirname, "../db/users.json");



const User = {
    DbPath: path.join(__dirname, "../db/users.json"),

    readJsonFile: function () {

        return JSON.parse(fs.readFileSync(this.DbPath, "utf-8"));

    },

    findAll: function () {
        return this.readJsonFile();
    },


    findByField: function (field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text)
        return userFound;
    }
}
module.exports = User;