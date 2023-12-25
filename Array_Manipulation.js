/* 
    Given solution is based on consideration that input array is unsorted and
    input arr[n] have values in any range not restricted to range 0 to n-1

    Here two solutions possible because, 
    1) function findUniqueElementsSpaceOpt have Time Complexity O(n^2), Space complexity O(1) so it is better in terms of space complexity
    
    Second function with solution is optimized version of first in terms of Time complexity but it uses space O(n) as Map is used to keep track unique elements
    
    2)  function findUniqueElementsTimeOpt have Time Complexity O(n) , Space complexity O(n) so it is better in terms of time complexity

    Both approach gives required result
*/

// First Approach
function findUniqueElementsSpaceOpt(arr) {
  var uniqueArray = [];

  for (var i = 0; i < arr.length; i++) {
    var isUnique = true;

    for (var j = 0; j < uniqueArray.length; j++) {
      if (arr[i] === uniqueArray[j]) {
        isUnique = false;
        break;
      }
    }

    if (isUnique) {
      uniqueArray.push(arr[i]);
    }
  }

  return uniqueArray;
}

// Optimize approach with O(n) time complexity
function findUniqueElementsTimeOpt(arr) {
  var uniqueMap = {};
  var uniqueArray = [];

  for (var i = 0; i < arr.length; i++) {
    var currentElement = arr[i];

    // Check if the element is already in the map
    if (!uniqueMap[currentElement]) {
      uniqueMap[currentElement] = true;
      uniqueArray.push(currentElement);
    }
  }

  return uniqueArray;
}

// Here testing function with example
var inputArray = [1, 9, 3, 9, 8, 1];

// Run for function findUniqueElementsSpaceOpt
var resultArray = findUniqueElementsSpaceOpt(inputArray);
console.log("Array of unique elements: ", resultArray);

// Run for optimize function findUniqueElementsTimeOpt
var resultArray = findUniqueElementsTimeOpt(inputArray);
console.log("Array of unique elements: ", resultArray);

// Output in both cases is [ 1, 9, 3, 8 ]
