/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee
}

function createEmployeeRecords(array) {
    return array.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let event = {
        type: "TimeIn",
        date: date,
        hour: parseInt(hour)
    };
    this.timeInEvents.push(event);
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    let event = {
        type: "TimeOut",
        date: date,
        hour: parseInt(hour)
    };
    this.timeOutEvents.push(event);
    return this;
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date).hour;
    let timeOut = this.timeOutEvents.find(e => e.date === date).hour;
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(date) {
    return (this.payPerHour * hoursWorkedOnDate.call(this, date));
}

function findEmployeeByFirstName(array, name) {
    return array.find(e => e.firstName === name)
}

function calculatePayroll(array) {
    return array.reduce((a, b) => a + allWagesFor.call(b), 0)
}