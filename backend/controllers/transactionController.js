import moment from "moment"
import transactionModel from "../models/transactionModel.js"

export const getAllTransaction = async(req,res) => {
    try {
        const {frequency,selectedDates,type,category} = req.body
        const transactions = await transactionModel.find({
           
           ...(frequency != 'all' &&  
             (frequency !== 'custom' ? {
            date:{
                $gt : moment().subtract(Number(frequency),'d').toDate(),
            },
        }
        : {
        date:{
            $gte:selectedDates[0],
            $lte:selectedDates[1]
        },
    } 
    )),
           
            
            userid:req.body.userid,

            ...(type != 'all' && {type}),  

            ...(category != 'all' && {category})
        })
        res.status(200).json(transactions)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const addTransaction = async(req,res) => {
    try {
        const {amount,category,refrence,description,date,type,userid} = req.body
        const newTransaction = await new transactionModel({
            amount,
            category,
            refrence,
            description,
            date,
            type,
            userid
        }).save()
        res.status(201).send({ 
            success: true,
            message: "Transaction Created",
            newTransaction,
        })
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const editTransaction = async(req,res) => {
    try {
        await transactionModel.findOneAndUpdate({_id:req.body.ObjectId},req.body.payload)
        res.status(200).send('Edit Successfully')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const deleteTransaction = async(req,res) => {
    try {
        await transactionModel.findOneAndDelete({_id:req.body.transactionId})
        res.status(200).send('Transaction Deleted')
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}