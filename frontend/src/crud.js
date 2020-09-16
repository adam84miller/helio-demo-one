// This storage file handles the api calls to our backend
// Functions require an api endpoint and document/data

//Create a record
const createOne = (endpoint, token, doc) => {

    console.log(doc)
    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(doc)
    })
        .then(httpResponse => {
            if (!httpResponse.ok) {
                throw new Error(`Error with POST at ${ endpoint }`)
            }

            return httpResponse.json()
        })
        .catch(err => {
            throw err
        })
}

// Get all
const getAll = (endpoint) => {

    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(`Error with GET at ${ endpoint }`)
            }

            return httpResponse.json()

        })
        .catch(err => {
            throw err
        })

}

// Get one
const getOne = () => {

}

// Patch One
const patchOne = (endpoint, doc) => {

    return fetch(endpoint, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'apllication/json'
        },
        body: JSON.stringify(doc)
    })
    .then(httpResponse => {

        if( !httpResponse.ok ) {
            throw new Error(`Error with PATCH at ${ endpoint }`)
        }

        return httpResponse.json()
    })
    .catch(err => {
        throw err
    })
}



// Update one
const updateOne = (endpoint, doc) => {

    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'apllication/json'
        },
        body: JSON.stringify(doc)
    })
    .then(httpResponse => {

        if( !httpResponse.ok ) {
            throw new Error(`Error with POST at ${ endpoint }`)
        }

        return httpResponse.json()
    })
    .catch(err => {
        throw err
    })
}

// Delete one
const deleteOne = (endpoint) => {

    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(httpResponse => {

            if (!httpResponse.ok) {
                throw new Error(`Error with DELETE at ${ endpoint }`)
            }

            return httpResponse.json()

        })
        .catch(err => {
            throw err
        })

}

export { createOne, getAll, getOne, patchOne, updateOne, deleteOne }