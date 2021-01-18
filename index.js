/* Your Code Here */
let createEmployeeRecord = function(empData) {
    //Loads Array elements into corresponding Object properties. Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.
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
    //Converts each nested Array into an employee record using createEmployeeRecord and accumulates it to a new Array
    return empsData.map(createEmployeeRecord)
}

let createTimeInEvent = function(dateAndTime) {
    /*Add an Object with keys:
        type: Set to "TimeIn"
        hour: Derived from the argument
        date: Derived from the argument
    */
    const [date, hour] = dateAndTime.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    
    return this 
}

let createTimeOutEvent = function(dateAndTime) {
    /*Add an Object with keys:
        type: Set to "TimeOut"
        hour: Derived from the argument
        date: Derived from the argument 
    */
    const [date, hour] = dateAndTime.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })

    return this
}

let hoursWorkedOnDate = function(targetDate) {
    //Given a date, find the number of hours elapsed between that date's timeInEvent and timeOutEvent
    const timeIn = this.timeInEvents.find(rec => rec.date === targetDate)
    const timeOut = this.timeOutEvents.find(rec => rec.date === targetDate)

    return (timeOut.hour - timeIn.hour) / 100
}

let wagesEarnedOnDate = function(targetDate){
    //Using hoursWorkedOnDate, multiply the hours by the record's payRate to determine amount owed. Amount should be returned as a number.
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
} 

let findEmployeeByFirstName = function(emps, testName) {
    //Test the firstName field for a match with the firstName argument
    return emps.find(emp => emp.firstName === testName)
}

let calculatePayroll = function(empsRecords) {
    //Using wagesEarnedOnDate, accumulate the value of all dates worked by the employee in the record used as context. Amount should be returned as a number.
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