const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const bcrypt = require('bcrypt')
const { validateJWT } = require('../../../lib/jwt')

const bcryptSalt = 8

// Makes sure user doc has a userName property
// Forces userName to be lower case
async function formatUser(user) {

    let rtnValue = null

    // Check for userName property
    if (!user.hasOwnProperty("userName")) {

        throw new Error("No userName Property")

    } else {

        // Copy user object
        rtnValue = { ...user }

        // Forces userName to be lower case
        rtnValue.userName = rtnValue.userName.toLowerCase()

        // Encrypt password
        if (user.hasOwnProperty('password')) {

            try {
                rtnValue.password = await bcrypt.hash(user.password,bcryptSalt)
                console.log('PASSWORD', user.password)
            }
            catch(err) {
                console.log('BCRYPT', err.message)
                throw err
            }
        }
    }

    return rtnValue
}

/* GET users listing. */
router.get('/', function (req, res, next) {

    let info = {
        query: {},
        collection: req.app.locals.collectionUsers
    }

    db.readAll(info)
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            res.status(500).send('Unable to Get Document',err.message)
        })

});

// localhost:3000/api/v1/users/Jo
router.get('/:userName', function (req, res, next) {


    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()
        
        const info = {
            query: {
                fName: userName
            },
            collection: req.app.locals.collectionUsers
        }

        db.readOne(info)
            .then(user => {
                res.json(user)
            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    } else {
        res.status(400).send('User Name not Found')
    }

})

// Insert a new document
router.post('/', validateJWT, function (req, res, next) {
 
        formatUser(req.body)
        .then(user => {
        
            // Handle user object
        console.log('USER', user)

        const info = {
            doc: user,
            collection: req.app.locals.collectionUsers
        }

        db.readOne({
            query: { userName: user.userName },
            collection: req.app.locals.collectionUsers

        })
            .then(foundUser => {

                if (foundUser !== null) {
                    throw new Error(`User ${user.userName} Already Exists`)
                }

                return db.createOne(info)

            })
            .then(resDoc => {

                //ops is an array of all inserted documents
                // http://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#~insertOneWriteOpCallback
                
                if (resDoc.insertedCount === 1) {
                    res.json(resDoc.ops[0])
                }

            })
            .catch(err => {
                res.status(500).send(err.message)
            })
    }, err => {

        console.log(err.message)
        res.status(400).send(err.message)

    })
})

router.put('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

    const info = {
        query: {
            userName: userName
        },
        doc: req.body,
        collection: req.app.locals.collectionUsers
    }

    db.replaceOne(info)
        .then(response => {

            if (response.value === null) {
                // Replacement failed so create
                return db.createOne(info)
            }
            res.json(response)
        })
        .catch(err => {
            res.statuss(500).send('Failed to Replace', err.message)
        })

    } else {

        res.status(400).send('Username is undefined')

    }

})

router.patch('/:userName', function (req, res, next) {

    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

        let user = req.body

        const info = {
        query: {
            userName: userName
        },
        doc: user,
        collection: req.app.locals.collectionUsers
    }

    db.changeOne(info)

        .then(response => {

            if (response.ok !== 1) {
                // Update Failed
                throw new Error(`Username ${req.params.userName} Not Found`)
            }

            return db.readOneById({
                id: response.value._id,
                collection: req.app.locals.collectionUsers
            })

        })
        .then( resDoc => {

            res.json(resDoc)

        })
        .catch(err => {
            res.statuss(500).send('Failed to Update', err.message)
        })

    } else {

        res.status(400).send('Username is defined')

    }
})// End of patch

router.delete('/:userName', function (req, res, next) {
    
    if (req.params.userName !== undefined) {

        const userName = req.params.userName.toLowerCase()

    const info = {
        query: {
            userName: userName
        },
        collection: req.app.locals.collectionUsers
    }

    db.deleteOne(info)
        .then(response => {
            if (response.deleteCount === 1) {
                res.json({})
            } else {
                // to do, develop a proper error handler
                res.json(req.params.userName)
            }
            res.json(user)
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
} else {
    res.status(400).send('Username is Undefined')
}
})

module.exports = router;
