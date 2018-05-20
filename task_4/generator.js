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

var chosenSkill = '';


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
	var chosenCheckboxes = []
	var checkboxes = employeesCheckboxes.querySelectorAll("input[type=checkbox]:checked");

	while (employeeTable.hasChildNodes()) {
        employeeTable.removeChild(employeeTable.lastChild);
    }

	for (var i = 0; i < checkboxes.length; i++) {
  		chosenCheckboxes.push(checkboxes[i].value)
	}
	
	var table = document.createElement('table');
	var skillRow = table.insertRow();
	var skillTd = skillRow.insertCell();
	skillTd.colSpan = 2;
	skillTd.appendChild(document.createTextNode(chosenSkill));

	for (var i = 0; i < chosenCheckboxes.length; i++) {
		var employee = employees.find(function( obj ) {
  			return obj.id == chosenCheckboxes[i];
		});
		console.log(employee);
		var row = table.insertRow();
		var tdMember = row.insertCell();
        tdMember.appendChild(document.createTextNode(employee.name + ' ' + employee.surname));
        var tdStatus = row.insertCell();

        if (employee.surname.indexOf('a') > -1) {
        	tdStatus.appendChild(document.createTextNode('Available'));
        } else {
        	tdStatus.appendChild(document.createTextNode('Not Available'));
        }
        
      ;
	}
	employeeTable.appendChild(table);
}
