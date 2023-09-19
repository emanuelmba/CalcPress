const ppToAtm = 1.16
var blue = 0

fetch('https://api.bluelytics.com.ar/v2/latest')
  .then((response) => response.json())
  .then((data) => {
    blue = data.blue.value_buy
    blue = (blue - blue * 0.0066).toFixed(2)
    document.getElementById('cotiPayPal').value = blue
    document.getElementById('cotiMpago').value = blue
  })

//función para calcular PayPal
function paypal() {
  let text
  let usd = +document.getElementById('usd').value
  let coti = +document.getElementById('cotiPayPal').value
  let inter = usd - (usd * 5.4) / 100 - 0.3
  let airtm = inter / ppToAtm
  let mpago = airtm * coti
  if (isNaN(usd)) {
    text = 'Por favor, ingrese un número correcto.'
  } else {
    text = `Con $${usd} recibes $${inter.toFixed(2)}.<br>
      Airtm: $${airtm.toFixed(2)}.<br>
      MercadoPago: $${Math.round(mpago)}.`
  }
  document.getElementById('resultPayPal').innerHTML = text
}
document.getElementById('resetPayPal').addEventListener('click', function () {
  document.getElementById('cotiPayPal').value = blue
  document.getElementById('resultPayPal').innerHTML = ''
  document.getElementById('usd').value = ''
})

//función para calcular MercadoPago
function mpago() {
  let text
  let ars = +document.getElementById('ars').value
  let coti = +document.getElementById('cotiMpago').value
  let airtm = ars / coti
  let inter = airtm * ppToAtm
  let ppal = inter + (inter * 5.4) / 100 + 0.3
  if (isNaN(ars)) {
    text = 'Por favor, ingrese un número correcto.'
  } else {
    text = `Para recibir $${ars}<br>
      necesitas $${Math.ceil(ppal)} en PayPal.<br>
      Airtm: $${airtm.toFixed(2)}.`
  }
  document.getElementById('resultMpago').innerHTML = text
}
document.getElementById('resetMpago').addEventListener('click', function () {
  document.getElementById('cotiMpago').value = blue
  document.getElementById('resultMpago').innerHTML = ''
  document.getElementById('ars').value = ''
})

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
