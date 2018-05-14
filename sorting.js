var birds = [{
	name: 'parrot',
	age: 7
}, {
	name: 'swan',
	age: 5
}, {
	name: 'parakeet',
	age: 1
}, {
	name: 'owl',
	age: 2
}
];

birds.sort(function(a, b) {
	return a.age - b.age; 
});
console.log(birds);
