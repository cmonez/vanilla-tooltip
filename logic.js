const cards = document.querySelectorAll('.user-card');

cards.forEach((card) => {
  card.addEventListener('mouseenter', () => {
    if (card.lastChild.classList[0] === 'user-info') {
      const toolTip = document.createElement('div');
      toolTip.classList.add('tooltip');
      domRect = card.getBoundingClientRect();
      const xCoordinate = domRect.x;
      const topCoordinate = domRect.y;
      const width = domRect.width;
      const height = domRect.height;
      toolTip.style.height = `${height * 0.5}px`;
      toolTip.style.width = `${width * 0.6}px`;
      toolTip.style.marginTop = `-${height * 0.5 + 10}px`;
      const newContent = document.createTextNode('Hi there and greetings!');
      toolTip.appendChild(newContent);
      card.appendChild(toolTip);
    } else {
      console.log('Already created!');
    }
  });
});

cards.forEach((card) => {
  card.addEventListener('mouseleave', function () {
    const toolTipToRemove = document.querySelector('.tooltip');
    toolTipToRemove.style.opacity = '0';
    setTimeout(function () {
      toolTipToRemove.style.opacity = '0';
      card.removeChild(toolTipToRemove);
    }, 1500);
  });
});
