const express = require("express")

const router = express.Router()
const web = require("./web/html-routers")
const api = require("./api/api-routers")

router.use(web)
router.use(api)

module.exports = router