/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(employeeArray){
    const employeeRecord =  { 
       firstName: employeeArray[0],
       familyName: employeeArray[1],
       title: employeeArray[2],
       payPerHour: employeeArray[3],
       timeInEvents: [],
        timeOutEvents: []
    }
    return employeeRecord
}
let createTimeInEvent = function (dateStamp1){
    let number = dateStamp1.split(" ")[1]
     let timeInEvent = {
         type: "TimeIn",
         hour: parseInt(number),
         date: dateStamp1.split(" ")[0]

     }
     this.timeInEvents.push(timeInEvent)
     return this
 }

function createEmployeeRecords(arrayOfArrays){
    const employeeRecordsArray = arrayOfArrays.map(function(arrayOfInfo){
        return createEmployeeRecord(arrayOfInfo)
    })
    return employeeRecordsArray
}
let createTimeOutEvent = function(dateStamp){
    let number = dateStamp.split(" ")[1]
     let timeOutEvent = {
         type: "TimeOut",
         hour: parseInt(number),
         date: dateStamp.split(" ")[0]

     }
     this.timeOutEvents.push(timeOutEvent)
     return this
 }





 let hoursWorkedOnDate = function (dateObject){
    let foundTimeInRecord = this.timeInEvents.find(element => element.date === dateObject)
    let foundTimeOutRecord = this.timeOutEvents.find(element => element.date === dateObject)
   let  hoursWorked = (foundTimeOutRecord.hour - foundTimeInRecord.hour)/100
    return hoursWorked
 }

 function wagesEarnedOnDate(dateObject){
    let hours =  hoursWorkedOnDate.call(this, dateObject)
    let payrate = this.payPerHour
    return payrate * hours
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

function findEmployeeByFirstName(srcArray, firstName){
    let foundEmployee = srcArray.find(element => element.firstName === firstName)
    return foundEmployee
}

function calculatePayroll(employeeRecordsArray){
    let arrayOfPayPerEmp = employeeRecordsArray.map(function(employee){
       return allWagesFor.call(employee)
    })
    let totalPay = arrayOfPayPerEmp.reduce(function (accumulator, current) {
       return accumulator + current;
   })
   return totalPay
}