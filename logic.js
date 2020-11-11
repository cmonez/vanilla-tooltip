const cards = document.querySelectorAll('.user-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const toolTip = document.createElement('div');
    toolTip.classList.add('tooltip');
    const newContent = document.createTextNode('Hi there and greetings!');
    toolTip.appendChild(newContent);
    card.appendChild(toolTip);
    domRect = card.getBoundingClientRect();
    console.log('Moused over a card!');
    console.log('Coordinates', domRect);
  });
});

cards.forEach((card) => {
  card.addEventListener('mouseleave', () => {
    const toolTipToRemove = document.querySelector('.tooltip');
    console.log(toolTipToRemove);
    card.removeChild(toolTipToRemove);
  });
});
