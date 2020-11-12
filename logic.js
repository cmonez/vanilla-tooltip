const userContainer = document.querySelector('.user-container');

// Set cards for the first time from presaved data
setParentContainer(randomUsers.results);

const cards = document.querySelectorAll('.user-card');
const button = document.querySelector('button');
button.addEventListener('click', () => {
  fetch('https://randomuser.me/api/?results=8')
    .then((response) => response.json())
    .then((data) => {
      // Clear the userContainer
      setParentContainer(data.results);
    });
});

// Function to create card
function createCard(user) {
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

// Function to create toolTip
function createToolTip(node, index, userInformation) {
  // If the tooltip exists already, REMOVE it
  // if the lastChild for the user-card is user-info then
  // toolTip has not been added yet (the last div)
  if (node.lastChild.classList[0] !== 'user-info') {
    const toolTipToRemove = node.querySelector('.tooltip');
    // console.log('In tooltip remove', toolTipToRemove);
    node.removeChild(toolTipToRemove);
  }
  // Set the tooltip
  const toolTip = document.createElement('div');
  toolTip.classList.add('tooltip');
  domRect = node.getBoundingClientRect();
  // Get coordinates of parent div to set the toolTip
  const xCoordinate = domRect.x;
  const topCoordinate = domRect.y;
  const width = domRect.width;
  const height = domRect.height;
  toolTip.style.height = `${height * 0.5}px`;
  toolTip.style.width = `${width * 0.6}px`;
  // Position the toolTip on top of the card using negative margin
  toolTip.style.marginTop = `-${height * 0.5 + 10}px`;
  // Create child divs for the contact information of each card
  const contactInfo = document.createElement('div');
  const phoneNumber = document.createElement('div');
  const email = document.createElement('div');
  contactInfo.classList.add('left-spacing');
  contactInfo.classList.add('embolden');
  contactInfo.innerText = 'Contact Info:';
  // Grab information to from userInformation to set the data dynamically for each card
  phoneNumber.innerText = `Phone Number: ${userInformation.cell}`;
  email.innerText = `Email: ${userInformation.email}`;
  // Margin to toolTip divs
  phoneNumber.classList.add('left-spacing', 'top-spacing');
  email.classList.add('left-spacing', 'top-spacing');
  // Append child divs to toolTip div that was created above
  toolTip.appendChild(contactInfo);
  toolTip.appendChild(phoneNumber);
  toolTip.appendChild(email);

  node.appendChild(toolTip);
}

// Function to set the userContainer with its child divs
function setParentContainer(newCards) {
  // reset userContainer
  userContainer.innerHTML = '';
  // Iterate over array of personObjects and add eventListeners for toolTip functionality
  for (let i = 0; i < newCards.length; i++) {
    let createdCard = createCard(newCards[i]);
    createdCard.addEventListener('mouseenter', () => {
      // Create the toolTip when you enter the card
      createToolTip(createdCard, i, newCards[i]);
    });
    // Remove the toolTip when you leave the card
    createdCard.addEventListener('mouseleave', function () {
      // Select the toolTip within the createdDiv
      const toolTipToRemove = createdCard.querySelector('.tooltip');
      // Set its opacity to 0 which will occur over 1500 ms
      toolTipToRemove.style.opacity = '0';
      setTimeout(function () {
        // Remove the selected toolTip after 1500ms
        // which is the same as the transition time upon mouseLeave
        toolTipToRemove.remove();
      }, 1500);
    });
  }
}
