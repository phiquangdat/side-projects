//Calculate the Mean and Mode
function calculateMean(numbers) {
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
}
function calculateMode(numbers) {
    const frequency = {};
    let maxFreq = 0;
    let modes = [];

    // Count the frequency of each number
    numbers.forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (frequency[num] > maxFreq) {
            maxFreq = frequency[num];
        }
    });

    // Find the modes (numbers with the highest frequency)
    for (let num in frequency) {
        if (frequency[num] === maxFreq) {
            modes.push(Number(num));
        }
    }

    return modes.pop();
}

function statsFinder(array) {
  // Write your code here
  return [calculateMean(array), calculateMode(array)];
}

console.log(statsFinder([500, 400, 400, 375, 300, 350, 325, 300]))

// Leave this so we can test your code:
module.exports = statsFinder;
