const { Router } = require('express')
const {getDisasters, createDisaster, getDisaster} = require('../controllers/disaster.controller')
const router = Router()

router.get('/', getDisasters)
router.post('/', createDisaster)
router.get('/:id', getDisaster)

module.exports = router