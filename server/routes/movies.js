const Router = require('express-promise-router');
const db = require('../db/index')

const router = new Router()
// export our router to be mounted by the parent application
module.exports = router
router.get('/', async (req, res) => {
    if (req.query.search) {
        try {
            await db.query(`SELECT * FROM movies WHERE title LIKE \'%${req.query.search}%\'`, null, (err, result) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                res.json(result.rows)
            })
        } catch (err) {
            console.log(err)
            throw err
        }
    } else {
        try {
            const row = await db.query('SELECT * FROM movies', null, (err, resu) => {
                if (err) {
                    console.log(err)
                    throw err
                }
                //console.log(resu.rows);

                res.json(resu.rows)
            });

            //console.log(rows instanceof Promise)
            //res.status(200).send(rows)
        } catch (err) {
            console.log("Catch" + err)
            throw err
        }
    }
})

router.get('/:id', async (req, res) => {
    try {
        await db.query(`SELECT * FROM movies WHERE movie_id=$1`, [req.params.id], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }

            res.json(result.rows)
        })
    } catch (err) {
        console.log(err)
        throw err
    }
})