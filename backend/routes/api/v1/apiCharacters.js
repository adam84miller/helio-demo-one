const express = require('express');
const router = express.Router();
const db = require('../../../database/mongo');
const app = require('../../../app');
const { response } = require('../../../app')

/* GET characters listing. */
router.get('/', function(req, res, next) {

    let info = {
        query: {},
        collection: app.locals.collectionCharacters
    }

    db.readAll(info)
    .then(characters => {
        res.json(users)
    })
    .catch(err => {
        console.log(err)
    })

});

// localhost:3000/api/v1/users/Jo
router.get('/:userName', function(req, res, next) {
    let info = {
        query: {
            fName: req.params.charName
        },
        collection: req.app.locals.collectionCharacters
    }

    db.readOne(info)
    .then(characters => {
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
})

// Insert a new document
router.post('/', function (req, res, next) {

    const info = {
        body: req.body,
        collection: req.app.locals.collectionCharacters
    }

    db.createOne(doc)
    .then((user) => {
        res.json(user)
    })
})

router.delete;
'/:userName', 
function(req, res, next) {

    let info = {
        query: {
            fName: req.params.userName
        },
        collection: req.app.locals.collectionCharacters
    }

    db.deleteOne(info)
    .then(response => {
        if (response.deleteCount ===1) {
            res.json({})
        }else {
            // to do, develop a proper error handler
            res.json(req.params.userName)
        }
        res.json(user)
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = router;

