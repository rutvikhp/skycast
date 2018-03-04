const router = require('express').Router()
const axios = require('axios')
module.exports = router

router.post('/', (req, res, next) => {
  const {lat, lng} = req.body
  axios.get(`https://api.darksky.net/forecast/25e4021dfb827f3cc7815767002baa91/${lat},${lng}`)
  .then(res => res.data)
  .then(results => {
    res.json(results)
  })
})
