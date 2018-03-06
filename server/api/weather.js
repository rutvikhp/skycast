const router = require('express').Router()
const axios = require('axios')
module.exports = router


router.post('/time', (req, res, next) => {
  const {lat, lng, time} = req.body
  axios.get(`https://api.darksky.net/forecast/25e4021dfb827f3cc7815767002baa91/${lat},${lng},${time}`)
  .then(res => res.data)
  .then(results => {
    res.json(results)
  })
})

router.post('/', (req, res, next) => {
  const {lat, lng} = req.body
  axios.get(`https://api.darksky.net/forecast/25e4021dfb827f3cc7815767002baa91/${lat},${lng}`)
  .then(res => res.data)
  .then(results => {
    res.json(results)
  })
})
