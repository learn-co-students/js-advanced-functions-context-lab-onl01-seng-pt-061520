/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(row) {
	return {
		firstName: row[0],
		familyName: row[1],
		title: row[2],
		payPerHour: row[3],
		timeInEvents: [],
		timeOutEvents: []
	};
}

function createEmployeeRecords(rows) {
	return rows.map(function(row) {
		return createEmployeeRecord(row);
	});
}

function createTimeInEvent(datetime) {
	let [date, time] = datetime.split(" ");

	this.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(time, 10),
		date: date
	});

	return this;
}

function createTimeOutEvent(datetime) {
	let [date, time] = datetime.split(" ");

	this.timeOutEvents.push({
		type: "TimeOut",
		hour: parseInt(time, 10),
		date: date
	});

	return this;
}

function hoursWorkedOnDate(date) {
	let inTime = this.timeInEvents.find(function(event) {
		return event.date === date;
	}).hour;
	let outTime = this.timeOutEvents.find(function(event) {
		return event.date === date;
	}).hour;

	return (outTime - inTime) / 100;
}

function wagesEarnedOnDate(date) {
	return hoursWorkedOnDate.call(this, date) * this.payPerHour;
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

function findEmployeeByFirstName(records, firstName) {
	return records.find(function(record) {
		return record.firstName === firstName;
	});
}

function calculatePayroll(records) {
	return records.reduce(function(memo, record) {
		return memo + allWagesFor.call(record);
	}, 0);
}