/* Your Code Here */
let createEmployeeRecord = function(empData) {
    return {
        firstName: empData[0],
        familyName: empData[1],
        title: empData[2],
        payPerHour: empData[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(empsData) {
    return empsData.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateAndTime) {
    const [date, hour] = dateAndTime.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    
    return this 
}

let createTimeOutEvent = function(dateAndTime) {
    const [date, hour] = dateAndTime.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })

    return this
}

let hoursWorkedOnDate = function(targetDate) {
    const timeIn = this.timeInEvents.find(rec => rec.date === targetDate)
    const timeOut = this.timeOutEvents.find(rec => rec.date === targetDate)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(targetDate){
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
} 

let findEmployeeByFirstName = function(emps, testName) {
    return emps.find(emp => emp.firstName === testName)
}

let calculatePayroll = function(empsRecords) {
    return empsRecords.reduce(function(memo, rec) {
        return memo + allWagesFor.call(rec)
    }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}