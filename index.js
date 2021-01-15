/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(array) {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

function createEmployeeRecords(array) {
    return array.map(emp => createEmployeeRecord(emp))
}

let createTimeInEvent = function(time) {
    let timeArr = time.split(" ")
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeArr[1]),
        date: timeArr[0]
    })
    return this
}

let createTimeOutEvent = function(time) {
    let timeArr = time.split(" ")
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeArr[1]),
        date: timeArr[0]
    })
    return this
}

let hoursWorkedOnDate = function(date) {
    let inTime = this.timeInEvents.find(workIn => workIn.date === date).hour / 100
    let outTime = this.timeOutEvents.find(workOut => workOut.date === date).hour / 100
    return outTime - inTime
}

let wagesEarnedOnDate = function (date) {
    const hrs = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hrs
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

let findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(emp => emp.firstName === firstName)
}

let calculatePayroll = function(employees) {
    let wageArr = employees.map(emp => allWagesFor.call(emp));
    return wageArr.reduce((total, wage)=> total + wage)
}