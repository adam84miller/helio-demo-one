const jwt = require('jsonwebtoken')
require('dotenv').config()

/************************************************************************************************************
 *                                          JWT wrapper functions
 * *********************************************************************************************************/

function signP(payload, options) {

    return new Promise((resolve, reject) => {

        jwt.sign(payload, process.env.JWT_KEY, options, (err, token) => {

            if (err !== null) {
                reject(err)
            } else {
                resolve(token)
            }
        })

    })
}

function verifyP(token, options) {

    return new Promise((resolve, reject) => {

        jwt.verify(token, process.env.JWT_KEY, options, (err, payload) => {

            if (err !== null) {
                 reject(err)
            } else {
                resolve(payload)
            }
        })
    })
}

/************************************************************************************************************
 *                                            Helper functions
 * *********************************************************************************************************/
function validateJWT(req, res, next) {

    // Get value for authorization header
    const auth = req.get('authorization')
    
    // Check to see if we have authorization header
    if (auth !== undefined) {

    // Split the header into "bearer" and the token
    // At the space
    let [, token] = auth.split(' ')

    verifyP(token) 
    .then(payload => {

        req.jwtpayload = payload
        next()

    })
    .catch(err => {
        res.status(400).send(`Error at validateJWT ${ err.message }`)
    })

    } else {
        res.status(400).send('No Authorization Header')
    }
}

module.exports.signP = signP
module.exports.verifyP = verifyP
module.exports.validateJWT = validateJWT
