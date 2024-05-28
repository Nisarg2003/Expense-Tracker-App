import express from 'express';
import { loginController, registerController } from '../controllers/userController.js';
import { addTransaction, deleteTransaction, editTransaction, getAllTransaction } from '../controllers/transactionController.js';

const router = express.Router();

//routers
// POST || LOGIN
router.post('/login',loginController)

// POST || Register
router.post('/register',registerController)

// POST || Transaction
router.post('/transactions/addtransaction',addTransaction)

// POST || EditTransaction
router.post('/transactions/edittransaction',editTransaction)

// POST || DeleteTransaction
router.post('/transactions/deletetransaction',deleteTransaction)

//GET || Transaction
router.post('/transactions/gettransactions',getAllTransaction)
export default router;