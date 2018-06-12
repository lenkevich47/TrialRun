var chosenSkill = 'None';


function changeSkill(skill) {
	chosenSkill = skill;
	var employeesCheckboxes = document.getElementById("employees-checkboxes");

	while (employeesCheckboxes.hasChildNodes()) {
        employeesCheckboxes.removeChild(employeesCheckboxes.lastChild);
    }

    $.ajax({
	    url: "http://localhost:3000/employees?skill=" + skill,
	    success: function(employees) {
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
	});
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
	
	if (chosenCheckboxes.length === 0) {
		errorDiv.appendChild(document.createTextNode('Please, select a member.'))

		return;
	}
	
	var table = document.createElement('table');

	// создаём хедер таблицы
	var skillRow = table.insertRow();
	var skillTd = skillRow.insertCell();
	skillTd.colSpan = 2;
	skillTd.appendChild(document.createTextNode(chosenSkill));

	$.ajax({
		type: "POST",
  		data: {
  			employees: chosenCheckboxes,
  			skill: chosenSkill
  		},
	    url: "http://localhost:3000/employeesWithStatus",
	    success: function(response) {
	    	if (response.hasOwnProperty('error')) {
				errorDiv.appendChild(document.createTextNode(response.error));
				return; 		
	    	} 

			// заполняем таблицу
			for (var i = 0; i < response.length; i++) {
				var employee = response[i];

				var row = table.insertRow();
				var tdMember = row.insertCell();
		        tdMember.appendChild(document.createTextNode(employee.name + ' ' + employee.surname));
		        var tdStatus = row.insertCell();

		        if (employee.status === 'available') {
		        	tdStatus.appendChild(document.createTextNode('Available'));
		        	tdStatus.className = 'available';
		        } else {
		        	tdStatus.appendChild(document.createTextNode('Not Available'));
		        	tdStatus.className = 'not-available';
		        }  
		   	}

			employeeTable.appendChild(table);
	    }
	});
}
