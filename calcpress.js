//declaraciones y fetch
const usdInput = document.querySelector('#usdInput')
const cotiPayPal = document.querySelector('#cotiPayPal')
const btnPayPal = document.querySelector('#btnPayPal')
const resetPayPal = document.querySelector('#resetPayPal')
const resultPayPal = document.querySelector('#resultPayPal')
const arsInput = document.querySelector('#arsInput')
const cotiMpago = document.querySelector('#cotiMpago')
const btnMpago = document.querySelector('#btnMpago')
const resetMpago = document.querySelector('#resetMpago')
const resultMpago = document.querySelector('#resultMpago')
const ppToAtm = 1.16
let blue = 0

fetch('https://api.bluelytics.com.ar/v2/latest')
  .then((response) => response.json())
  .then((data) => {
    blue = data.blue.value_buy
    blue = (blue - blue * 0.0066).toFixed(2)
    cotiPayPal.value = blue
    cotiMpago.value = blue
  })

//función para calcular PayPal
function paypal() {
  let text
  let usd = +usdInput.value
  let coti = +cotiPayPal.value
  let inter = usd - (usd * 5.4) / 100 - 0.3
  let airtm = inter / ppToAtm
  let mpago = airtm * coti
  if (isNaN(usd)) {
    text = 'Por favor, ingrese un número correcto.'
    usdInput.value = ''
  } else {
    text = `Con $${usd} recibes $${inter.toFixed(2)}.<br>
      Airtm: $${airtm.toFixed(2)}.<br>
      MercadoPago: $${Math.round(mpago)}.`
  }
  resultPayPal.innerHTML = text
}

//función para calcular MercadoPago
function mpago() {
  let text
  let ars = +arsInput.value
  let coti = +cotiMpago.value
  let airtm = ars / coti
  let inter = airtm * ppToAtm
  let ppal = inter + (inter * 5.4) / 100 + 0.3
  if (isNaN(ars)) {
    text = 'Por favor, ingrese un número correcto.'
    arsInput.value = ''
  } else {
    text = `Para recibir $${ars}<br>
      necesitas $${Math.ceil(ppal)} en PayPal.<br>
      Airtm: $${airtm.toFixed(2)}.`
  }
  resultMpago.innerHTML = text
}

//funciones con Enter
function paypalEnter(event) {
  if (event.keyCode == 13) {
    paypal()
  }
}
function mpagoEnter(event) {
  if (event.keyCode == 13) {
    mpago()
  }
}

//event listeners
usdInput.addEventListener('keypress', paypalEnter)
cotiPayPal.addEventListener('keypress', paypalEnter)
btnPayPal.addEventListener('click', paypal)
resetPayPal.addEventListener('click', function () {
  usdInput.value = ''
  cotiPayPal.value = blue
  resultPayPal.innerHTML = ''
})
arsInput.addEventListener('keypress', mpagoEnter)
cotiMpago.addEventListener('keypress', mpagoEnter)
btnMpago.addEventListener('click', mpago)
resetMpago.addEventListener('click', function () {
  arsInput.value = ''
  cotiMpago.value = blue
  resultMpago.innerHTML = ''
})
