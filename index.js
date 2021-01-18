/* Your Code Here */
let createEmployeeRecord = function(array) {
    let empRecord = []
    return empRecord = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
let createEmployeeRecords = function(arrays) {
    return arrays.map(createEmployeeRecord)
}
let createTimeInEvent = function(dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1])
    this.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: hour
    })
    return this
}
let createTimeOutEvent = function(dateStamp) {
    let date = dateStamp.split(" ")[0];
    let hour = parseInt(dateStamp.split(" ")[1])
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: date,
        hour: hour
    })
    return this
}
let hoursWorkedOnDate = function(date) {
    let inEvent = this.timeInEvents.find(event => event.date === date);
    let outEvent = this.timeOutEvents.find(event => event.date === date);
    return (outEvent.hour - inEvent.hour) / 100
}
let wagesEarnedOnDate = function(date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour
    return wage
}
let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)
    return payable
}
let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(emp) { return emp.firstName === firstName })
}
let calculatePayroll = function(array) {
    return array.reduce((total, emp) => total + allWagesFor.call(emp), 0)
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */
