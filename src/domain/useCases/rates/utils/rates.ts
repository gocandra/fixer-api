export function calculateCrossCurrencyRates(from: number, to: number) {
  return (1/from)*to
}

export function calculateFee(fee: number, totalValue: number) {
  if(fee < 100 && fee >= 0 && totalValue > 0) return (fee/100) * totalValue
  else throw `fee should be a number in range (0 and 100]`
} 

