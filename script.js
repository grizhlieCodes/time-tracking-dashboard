let data = [];

const listenToOptionButtons = () => {
  const buttons = document.querySelectorAll('.activity-tracker__option')
  buttons.forEach(button => {
    const optionDataset = button.dataset.option //?
    button.addEventListener('click', () => {
      updateClickedButton(button, buttons)
      renderCards(optionDataset)
    })
  })
}

const updateClickedButton = (clickedButton, allButtons) => {
  allButtons.forEach(option => option.classList.remove('active'))
  clickedButton.classList.add('active')
}

const renderCards = (optionClicked) => {
  const activities = document.querySelectorAll('.activity-tracker__activity')
  activities.forEach(a => a.remove())

  let activitiesToAppend = createAllCardsFromData(optionClicked)
  
  const activityTracker = document.querySelector('.activity-tracker')
  activitiesToAppend.forEach(section => {
    activityTracker.append(section)
  })
};

const createAllCardsFromData = (optionClicked) => {
  let allData = [...data]
  let activities = []

  allData.forEach(activity => {
    const name = activity.title
    const elementClass = name.toLowerCase().replace(' ', '-')
    const dataChosen = activity.timeframes[`${optionClicked}`]
    const current = dataChosen.current
    const previous = dataChosen.previous
    const activityTimeframe = timeframe(optionClicked)
    const sectionToAppend = document.createElement('section')
    sectionToAppend.classList.add('activity-tracker__activity',
      `${elementClass}`)

    const stringToInject = `
    <div class="activity__bg">
      <img src="./images/icon-${elementClass}.svg" alt="">
    </div>
    <div class="activity__info">
      <header class="activity__header">
        <h2 class="activity__name">
          ${name}
        </h2>
        <div class="activity__options">
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF" fill-rule="evenodd" />
          </svg>
        </div>
      </header>
    <div class="activity__timeframes">
      <h3 class="activity__current-timeframe">
        ${current}hrs
      </h3>
      <div class="activity__previous-timeframe">
        <p class="time-window">${activityTimeframe}</p>
        <p> - </p>
        <p class="time">${previous}hrs</p>
      </div>
    </div>
  </div>`

    sectionToAppend.innerHTML = stringToInject
    activities = [...activities, sectionToAppend]

  })

  return activities
};

const timeframe = (optionClicked) => {
  if (optionClicked === 'daily') {
    return 'Yesterday'
  } else if (optionClicked === 'weekly') {
    return 'Last Week'
  } else if (optionClicked === 'monthly') {
    return 'Last Month'
  }
};

const loadData = async () => {
  const response = await fetch("./data.json")
  const jsonData = await response.json()
  data = jsonData
  document.querySelectorAll('.activity-tracker__option')[1].click()

};
loadData()

listenToOptionButtons()


