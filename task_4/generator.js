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

var chosenSkill = 'None';


function changeSkill(skill) {
	chosenSkill = skill;
	var employeesCheckboxes = document.getElementById("employees-checkboxes");

	while (employeesCheckboxes.hasChildNodes()) {
        employeesCheckboxes.removeChild(employeesCheckboxes.lastChild);
    }

	for (var i = 0; i < employees.length; i++) {
		if (skill === employees[i].skill) {
			var input = document.createElement("input");
            input.type = "checkbox";
            input.name = employees[i].name + ' ' + employees[i].surname;
            input.value = employees[i].id;

            employeesCheckboxes.appendChild(input);
            employeesCheckboxes.appendChild(document.createTextNode(employees[i].name + ' ' + employees[i].surname));
		
			employeesCheckboxes.appendChild(document.createElement("br"));
		}
	}
}

function generateTable() {
	var employeeTable = document.getElementById("generated-table");
	var employeesCheckboxes = document.getElementById("employees-checkboxes");
	var errorDiv = document.getElementById("error");
	var chosenCheckboxes = []
	var checkboxes = employeesCheckboxes.querySelectorAll("input[type=checkbox]:checked");
	var validationError;

	while (employeeTable.hasChildNodes()) {
        employeeTable.removeChild(employeeTable.lastChild);
    }
    while (errorDiv.hasChildNodes()) {
        errorDiv.removeChild(errorDiv.lastChild);
    }

    // сохраняем id выбранных пользователей в chosenCheckboxes
	for (var i = 0; i < checkboxes.length; i++) {
  		chosenCheckboxes.push(checkboxes[i].value)
	}

	if (chosenSkill === "None") {
		errorDiv.appendChild(document.createTextNode('Please, select a team.'))

		return;
	}
	
	var table = document.createElement('table');

	// создаём хедер таблицы
	var skillRow = table.insertRow();
	var skillTd = skillRow.insertCell();
	skillTd.colSpan = 2;
	skillTd.appendChild(document.createTextNode(chosenSkill));

	// заполняем таблицу
	for (var i = 0; i < chosenCheckboxes.length; i++) {
		var employee = employees.find(function( obj ) {
  			return obj.id == chosenCheckboxes[i];
		});

		if (!employee) {
			validationError = 'No data found';
		}

		if (employee.skill !== chosenSkill) {
			validationError = "Specified team member doesn't exist in the selected team.";
		}

		var row = table.insertRow();
		var tdMember = row.insertCell();
        tdMember.appendChild(document.createTextNode(employee.name + ' ' + employee.surname));
        var tdStatus = row.insertCell();

        if (employee.surname.indexOf('a') > -1) {
        	tdStatus.appendChild(document.createTextNode('Available'));
        	tdStatus.className = 'available';
        } else {
        	tdStatus.appendChild(document.createTextNode('Not Available'));
        	tdStatus.className = 'not-available';
        }
        
   	}

   	if (validationError) {
		errorDiv.appendChild(document.createTextNode(validationError))
   	} else {
		employeeTable.appendChild(table);
	}
}
