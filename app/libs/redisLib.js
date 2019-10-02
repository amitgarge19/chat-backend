//redis lib

const check = require('./checkLib.js');
const redis = require('redis');

let client = redis.createClient({
    port: 10750,
    host: 'redis-10750.c14.us-east-1-2.ec2.cloud.redislabs.com',
    password: 'jTHKbchdrr4zxxGIdcL8RbJjlJdoBMws'
});

client.on('connect', () => {
    console.log("redis connection successfully opened");
})

let getAllUsersInAHash = (hashName, callback) => {
    
    client.HGETALL(hashName, (err, result) => {

        if (err) {

            console.log(err);
            callback(err, null);

        } else if (check.isEmpty(result)) {
            
            console.log("online user list is empty");
            console.log(result);

        } else {
            
            console.log(result);
            callback(null, result);

        }
    });
} //end of get all users in a hash

//function to set a new online user
let setANewOnlineUserInHash = (hashName, key, value, callback) => {

    client.HMSET(hashName, [key, value], (err, result) => {

        if (err) {
            console.log(err);
            callback(err, null)

        } else {
            
            console.log("user has been set in the hash map");
            console.log(result);
            callback(null, result);

        }
    });
}// end set a new online user in hash

let deleteUserFromHash = (hashName, key) => {

    client.HDEL(hashName, key);
    return true;
    
} //end delete user from hash

module.exports = {
    getAllUsersInAHash: getAllUsersInAHash,
    setANewOnlineUserInHash: setANewOnlineUserInHash,
    deleteUserFromHash: deleteUserFromHash
}