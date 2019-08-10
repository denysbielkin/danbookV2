const mongodb = require('mongodb').MongoClient;
const dbName = 'danbookV2';
const usersCollectionName = 'users';


module.exports = {
    mongodb,
    dbName,
    usersCollectionName
};
