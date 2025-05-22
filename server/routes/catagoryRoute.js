const catagoryControl = require('../controllers/catagoryControl');
const router = require('express').Router()
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.route('/catagory')
.get(catagoryControl.getCatagory)
.post(auth,authAdmin,catagoryControl.createCatagory)

router.route('/catagory/:id')
.delete(auth,authAdmin,catagoryControl.deleteCatagory)
.put(auth,authAdmin,catagoryControl.updateCatagory)


module.exports = router