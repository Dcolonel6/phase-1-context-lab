/* Your Code Here */
const createEmployeeRecord = function(list){
    const [firstName, familyName, title, payperHour] = list

    return {
        'timeInEvents':[],
        'timeOutEvents':[],
        'firstName': firstName,
        'title': title,
        'payPerHour': payperHour,
        'familyName': familyName
    }

}
const createEmployeeRecords = function(employeesDetails){
    const employeeRecords = []
    for(const employeeList of employeesDetails){
        employeeRecords.push(createEmployeeRecord(employeeList))
    }
    return employeeRecords

}
const createTimeInEvent = function (dateStamp){
    const [yearStr,monthStr,dayStr,timeStr] = dateStamp.split((/\s|-/))
    const timeObject = {
        'type': 'TimeIn',
        'hour': parseInt(timeStr,10),
        'date':`${yearStr}-${monthStr}-${dayStr}` 
    }
    this['timeInEvents'].push(timeObject)
    return this
}
function createTimeOutEvent(dateStamp){
    const [yearStr,monthStr,dayStr,timeStr] = dateStamp.split((/\s|-/))
    const timeObject = {
        'type': 'TimeOut',
        'hour': parseInt(timeStr,10),
        'date':`${yearStr}-${monthStr}-${dayStr}` 
    }
    this['timeOutEvents'].push(timeObject)
    return this
}
function hoursWorkedOnDate(dateWithoutTime){
    const {timeInEvents, timeOutEvents } = this
    const timeIn = timeInEvents.find(({date}) => date === dateWithoutTime)
    const timeOut = timeOutEvents.find(({date}) => date === dateWithoutTime)      
     
    return (parseInt(timeOut['hour']) - parseInt(timeIn['hour'])) / 100
}
function wagesEarnedOnDate(dateStr){
    const hoursWorked = hoursWorkedOnDate.call(this,dateStr)
    return hoursWorked * this['payPerHour']

}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray,firstName){
    return srcArray.find(employee => employee['firstName'] === firstName)
}

function calculatePayroll(employeeRecords){
    let sumOfPay = 0
    for(const employeeRecord of employeeRecords){
        sumOfPay += allWagesFor.call(employeeRecord)
    }
    return sumOfPay

}