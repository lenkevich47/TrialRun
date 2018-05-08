var person = {
 name: 'Olya',
 surname: 'Lenkevich',
 age: 23};

var finalObject = {};

for(var property in person) {
 finalObject[person[property]] = property;
}

console.log(finalObject);
