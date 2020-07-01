const Router = require('express-promise-router');
const db = require('../db/index')

const router = new Router()
// export our router to be mounted by the parent application
module.exports = router

router.post('/', async (req, res, next) => {
    if (req.body.first_name && req.body.last_name && req.body.password && req.body.email)
        postRegister(req, res, next, req.body.first_name, req.body.last_name, req.body.password, req.body.email);
    else
        res.json({status: 400})
})

function postRegister(request, response, next, first_name, last_name, password, email) {
    db.query('INSERT INTO users (first_name, last_name, password, email) VALUES ($1, $2, $3, $4)',
     [first_name, last_name, password, email], 
     (err, res) => {
         if (err) {
             console.log(err)
            response.send({status: 500});
         }
        else
            response.send("POST " + {status: 200})
     })
}

router.delete('/', async (req, res, next) => {
    if (req.body.email)
        deleteRegister(req, res, next, req.body.email);
    else
        res.json({status: 400})
})

function deleteRegister(request, response, next, email) {
    db.query('DELETE FROM users WHERE email=$1',
     [email], 
     (err, res) => {
         if (err) {
             console.log(err)
            response.send({status: 500});
         }
        else
            response.send("Delete " + {status: 200})
     })
}