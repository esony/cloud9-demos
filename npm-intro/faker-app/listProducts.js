// =================================
// IMPORTS
// =================================
var faker = require("faker");

// =================================
// VARIABLES
// =================================

// var randomName = faker.name.findName();
// var randomEmail = faker.internet.email();
// var randomCard = faker.helpers.createCard();

// console.log(randomName);
// console.log(randomEmail);
// console.log(randomCard);

// for (var i = 1; i <= 50; i++){
//     console.log("[" + i + "] " + faker.commerce.productName() + " - $" + faker.commerce.price());
// }

// for (var i = 1; i <= 50; i++){
//     console.log("[" + i + "] " + faker.internet.ip());
// }

for (var i = 1; i <= 10; i++){
    console.log("[" + i + "] " + faker.hacker.phrase());
}