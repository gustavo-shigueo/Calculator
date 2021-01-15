const operators = document.querySelectorAll('.operator')
const backspace = document.querySelector('.backspace')
const negative = document.querySelector('.negative')
const numbers = document.querySelectorAll('.num')
const output = document.querySelector('.value')
const clear = document.querySelector('.clear')
const equal = document.querySelector('.equals')
const point = document.querySelector('.point')

const handleOperatorBtn = e => {
  const [ op, val, len ] = [ e.target.getAttribute('data-operator'), output.value, output.value.length ]
  if (val === '' || val === '.') output.value = `0 ${op} `
  else if (val.match(/.+[\+\-\*\/]\s$/g)) output.value = `${val.substring(0, len - 2)}${op} `
  else if (val.match(/.+\.$/g)) output.value = `${val.substring(0, len - 1)} ${op} `
  else if (val !== '-') output.value += ` ${op} `
}

const handleNumberBtn = e => {
  if (output.value[output.value.length - 1] === '0') handleBackspace()
  output.value += e.target.getAttribute('data-number')
}

const handleBackspace = () => {
  const amountToDelete = output.value[output.value.length - 1] !== ' ' ? 1 : 3
  output.value = output.value.substring(0, output.value.length - amountToDelete)
}

const handleNegativeBtn = () => {
  const { value } = output
  const [ longRegex1, longRegex2 ] = [ /([\+\*\/\-]\s)(\d+|\d+\.\d{0,})$/g, /([\+\*\/\-]\s)(\-)(\d+|\d+\.\d{0,})$/g ]
  if (value === '' || value.match(/^(\d+|\d+\.\d+)$/g)) output.value = `-${value}`
  else if (value.replace(' ', '').match(/^\-\d{0,}(\.\d+)?$/)) output.value = value.substring(1)
  else if (value.match(/[\+\*\/\-]\s$/g)) output.value += '-'
  else if (value.match(/\-$/g)) handleBackspace()
  else if (value.match(longRegex1)) output.value = value.replace(longRegex1, '$1-$2')
  else if (value.match(longRegex2)) output.value = value.replace(longRegex2, '$1$3')
}

const handlePointBtn = () => {
  if (output.value === '' || output.value.match(/.+[\+\-\*\/]$/g)) output.value += '0.'
  else if (!output.value.match(/\d{0,}\.\d{0,}$/)) output.value += '.'
}

const handleEquals = () => {
  try {
    const result = eval(output.value).toString()
    output.value = (result.split('.').length === 2 && result.split('.')[1].length > 5)
      ? Number(result).toFixed(5)
      : result
  } catch (error) { return }
}

const handleClear = () => output.value = ''

operators.forEach(operator => operator.addEventListener('click', e => handleOperatorBtn(e)))
numbers.forEach(number => number.addEventListener('click', e => handleNumberBtn(e)))

backspace.addEventListener('click', handleBackspace)
negative.addEventListener('click', handleNegativeBtn)
point.addEventListener('click', handlePointBtn)
equal.addEventListener('click', handleEquals)
clear.addEventListener('click', handleClear)