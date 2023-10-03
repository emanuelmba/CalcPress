const inputs = document.querySelectorAll('.value')
const valBlue = document.querySelectorAll('.valBlue')
const results = document.querySelectorAll('p')
const ppToAtm = 1.16
let blue = 0

fetch('https://api.bluelytics.com.ar/v2/latest')
  .then((response) => response.json())
  .then((data) => {
    blue = data.blue.value_buy
    blue = (blue - blue * 0.0066).toFixed(2)
    valBlue.forEach((e) => (e.value = blue))
  })

function paypal() {
  let text
  let usd = +inputs[0].value
  let val = +valBlue[0].value
  let received = usd - (usd * 5.4) / 100 - 0.3
  let airtm = received / ppToAtm
  let mpago = airtm * val
  if (!usd || isNaN(usd) || !val || isNaN(val)) {
    text = 'Por favor, ingrese un número correcto.'
    reset(0)
  } else {
    text = `Con $${usd} recibes $${received.toFixed(2)}.<br>
      En Airtm pasan a ser $${airtm.toFixed(2)}.<br>
      MercadoPago: $${Math.round(mpago)} ARS.`
  }
  results[0].innerHTML = text
}

function mpago() {
  let text
  let ars = +inputs[1].value
  let val = +valBlue[1].value
  let airtm = ars / val
  let received = airtm * ppToAtm
  let ppal = received + (received * 5.4) / 100 + 0.3
  if (!ars || isNaN(ars) || !val || isNaN(val)) {
    text = 'Por favor, ingrese un número correcto.'
    reset(1)
  } else {
    text = `Para recibir $${ars} ARS<br>
      necesitas cobrar unos $${Math.ceil(ppal)}.<br>
      PayPal: $${received.toFixed(2)}. Airtm: $${airtm.toFixed(2)}.`
  }
  results[1].innerHTML = text
}

function reset(e) {
  inputs[e].value = ''
  valBlue[e].value = blue
  results[e].innerHTML = ''
}

inputs[0].addEventListener('keypress', (e) => (e.keyCode === 13 ? paypal() : null))
valBlue[0].addEventListener('keypress', (e) => (e.keyCode === 13 ? paypal() : null))
document.getElementById('btnPayPal').addEventListener('click', paypal)
document.getElementById('resetPayPal').addEventListener('click', () => reset(0))
inputs[1].addEventListener('keypress', (e) => (e.keyCode === 13 ? mpago() : null))
valBlue[1].addEventListener('keypress', (e) => (e.keyCode === 13 ? mpago() : null))
document.getElementById('btnMpago').addEventListener('click', mpago)
document.getElementById('resetMpago').addEventListener('click', () => reset(1))
