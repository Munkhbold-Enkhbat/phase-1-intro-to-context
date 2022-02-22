// Your code here
function createEmployeeRecord([fName, lName, title, rate]) {
  return {
    firstName: fName,
    familyName: lName,
    title: title,
    payPerHour: rate,
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arr) {
  let employeeRecords = []
  arr.forEach(item => employeeRecords.push(createEmployeeRecord(item)))
  return employeeRecords
}

function createTimeInEvent(employee, time) {
  
  class TimeIn {
    constructor(date, hour) {
      this.date = date
      this.hour = Number(hour)
    }
  }

  const dateAndTime = time.split(' ')
  let inDate = dateAndTime[0]
  let inHour = dateAndTime[1]

  const inEvent = new TimeIn(inDate, inHour)

  employee.timeInEvents.push(inEvent)
  return employee
}

function createTimeOutEvent(employee, time) {
  
  class TimeOut {
    constructor(date, hour) {
      this.date = date
      this.hour = Number(hour)
    }
  }

  const dateAndTime = time.split(' ')
  let outDate = dateAndTime[0]
  let outHour = dateAndTime[1]

  const outEvent = new TimeOut(outDate, outHour)

  employee.timeOutEvents.push(outEvent)
  return employee
}

function hoursWorkedOnDate(employee, time) {
  let inDates = employee.timeInEvents
  let outDates = employee.timeOutEvents
  let inTime = 0
  let outTime = 0
  for(let day of inDates) {
    if(day.date === time) {
      inTime = day.hour
    }
  }
  for(let day of outDates) {
    if(day.date === time) {
      outTime = day.hour
    }
  }
  return (outTime - inTime) / 100
}

function wagesEarnedOnDate(employee, time) {
  let hoursWorked = hoursWorkedOnDate(employee, time)
  return employee.payPerHour * hoursWorked
}

function allWagesFor(employee) {
  return employee.timeInEvents.reduce((total, day) => {
    return total += wagesEarnedOnDate(employee, day.date)
  }, 0)
}