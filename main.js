import Chart from 'chart.js/auto';
const ctx = document.getElementById('myChart');
let peso = document.getElementById('peso');
const resultado = document.getElementById('resultado');

const obtenerDolares = async() =>{
  const url = 'https://dolarapi.com/v1/dolares';
  const request = await fetch('https://dolarapi.com/v1/dolares');
  const data = await request.json();
  let labels = [];
  let values = [];
  data.map((d) =>{
    labels.push(d.nombre);
    values.push(d.venta);
  });
  return {
    labels,
    values,
  };
};
const data = await obtenerDolares();
new Chart(ctx, {
  type: 'bar',
  data: {
    labels: data.labels,
    datasets: [{
      label: 'Valor de venta',
      data: data.values,
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const obtenerDolarBlue = async () =>{
  const url = 'https://dolarapi.com/v1/dolares/blue';
  const requestData = await fetch(url);
  const data = await requestData.json();
  return data.venta;
}

const calcularDolarBlue = async (pesos) =>{
  const multiplicar = await obtenerDolarBlue();
  return parseInt(pesos) / multiplicar;
}

buton_peso.addEventListener('click',async ()=>{
  resultado.innerHTML = await calcularDolarBlue(peso.value);
  peso.value = "";
});