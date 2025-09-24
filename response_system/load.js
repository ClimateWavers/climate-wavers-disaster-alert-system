const csv = require('csvtojson')
const filePath = "./historical-disasters.csv"
const disasterService = require("./services/disaster.service")

const {cleanUndefined} = require("./utils/cleanups")

csv()
.fromFile(filePath)
.then(async(data)=>{
    const cleaned = data.map(d=>disasterService.createDisaster(cleanUndefined({
        startDate: getDate(d['Start Day'], d['Start Month'], d['Start Year']),
        endDate: getDate(d['End Day'], d['End Month'], d['End Year']),
        totalDeath: d['Total Deaths'],
        injured: d.No[' Injured'],
        homeless: d.No[' Homeless'],
        magintude: d["Magnitude"],
        magnitudeScale: d["Magnitude Scale"],
        coordinate: {
            lng: d["Longitude"],
            lat: d["Latitude"]
        },
        disasterType: d["Disaster Type"],
        country: d["Country"],
        region: d["Region"]
    })))

    await Promise.all(cleaned)
    console.log("operation completed...")
    
})


function getDate(day, month, year){
    if(!day || !month || !year)return
     const date = new Date()
     date.setDate(parseInt(day))
     date.setMonth(parseInt(month))
     date.setFullYear(parseInt(year))
     if(date instanceof Date && !isNaN(date))return date.getTime()

}