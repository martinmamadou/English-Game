
const cardType = [{name : 'easy' }, {name : 'medium'}, {name : 'hard'}, {name: 'very hard'}]
const selectedCardIndex= Math.floor(Math.random()*cardType.length)
const selectedCard= cardType[selectedCardIndex]



console.log(selectedCard)