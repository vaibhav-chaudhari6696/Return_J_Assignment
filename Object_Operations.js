/*
   Here spread operator is used to merge properties from both objects
*/

function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
}

function mergeCars(car1, car2) {
  return { ...car1, ...car2 };
}

// Example car objects for testing
var car1 = new Car("Toyota", "Camry");
var car2 = { year: 2023 };

var mergedCar = mergeCars(car1, car2);
console.log(mergedCar);
//Output:{ brand: 'Toyota', model: 'Camry', year: 2023 }
