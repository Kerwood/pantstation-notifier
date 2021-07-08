require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')
const Push = require('pushover-notifications')
const url = process.env.URL
const state = { status: '' }

const pushover = new Push({
  user: process.env.PUSHOVER_USER_KEY,
  token: process.env.PUSHOVER_APP_TOKEN
})

// Send Pushover notification
const processStatus = (status) => {
  if (state.status !== status) {
    pushover.send({ title: 'Pant Station', message: status })
    state.status = status
    console.log(new Date() + ' :: State has changed, sending notification.')
    console.log(new Date() + ' :: ' + status)
  }
}

// Get status text from website.
const getStatus = () => {
  return axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data)
      return $('.container .row .col-12.col-md-4.pr-5 span').text()
    })
}

// Get and send status on first run.
getStatus()
  .then(status => processStatus(status))
  .catch(err => console.error(err.message))

// Get status and send it if its different than the existing status.
setInterval(() => {
  getStatus()
    .then(status => processStatus(status))
    .catch(err => console.error(err.message))
}, 300000)
