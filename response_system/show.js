const fs = require("node:fs")

fs.readFile("./historical-disasters.csv", function(err, data){
    if(err){
        throw err
    }
    
    const res = csvToArray(data.toString())
    const cleaned = res.map(d=>({
        startDate: getDate(d['Start Day'], d['Start Month'], d['Start Year']),
        endDate: getDate(d['End Day'], d['End Month'], d['End Year']),
        totalDeath: d['Total Deaths'],
        injured: d['No. Injured'],
        homeless: d['No. Homeless'],
        magintude: d["Magnitude"],
        magnitudeScale: d["Magnitude Scale"],
        coordinate: {
            lng: d["Longitude"],
            lat: d["Latitude"]
        },
        disasterType: d["Disaster Type"],
        country: d["Country"],
        region: d["Region"]
    }))
    const filtered = cleaned.filter(f=>f.startDate && f.endDate && f.magintude !== "No" && f.magnitudeScale !== "No")
    console.log({filtered})
})

function getDate(day, month, year){
    if(!day || !month || !year)return
     const date = new Date()
     date.setDate(parseInt(day))
     date.setMonth(parseInt(month))
     date.setFullYear(parseInt(year))
     if(date instanceof Date && !isNaN(date))return date.getTime()

}

function csvToArray(csvContent, delimiter = ',') {
    const lines = csvContent.split('\n');
    const headers = lines[0].split(delimiter);
    // console.log({headers})
    const result = lines.slice(1).map(line => {
        const values = line.split(delimiter);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header.trim()] = values[index] ? values[index].trim() : '';
        });
        return obj;
    });

    return result;
}