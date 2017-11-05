var employeeDb = require("../database/employees.json");

var getEmployees = (callback)=>{
    setTimeout(()=>{
        callback(null, employeeDb);
    }, 500);
};

var getEmployee = (employeeId, callback)=>{
    getEmployees((err, data)=>{
        if (err) {
            return callback(err);
        }
        var result = data.find((item)=>{
            return item.id === employeeId;
        });
        callback(null, result);
    });
};

exports.getEmployees = getEmployees;
exports.getEmployee = getEmployee;
