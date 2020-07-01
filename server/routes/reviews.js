const Router = require('express-promise-router');
const db = require('../db/index')

const router = new Router()
// export our router to be mounted by the parent application
module.exports = router
router.get('/:id', async (req, res) => {
    try {
        await db.query(`SELECT * FROM reviews WHERE movie_id=$1`, [req.params.id], (err, result) => {
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

router.post('/', async (req, res, next) => {
    if (req.body.movie_id && req.body.review_text && req.body.review_title && req.body.reviewer_id)
        postReview(req, res, next, req.body.movie_id, req.body.review_text, req.body.review_title, req.body.reviewer_id, req.body.stars, req.body.imbid);
    else
        res.json({status: 400})
})

function postReview(request, response, next, movie_id, review_text, review_title, reviewer_id, stars = null, imbid = null) {
    db.query('INSERT INTO reviews (last_updated, movie_id, review_text, review_title, reviewer_id, stars, imdbid) VALUES (current_timestamp, $1, $2, $3, $4, $5, $6)',
     [movie_id, review_text, review_title, reviewer_id, stars, imbid], 
     (err, res) => {
         if (err) {
             console.log(err)
            response.send({status: 500});
         }
        else
            response.send({status: 200})
     })
}