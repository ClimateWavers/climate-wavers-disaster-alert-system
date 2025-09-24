const config = require("../config/config");
const axios = require("axios");
const { isEndpointOk } = require("../utils/factory");

class AnalysisModel{
    constructor(baseUrl=config.aiModels.analysis){
        this.baseUrl = baseUrl
    }
    
    async isRunning(){
        const url = this.baseUrl + "/status"
        return await isEndpointOk(url)
    }

    async getInference(coordinate, startDate= Date.now() - (2 * 24 * 60 * 60 * 1000), endDate=Date.now()){
        const url = this.baseUrl + "/inference"
        const startDateObj = new Date(startDate)
        const endDateObj = new Date(endDate)
        const res = await axios.post(url, {
            location: coordinate, 
            startDate: `${startDateObj.getDay()}-${startDateObj.getMonth()}-${startDateObj.getFullYear()}`,
            endDate: `${endDateObj.getDay()}-${endDateObj.getMonth()}-${endDateObj.getFullYear()}`
        })
        return res.data
    }
}

module.exports = Object.freeze(new AnalysisModel())