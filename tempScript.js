//1 - Grab our buttons
//1.1 - For each button add a 'click' event listener
//1.2 - When user clicks on the button we dispatch a function
//... which collects our dataset.option and handles our click.
const listenToOptionButtons = () => {
    const buttons = [...document.querySelectorAll('.activity-tracker__option')]
    buttons.forEach(button => {
        const optionDataset = button.dataset.option //?
        button.addEventListener('click', () => {
            //1.3 - Add the callback(function) that updates our clicked button
            //...with the class of active.
            //1.4 - render the cards whilst passing through our optionDataset
            updateClickedButton(button)
            renderCards(optionDataset)
        })
    })
}




const renderCards = (optionClicked) => {

    //Clear existing html cards
    clearHtmlCards()

    //Create cards
    let activitiesToAppend = createAllCardsFromData(optionClicked)

    //Render cards
    const sectionToAppendTo = document.querySelector('section.activity-tracker')
    let allActivitiesAsString
    activitiesToAppend.forEach(activity => {
        sectionToAppendTo.append(activity)
    })
};

const clearHtmlCards = () => {
    const htmlActivities = document.querySelectorAll('.activity-tracker__activity')
    htmlActivities.forEach(activity => activity.remove())
}

const createAllCardsFromData = (optionClicked) => {
    // Create var to store our nodes
    let allData = [...data]
    let activities = []

    //Loop through activities data
    allData.forEach(activity => {
        activity//?
        let name = activity.title
        let elClass = name.replace(' ', '-').toLowerCase()
        let dataChosen = activity.timeframes[`${optionClicked}`]
        let current = dataChosen.current
        let previous = dataChosen.previous
        let activityTimeframe = timeframe(optionClicked)
        let articleToAppend = document.createElement('article')
        articleToAppend.classList.add('activity-tracker__activity', `${elClass}`)
        let stringToInject = `
            <div class="activity__bg">
              <img src="./images/icon-${elClass}.svg" alt="">
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
              <div class="activity__data">
                <h3 class="activity__amount">
                  ${current}hrs
                </h3>
                <div class="activity__previous-comparison">
                  <p class="time-window">${activityTimeframe}</p>
                  <p> - </p>
                  <p class="time">${previous}</p>
                </div>
      
              </div>
            </div>
            `
        articleToAppend.innerHTML = stringToInject
        activities = [...activities, articleToAppend]
    })

    return activities

}

const timeframe = (optionClicked) => {
    if (optionClicked === 'daily') {
        return 'Yesterday'
    } else if (optionClicked === 'weekly') {
        return 'Last Week'
    } else if (optionClicked === 'monthly') {
        return 'Last Month'
    }
}

let json = [
    {
        "title": "Work",
        "timeframes": {
            "daily": {
                "current": 5,
                "previous": 7
            },
            "weekly": {
                "current": 32,
                "previous": 36
            },
            "monthly": {
                "current": 103,
                "previous": 128
            }
        }
    },
    {
        "title": "Play",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 2
            },
            "weekly": {
                "current": 10,
                "previous": 8
            },
            "monthly": {
                "current": 23,
                "previous": 29
            }
        }
    },
    {
        "title": "Study",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 7
            },
            "monthly": {
                "current": 13,
                "previous": 19
            }
        }
    },
    {
        "title": "Exercise",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 1
            },
            "weekly": {
                "current": 4,
                "previous": 5
            },
            "monthly": {
                "current": 11,
                "previous": 18
            }
        }
    },
    {
        "title": "Social",
        "timeframes": {
            "daily": {
                "current": 1,
                "previous": 3
            },
            "weekly": {
                "current": 5,
                "previous": 10
            },
            "monthly": {
                "current": 21,
                "previous": 23
            }
        }
    },
    {
        "title": "Self Care",
        "timeframes": {
            "daily": {
                "current": 0,
                "previous": 1
            },
            "weekly": {
                "current": 2,
                "previous": 2
            },
            "monthly": {
                "current": 7,
                "previous": 11
            }
        }
    }
]

let data;

const loadData = async () => {
    // let response = await fetch("./data.json") //!uncomment this once done
    // let parsedData = await response.json() //!uncomment this once done
    data = json

    //Once we have the data lets do something with it!
    // We will load our cards once we have data.
    clickWeeklyButton()
}

const clickWeeklyButton = () => {
    document.querySelector(".activity-tracker__option[data-option='weekly']").click()
}

    // listenToOptionButtons()
    // loadData()



