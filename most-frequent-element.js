var elements = ['cube', 'ball', 'triangle', 10, 10, 'triangle', 7, 'cube', 10];
var maxRepeats = 0;
var mostFrequentElement;

for (var i = 0; i < elements.length; i++) {
	var iteratedElement = elements[i];
	var elementRepeats = 0;

	for (var j = 0; j < elements.length; j++) {
		if (iteratedElement === elements[j]) {
			elementRepeats++;
		}
	}
	
	if (elementRepeats > maxRepeats) {
		maxRepeats = elementRepeats;
		mostFrequentElement = iteratedElement;
	}
}
console.log(maxRepeats)
console.log(mostFrequentElement)
