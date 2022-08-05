const e = require("express");
var UserModel = require("../models/user.model")
var categoryModel = require("../models/category.model")
var transactionModel = require("../models/transactions.model");
const { findById } = require("../models/user.model");

const getme = async (req, res) => {
    console.log(req)

    let data = await UserModel.findById(req.body.user_id)
    console.log(data)
    if (!data) {
        res.json({
            "message": "No User Found",
            "status": "failed",
        }).status(400)
    }
    else {
        res.json({
            "message": "User Found",
            "status": "Success",
            "data": data,
        }).status(200)
    }

}

const addUser = async (req, res) => {

    let exist = await UserModel.findOne({ email: req.body.email })
    console.log(exist);
    if (!exist) {
        var neUser = new UserModel(req.body)
        var data = await neUser.save()

        if (!data) {
            res.json({
                "message": "Cannot Create",
                "status": "error",
            }).status(400)
        }
        else {
            // console.log(data)
            res.json({

                "message": "User Added",
                "status": "success",
                "data": data
            }).status(200)
        }
    }
    else {
        res.json({
            "message": "user already exists",
            "status": "error"

        }).status(400)
    }


}

const getHomeScreen = async (req, res) => {
    let body = req.params.user_id
    let transactions = await transactionModel.find({ user_id: body })
    var totalIncome = 0;
    var totalExpense = 0;
    const allTransactions = []
    const monthlyTransactions = [];
    transactions.sort(function(a,b){
        return b.transaction_date-a.transaction_date
    })

    if (transactions) {
        for (let index = 0; index < transactions.length; index++) {
            const element = transactions[index];
            const categorydata = await categoryModel.findById(element.category_id)
            if (categorydata.category_type == 'Income') {
                totalIncome = totalIncome + parseInt(element.transaction_amount)
            }
            else if (categorydata.category_type == 'Expence') {
                totalExpense = totalExpense + parseInt(element.transaction_amount)
            }
            allTransactions.push({
                "category": categorydata,
                "id": element.id,
                "transaction_name": element.transaction_name,
                "transaction_amount": element.transaction_amount,
                "transaction_date": element.transaction_date,
                "transaction_note": element.transaction_note,
            })
            var month = element.transaction_date.getMonth() + 1
            var year = element.transaction_date.getFullYear()
            var isExists = false
            var foundedIndex = 0;
            for (let index = 0; index < monthlyTransactions.length; index++) {
                const element = monthlyTransactions[index];
                if (element['month'] == month && element['year'] == year) {
                    isExists = true;
                    foundedIndex = index;
                    break;
                }

            }
            if (isExists) {
                monthlyTransactions[foundedIndex]['transactions'].push({
                    "category": categorydata,
                    "id": element.id,
                    "transaction_name": element.transaction_name,
                    "transaction_amount": element.transaction_amount,
                    "transaction_date": element.transaction_date,
                    "transaction_note": element.transaction_note,
                })
            }
            else {
                monthlyTransactions.push({
                    "month": month,
                    "year": year,
                    'transactions': [{
                        "category": categorydata,
                        "id": element.id,
                        "transaction_name": element.transaction_name,
                        "transaction_amount": element.transaction_amount,
                        "transaction_date": element.transaction_date,
                        "transaction_note": element.transaction_note,
                    }]
                })
            }
        }

        res.json({
            "message": "success",
            "data": {
                "total_income": totalIncome, "totalExpense": totalExpense,
                "all_transactions": allTransactions,
                'month_wise_transactions':monthlyTransactions
            }
        }).status(200)
    }
    else {
        res.json({
            "message": "error",

        }).status(400)
    }

}


module.exports = {
    getme: getme,
    addUser: addUser,
    getHomeScreen: getHomeScreen,
    addCategory: async (req, res) => {
        var body = req.body
        try {
            var category = new categoryModel(body)
            var data = await category.save()
            if (data) {
                res.json({
                    "message": "succeess",
                    "data": data
                }).status(200)
            }
            else {
                res.json({
                    "message": "error",

                }).status(400)
            }

        } catch (error) {

        }
    },
    addTransaction: async (req, res) => {
        var body = req.body
        var newTransaction = new transactionModel(body)
        try {
            let data = await newTransaction.save()
            if (!data) {
                res.json({
                    "message": "error"
                }).status(400)
            }
            else {
                res.json({
                    "message": "success",
                    "data": data
                }).status(200)
            }

        } catch (error) {

        }
    },
    deleteTransaction: async (req, res) => {
        console.log(req)
        let body = req.params.id
        console.log(body)
        var data = await transactionModel.findByIdAndDelete(body)
        if (!data) {
            res.json({
                "message": "error"
            }).status(400)
        }
        else {
            res.json({
                "message": "deleted",

            }).status(200)
        }
    },
    jsonIf: (obj) => {
        if (typeof obj == "object")
            return obj;
        else {
            return JSON.parse(obj);
        }
    },
}