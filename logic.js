const cards = document.querySelectorAll('.user-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    const toolTip = document.createElement('div');
    toolTip.classList.add('tooltip');
    domRect = card.getBoundingClientRect();
    const xCoordinate = domRect.x;
    const topCoordinate = domRect.y;
    const width = `${domRect.width}px`;
    const height = `${domRect.height}px`;
    toolTip.style.height = height;
    toolTip.style.width = width;
    const newContent = document.createTextNode('Hi there and greetings!');
    toolTip.appendChild(newContent);
    card.appendChild(toolTip);
  });
});

cards.forEach((card) => {
  card.addEventListener('mouseleave', () => {
    const toolTipToRemove = document.querySelector('.tooltip');
    console.log('TO REMOVE', toolTipToRemove);
    card.removeChild(toolTipToRemove);
  });
});
