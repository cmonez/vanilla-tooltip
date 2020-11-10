const cards = document.querySelectorAll('.user-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    domRect = card.getBoundingClientRect();
    console.log('Moused over a card!');
    console.log('Coordinates', domRect);
  });
});

console.log('here the car', cards);
