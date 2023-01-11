const ppToAtm = 1.14
var blue = 0

fetch('https://api.bluelytics.com.ar/v2/latest')
  .then((response) => response.json())
  .then((data) => {
    blue = data.blue.value_buy
    blue = (blue - (blue * 8.88) / 100).toFixed(2)
    document.getElementById('coti1').value = blue
    document.getElementById('coti2').value = blue
  })

//función para calcular PayPal
function paypal() {
  let text1 = ''
  let usd = Number(document.getElementById('usd').value)
  let coti = Number(document.getElementById('coti1').value)
  let ppal = usd - (usd * 5.4) / 100 - 0.3
  let airtm = ppal / ppToAtm
  let mpago = airtm * coti
  if (isNaN(usd)) {
    text1 = 'Por favor, ingrese un número correcto.'
  } else {
    text1 =
      'Con $' +
      usd +
      ' recibes $' +
      ppal.toFixed(2) +
      '.<br>Airtm: $' +
      airtm.toFixed(2) +
      '.<br>MercadoPago: $' +
      mpago.toFixed(0) +
      '.'
  }
  document.getElementById('resu1').innerHTML = text1
}
document.getElementById('reset1').addEventListener('click', function () {
  document.getElementById('usd').value = ''
  document.getElementById('coti1').value = blue
  document.getElementById('resu1').innerHTML = ''
})

//función para calcular MercadoPago
function mpago() {
  let text2 = ''
  let ars = Number(document.getElementById('ars').value)
  let coti = Number(document.getElementById('coti2').value)
  let airtm = (ars / coti) * ppToAtm
  let ppal = airtm + (airtm * 5.4) / 100 + 0.3
  if (isNaN(ars)) {
    text2 = 'Por favor, ingrese un número correcto.'
  } else {
    text2 =
      'Para recibir $' +
      ars +
      '<br>necesitas $' +
      ppal.toFixed(2) +
      ' en PayPal.<br>Airtm: $' +
      (ars / coti).toFixed(2) +
      '.'
  }
  document.getElementById('resu2').innerHTML = text2
}
document.getElementById('reset2').addEventListener('click', function () {
  document.getElementById('ars').value = ''
  document.getElementById('coti2').value = blue
  document.getElementById('resu2').innerHTML = ''
})
