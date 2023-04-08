function createEmployeeRecord(employeeData) {
    let employeeRecord = {
      firstName: employeeData[0],
      familyName: employeeData[1],
      title: employeeData[2],
      payPerHour: employeeData[3],
      timeInEvents: [],
      timeOutEvents: []
    }
    return employeeRecord;
  }
  
  function createEmployeeRecords(arrayOfArrays) {
    let arrayOfEmployeeRecords = arrayOfArrays.map(array => createEmployeeRecord(array));
    return arrayOfEmployeeRecords;
  }
  
  function createTimeInEvent(dateString) {
    let dateParts = dateString.split(" ");
    let timeInEvent = {
      type: "TimeIn",
      date: dateParts[0],
      hour: parseInt(dateParts[1])
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }
  
  function createTimeOutEvent(dateString) {
    let dateParts = dateString.split(" ");
    let timeOutEvent = {
      type: "TimeOut",
      date: dateParts[0],
      hour: parseInt(dateParts[1])
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvents = employeeRecord.timeInEvents;
    const timeOutEvents = employeeRecord.timeOutEvents;
  
    if (!Array.isArray(timeInEvents) || timeInEvents.length === 0 || !Array.isArray(timeOutEvents) || timeOutEvents.length === 0) {
      return 0;
    }
  
    const timeInEvent = timeInEvents.find(event => event.date === date);
    const timeOutEvent = timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    }
  
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  function calculatePayroll(employeeRecords) {
    const totalWages = employeeRecords.reduce((total, employeeRecord) => {
      const allWages = allWagesFor.call(employeeRecord);
      return total + allWages;
    }, 0);
    return totalWages;
  }
  
  
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;
  
    return wagesEarned;
  }
  
  const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date
    })
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
  
    return payable
  }
  