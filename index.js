/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(values) {
    let record = {
        firstName: values[0],
        familyName: values[1],
        title: values[2],
        payPerHour: values[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords (records) {
    return records.map(createEmployeeRecord)
}

function createTimeInEvent(date) {
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    this.timeInEvents.push(timeIn)
    return this
}

function createTimeOutEvent(date) {
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(date.split(' ')[1]),
        date: date.split(' ')[0]
    }
    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(event => event['date'] === date)
    let timeOut = this.timeOutEvents.find(event => event['date'] === date)
    if (timeIn && timeOut) {
        let hoursWorked = (timeOut['hour'] - timeIn['hour']) / 100
        return hoursWorked
    } else {
        return 0
    }
}

function wagesEarnedOnDate(date) {
    let pay = (hoursWorkedOnDate.call(this, date) * this.payPerHour)
    return pay
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    let result = srcArray.find(emp => emp.firstName === firstName)
    return result
}

function calculatePayroll(records) {
    let total = records.reduce(function(base, emp){return base + allWagesFor.call(emp)}, 0)
    return total
}