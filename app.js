const gameImages = prepareHand(data)
const cards = document.querySelectorAll('.card')
let selection = []

function addListeners(cards) {
  cards.forEach((card, i) => {
    function flipEvent() {flip(card, flipEvent)}
    card.addEventListener('click', flipEvent)
  })
}

function flip(card, e) {
  card.removeEventListener('click', e)
  const id = parseInt(card.dataset.id)
  card.setAttribute(
    'style', 
    `background: url('./assets/cards/${gameImages[id].name}.jpeg') center/cover`
  )
  selection.push(card)
  if (selection.length >= 2) compare(e) 
}

function compare(e) {
  let id1 = selection[0].dataset.id
  let id2 = selection[1].dataset.id
  if (gameImages[id1]=== gameImages[id2]) {
    removeCards(e)
  } else {
    selection.forEach((card) => {
      setTimeout(() => {
        card.removeAttribute('style')
      }, 1000)
    })
    addListeners(selection)
  }
  selection = []
}

function removeCards(flipEvent) {
  selection.forEach((card) => {
    setTimeout(() => {
      card.removeAttribute('style')
      card.setAttribute('style', 'background: green')
    }, 1000)
  })
}

function prepareHand(a) {
  shuffle(a)
  a = cutAndDouble(a)
  shuffle(a)
  return a
}

// Fisher-Yates shuffle algorithm
function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const x = a[i]
    a[i] = a[j]
    a[j] = x
  }
}

function cutAndDouble(a) {
  a = data.filter((img, i) => i >= 12)
  a.map(img => a.push(img))
  return a
}

addListeners(cards)