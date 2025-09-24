const { queryPredictionModel } = require('../helpers/get_prediction')
const firebaseService = require('../services/firebase.service')

class Report{
    constructor(){
        
    }

    createReport(obj){
        return firebaseService.createOne(obj)
    }

    getReports(){

    }

    

}