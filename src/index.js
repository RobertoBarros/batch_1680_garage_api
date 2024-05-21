const url = 'https://garage.api.lewagon.com/tabajara/cars'
const form = document.querySelector('.car-form')
const list = document.querySelector('.cars-list')


form.addEventListener('submit', (event) => {
  event.preventDefault()

  const bodyValue = Object.fromEntries(new FormData(form))
  console.log(bodyValue);

  fetch(url, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(bodyValue)
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      refreshCars()
    })

})

const destroyCars = () => {
  const btnsDestroy = list.querySelectorAll('.destroy')
  btnsDestroy.forEach((btn) => {
    btn.addEventListener('click', (event) => {
      const id = event.currentTarget.dataset.id
      console.log(`click no btn destroy id=${id}`);

      fetch(`https://garage.api.lewagon.com/cars/${id}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data)
          refreshCars()
        })

    })
  })
}

const carTemplate = (car) => {
  return `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand}-${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
        <button class='btn btn-danger destroy' data-id="${car.id}">DESTROY</button>
      </div>
    </div>`
}

const refreshCars = () =>  {

  fetch(url)
    .then(response => response.json())
    .then((data) => {
      list.innerHTML = ''
      data.forEach((car) => {
        const template = carTemplate(car)
        list.insertAdjacentHTML('beforeend', template)
      })
      destroyCars()
    })

}

refreshCars()
