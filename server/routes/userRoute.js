const userController = require('../controllers/userControl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const router = require('express').Router();

router.post('/register',userController.register)
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.get('/refresh_token',userController.refreshtoken)
router.get('/infor',auth,userController.getUser)
router.patch('/addcart',auth,userController.addToCart)
router.patch('/remove_cart',auth,userController.removeCart)
router.get('/viewusers',auth,authAdmin,userController.viewUser);
router.delete('/delete/:id',userController.deleteUser);
router.patch('/order',auth,userController.addOrder);
router.get('/vieworder/:id',auth,authAdmin,userController.viewOrder)
router.put('/updatestatus/:id',auth,authAdmin,userController.updateStatus)
module.exports = router;