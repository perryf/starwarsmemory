const gameImages = prepareHand(data)
const cards = document.querySelectorAll('.card')
const scoreBoard = document.querySelector('.score')
const endMessage = document.querySelector('.message')
let selection = []
let score = 0
let winCount = 0

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
  card.classList.add('selected')
  selection.push(card)
  if (selection.length >= 2) compare(e) 
}

function compare(e) {
  let id1 = selection[0].dataset.id
  let id2 = selection[1].dataset.id
  if (!(gameImages[id1] === gameImages[id2])) {
    selection.forEach((card) => {
      setTimeout(() => {
        card.removeAttribute('style')
        card.classList.remove('selected')
      }, 1000)
    })
    addListeners(selection)
  } else {
    winCount++
    checkIfWon()
  }
  score++
  selection = []
}

function checkIfWon() {
  if (winCount >= 12) {
    gameOver()
  }
}

function gameOver() {
  let message = score > 20 ? 'You are not a jedi yet' : 'The force is strong with this one'
  scoreBoard.innerHTML = `You won in ${score} tries!`
  endMessage.innerHTML = message
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