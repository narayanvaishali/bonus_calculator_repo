export function bonusCalculator(target, noOfShift, grossProfit, done) {
  if (!target || target === 0) {
    done("Invalid target", 0);
    return;
  }

  if (!noOfShift || noOfShift === 0 || noOfShift < 0) {
    done("Invalid no. of shifts", 0);
    return;
  }

  if (!grossProfit || grossProfit === 0 || grossProfit < 0) {
    done("Invalid gross profit", 0);
    return;
  }

  var Y = (parseFloat(noOfShift) * parseFloat(target)) / 20;
  var A = (parseFloat(Y) * 1) / 100;
  var B = ((parseFloat(grossProfit) - parseFloat(Y)) * 3) / 100;

  /*console.log('Y');
  console.log(Y);
  console.log('A');
  console.log(A);
  console.log('B');
  console.log(B);*/

  const bonus = parseFloat(A) + parseFloat(B);
  done(bonus < 0 ? 'No Bonus' : "", bonus > 0 ? parseFloat(bonus).toFixed(2) : 0 );
}
