const md5 = require ('js-md5');
const uuidV4 = require('uuid/v4');

const endPoints = require ('../endPoints');
const dbConstants = require ('../dbConstants');

const saveNewUser = (req,res) => {
    const params = req.body;

    const userId =  md5(uuidV4());

    const {firstName, lastName, password, middleName, email, gender, age, photo} = params;

    const newUserInfo = {
       firstName: firstName.content,
       lastName: lastName.content,
        password: password.content,
       middleName: middleName.content,
       email: email.content,
       gender: gender.content,
       age: age.content,
       photo: photo.content,
        friendList: [],
        userId,
   };

    dbConstants.mongodb.connect(endPoints.db, (err,db) => {
        const appDb = db.db(dbConstants.dbName);
        const usersCollection = appDb.collection (dbConstants.usersCollectionName);
        let responseData = {};
        usersCollection.insertOne(newUserInfo, (err,result) => {
            // try {
            //     if (err) {
            //         throw new Error(`Error is somewhere in adding new user:  ${err}`);
            //     }
            // } catch (err) {
            //     console.log(err);
            // }

            responseData = {
                resultType: 'success',
                message: `Account has been created successfully! Congrats!`

            };
            console.log(responseData);
            res.send(200, responseData);
        });
    })

};
