var employees = [{
	id: 1,
	name: 'Alena',
	surname: 'Padsekina',
	skill: 'QA'
}, {
    id: 2,
	name: 'Anton',
	surname: 'Menshutkin',
	skill: 'QA'
}, {
    id: 3,
	name: 'Dima',
	surname: 'Penda',
	skill: 'Dev'
}, {
    id: 4,
	name: 'Sergey',
	surname: 'Bondar',
	skill: 'Dev'
}, {
    id: 5,
	name: 'Olga',
	surname: 'Karelkina',
	skill: 'Automation'
}, {
    id: 6,
	name: 'Ivan',
	surname: 'Kotovich',
	skill: 'Automation'
}];

var appRouter = function(app) {
	app.get("/employees", function(req, res) {
		var chosenEmployees = [];
		var skill = req.query.skill;

		for (var i = 0; i < employees.length; i++) {
			if (skill === employees[i].skill) {
				chosenEmployees.push(employees[i]);
			}
		}

    	res.send(chosenEmployees);
	});

	app.post("/employeesWithStatus", function(req, res) {
		var chosenEmployees = [];
		var requestedEmployees = req.body.employees;
		var chosenSkill = req.body.skill;
		var validationError = '';

		for (var i = 0; i < requestedEmployees.length; i++) {
			var employee = employees.find(function( obj ) {
	  			return obj.id == requestedEmployees[i];
			});

			if (!employee) {
				validationError = 'No data found';
			}

			if (employee.skill !== chosenSkill) {
				validationError = "Specified team member doesn't exist in the selected team.";
			}

	        if (employee.surname.indexOf('a') > -1) {
	        	employee.status = 'available';
	        } else {
	        	employee.status = 'not-available';
	        }

	        chosenEmployees.push(employee);
	   	}

	   	if (validationError) {
	   		res.send({ error: validationError });
	   	} else {
	   		res.send(chosenEmployees);
	   	}
	});
}

module.exports = appRouter;


