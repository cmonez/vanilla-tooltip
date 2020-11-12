const userContainer = document.querySelector('.user-container');

for (let i = 0; i < randomUsers.results.length; i++) {
  createChildDiv(randomUsers.results[i], i);
}

const cards = document.querySelectorAll('.user-card');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  fetch('https://randomuser.me/api/?results=8')
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        let createdDiv = createChildDiv(data.results[i]);
        createdDiv.addEventListener('mouseenter', () => {
          createToolTip(createdDiv, i, data.results[i]);
        });
        createdDiv.addEventListener('mouseleave', function () {
          const toolTipToRemove = createdDiv.querySelector('.tooltip');
          toolTipToRemove.style.opacity = '0';
          setTimeout(function () {
            toolTipToRemove.style.opacity = '0';
            toolTipToRemove.remove();
          }, 1500);
        });
      }
    });
});

cards.forEach((card, index) => {
  card.addEventListener('mouseenter', () => {
    createToolTip(card, index, randomUsers.results[index]);
  });
});

cards.forEach((card) => {
  card.addEventListener('mouseleave', function () {
    // Make sure you grab the child div NOT from the whole body
    const toolTipToRemove = card.querySelector('.tooltip');
    toolTipToRemove.style.opacity = '0';
    setTimeout(function () {
      toolTipToRemove.style.opacity = '0';
      toolTipToRemove.remove();
    }, 1500);
  });
});

function createToolTip(node, index, userInformation) {
  // If the tooltip exists already, REMOVE it
  if (node.lastChild.classList[0] !== 'user-info') {
    const toolTipToRemove = node.querySelector('.tooltip');
    // console.log('In tooltip remove', toolTipToRemove);
    node.removeChild(toolTipToRemove);
  }
  // Set the tooltip
  const toolTip = document.createElement('div');
  toolTip.classList.add('tooltip');
  domRect = node.getBoundingClientRect();
  const xCoordinate = domRect.x;
  const topCoordinate = domRect.y;
  const width = domRect.width;
  const height = domRect.height;
  toolTip.style.height = `${height * 0.5}px`;
  toolTip.style.width = `${width * 0.6}px`;
  toolTip.style.marginTop = `-${height * 0.5 + 10}px`;
  const contactInfo = document.createElement('div');
  const phoneNumber = document.createElement('div');
  const email = document.createElement('div');

  contactInfo.classList.add('left-spacing');
  contactInfo.classList.add('embolden');
  contactInfo.innerText = 'Contact Info:';
  phoneNumber.innerText = `Phone Number: ${userInformation.cell}`;
  email.innerText = `Email: ${userInformation.email}`;

  phoneNumber.classList.add('left-spacing', 'top-spacing');
  email.classList.add('left-spacing', 'top-spacing');
  toolTip.appendChild(contactInfo);
  toolTip.appendChild(phoneNumber);
  toolTip.appendChild(email);

  node.appendChild(toolTip);
}

function createChildDiv(user) {
  // Create user-card div and all its nested divs
  // grab information from current iterable and set
  let childDiv = document.createElement('div');
  childDiv.classList.add('user-card');
  let profilePicture = document.createElement('img');
  let userInfoDiv = document.createElement('div');
  userInfoDiv.classList.add('user-info');
  let nameDiv = document.createElement('div');
  nameDiv.classList.add('name');
  nameDiv.innerText = `${user.name.first} ${user.name.last}`;
  let countryDiv = document.createElement('div');
  countryDiv.classList.add('country');
  countryDiv.innerText = `${user.location.country}`;
  profilePicture.src = user.picture.large;
  childDiv.appendChild(profilePicture);
  userInfoDiv.appendChild(nameDiv);
  userInfoDiv.appendChild(countryDiv);
  childDiv.appendChild(userInfoDiv);
  userContainer.appendChild(childDiv);
  return childDiv;
}
