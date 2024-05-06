/* 
    School Timetable - JavaScript Functions
    What're you doing here?
*/

// ---------------  SERVICE WORKER  ---------------

serviceWorker();
function serviceWorker() {
  if ('serviceWorker' in navigator) {
    console.log('Service worker compatible');
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('https://lucambr0.github.io/SchoolTimetable/service_worker.js')
        .then(reg => {
          console.log('Service worker registered');
        })
        .catch(err => {
          console.log(err);
        })
    })
  }
}

// ---------------  NAVBAR  ---------------

const navbar = document.getElementById("navbar");
const navbarBtn = document.querySelectorAll(".navbarBtn");
const navbarIcon = document.querySelectorAll(".navbarIcon");
const navbarLabel = document.querySelectorAll(".navbarLabel");
const appTabs = document.querySelectorAll(".appTabs");

appTabs.forEach(appTab => appTab.classList.remove("appTabsShown"));
appTabs.forEach(appTab => appTab.classList.add("appTabsHidden"));

// This displays the last tab the user was in when closed the app (default is Now Tab)
let tab;
let currentTab = -1;
if (localStorage.getItem('tab')) {
  tab = parseInt(localStorage.getItem('tab'));
} else {
  tab = 0;
}

// Calls the function to display the right tab
navbarAction(tab);

function navbarAction(tab) {
  if (currentTab !== tab) {
    currentTab = tab;
    localStorage.setItem('tab', tab);
    navbarIcon.forEach(item => item.classList.remove("navbarIconActive"));
    navbarLabel.forEach(item => item.classList.remove("navbarLabelActive"));
    navbarIcon[tab].classList.add("navbarIconActive");
    navbarLabel[tab].classList.add("navbarLabelActive");
    appTabs.forEach(appTab => appTab.classList.remove("appTabsShown"));
    appTabs.forEach(appTab => appTab.classList.add("appTabsHidden"));
    appTabs[tab].classList.remove("appTabsHidden");
    appTabs[tab].classList.add("appTabsShown");
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }
}

function getStarted() {
  setTimeout(() => {
    navbarAction(1);
  }, 350)
}

// ---------------  PERSONAL DATA ON SETTINGS TAB  ---------------

// Here are all the instructions and variables that write data to the frontend html

// Variable reference to user data HTML inputs
const userNameInput = document.getElementById("userNameInput");
const userClassInput = document.getElementById("userClassInput");
const userSchoolNameInput = document.getElementById("userSchoolNameInput");
const submitUserInfoBtn = document.getElementById("submitUserInfoBtn");

// Variable reference to user class HTML inputs
// Day and Hour for user's class
const userDaySelection = document.getElementById("userDaySelection");
const userHourSelection = document.getElementById("userHourSelection");
// Info for user's class
const userRoomInput = document.querySelectorAll(".userRoomInput");
const userComplexInput = document.querySelectorAll(".userComplexInput");
const userSubjectInput = document.querySelectorAll(".userSubjectInput");
const userTeacherInput = document.querySelectorAll(".userTeacherInput");
const submitUserClassTimesBtn = document.getElementById("submitUserClassTimesBtn");

// Now Tab variables that contain user's info
const nameDisplay = document.getElementById("nameDisplay");
const classDisplay = document.getElementById("classDisplay");
const schoolDisplay = document.getElementById("schoolDisplay");

function displayUserInfo() {
  // Triggers if there is saved data and fills all html fields that already have data

  // Writes data in Now Tab
  if (user.name) {
    nameDisplay.textContent = ", " + user.name;
  }
  else {
    nameDisplay.textContent = "";
  }
  if (user.className) {
    classDisplay.textContent = " - " + user.className;
  }
  else {
    classDisplay.textContent = "";
  }
  if (user.schoolName) {
    schoolDisplay.textContent = user.schoolName;
  }
  else {
    schoolDisplay.textContent = " ";
  }

  // Writes data to input fields in settings tab
  userNameInput.value = user.name;
  userClassInput.value = user.className;
  userSchoolNameInput.value = user.schoolName;
}

// ---------------  PERSONAL DATA INPUT  ---------------

// JavaScript variables that contain user's info
class UserInfo {
  constructor(name, className, schoolName) {
    this.name = name;
    this.className = className;
    this.schoolName = schoolName;
    this.room = [[]];
    this.complex = [[]];
    this.subject = [[]];
    this.teacher = [[]];
    if (!localStorage.getItem('user_OBJECT')) this.fillArrays();
  }

  fillArrays() {
    // Define the size of the arrays
    const rows = 6;
    const columns = 6;

    // Fill each array with empty strings
    for (let i = 0; i < rows; i++) {
      if (!this.room[i]) this.room[i] = Array(columns).fill("");
      if (!this.complex[i]) this.complex[i] = Array(columns).fill("");
      if (!this.subject[i]) this.subject[i] = Array(columns).fill("");
      if (!this.teacher[i]) this.teacher[i] = Array(columns).fill("");
    }
  }
}

let user = new UserInfo("", "", "");

// ---------------  MOVES OLD DATA STORAGE TO NEW (UNRELIABLE)  ---------------

// Since 1.51.xxx a change to how the data is managed in localStorage occured,
// so this script may save user's old data in the new user object

checkOldStorage();
function checkOldStorage() {
  if (localStorage.getItem('user_roomARR')) {
    user.room = JSON.parse(localStorage.getItem('user_roomARR'));
    if (localStorage.getItem('user_complexARR'))
      user.complex = JSON.parse(localStorage.getItem('user_complexARR'));
    if (localStorage.getItem('user_subjectARR'))
      user.subject = JSON.parse(localStorage.getItem('user_subjectARR'));
    if (localStorage.getItem('user_teacherARR'))
      user.teacher = JSON.parse(localStorage.getItem('user_teacherARR'));
    localStorage.removeItem('user_roomARR');
    localStorage.removeItem('user_complexARR');
    localStorage.removeItem('user_subjectARR');
    localStorage.removeItem('user_teacherARR');
    // window.location.reload();
    localStorage.setItem('user_OBJECT', JSON.stringify(user));
  }
  getUserInfoFromLocalStorage();
}

function getUserInfoFromLocalStorage() {
  // If it finds the key "user_object" in user's browser, it reads the data and writes it to the variables
  if (localStorage.getItem('user_OBJECT')) {
    user = JSON.parse(localStorage.getItem('user_OBJECT'));
    displayUserInfo();
  }
}

function updateUserInfo() {
  // When updateUserInfo is triggered the user class gets updated only if the input fields are not empty
  user.name = userNameInput.value;
  if (user.name.toLowerCase() == "Rick Astley".toLowerCase()) {
    window.location.href = "https://tools.apgy.in/ytl/xvFZjo5PgG0";
  }




  // window.location.href = "youtube://www.youtube.com/watch?v=xvFZjo5PgG0&pp=ygUPcmlja3JvbGwgbm8gYWRz";
  user.className = userClassInput.value;
  user.schoolName = userSchoolNameInput.value;
  localStorage.setItem('user_OBJECT', JSON.stringify(user));

  // Refreshes data in Now Tab
  displayUserInfo();
}


let previousDayState = 0;
let previousHourState = 0;
userDaySelection.addEventListener("change", updateUserClassGrid);
userHourSelection.addEventListener("change", updateUserClassGrid);

function updateUserClassGrid() {
  // This function updates the input element fields every time the user changes day or hour, even without clicking submit

  // First it saves in the previous location of day and hour the data that was in it
  user.room[previousDayState][previousHourState] = userRoomInput[0].value;
  user.complex[previousDayState][previousHourState] = userComplexInput[0].value;
  user.subject[previousDayState][previousHourState] = userSubjectInput[0].value;
  user.teacher[previousDayState][previousHourState] = userTeacherInput[0].value;
  // WARNING!!! As of now this data is NOT saved in localStorage, only when the user clicks Submit all data gets saved in localStorage.

  // and then changes the input to where it should be
  let dayIndex = null;
  switch (userDaySelection.value) {
    case 'monday':
      dayIndex = 0;
      break;
    case 'tuesday':
      dayIndex = 1;
      break;
    case 'wednesday':
      dayIndex = 2;
      break;
    case 'thursday':
      dayIndex = 3;
      break;
    case 'friday':
      dayIndex = 4;
      break;
    case 'saturday':
      dayIndex = 5;
      break;
  }
  let hourIndex = null;
  switch (userHourSelection.value) {
    case '1':
      hourIndex = 0;
      break;
    case '2':
      hourIndex = 1;
      break;
    case '3':
      hourIndex = 2;
      break;
    case '4':
      hourIndex = 3;
      break;
    case '5':
      hourIndex = 4;
      break;
    case '6':
      hourIndex = 5;
      break;
  }
  changeUserInputLabels(dayIndex, hourIndex);
}

function changeUserInputLabels(dayIndex, hourIndex) {
  userRoomInput[0].value = user.room[dayIndex][hourIndex];
  userComplexInput[0].value = user.complex[dayIndex][hourIndex];
  userSubjectInput[0].value = user.subject[dayIndex][hourIndex];
  userTeacherInput[0].value = user.teacher[dayIndex][hourIndex];
  // Finally, the current day and hour index are saved in 'previous' so it saves them when the user change label
  previousDayState = dayIndex;
  previousHourState = hourIndex;
}

function updateUserClassInfo() {
  // This function is triggered when the user clicks submit on the user class data. When this happens, all data in input fields get saved in variables AND in localStorage
  updateUserClassGrid();
  localStorage.setItem('user_OBJECT', JSON.stringify(user));
}

function displayUserClassInfo() {
  // Triggers if there is saved data and fills all html fields that already have data
  userRoomInput[0].value = user.room[0][0];
  userComplexInput[0].value = user.complex[0][0];
  userSubjectInput[0].value = user.subject[0][0];
  userTeacherInput[0].value = user.teacher[0][0];
}

getUserClassInfoFromLocalStorage();
function getUserClassInfoFromLocalStorage() {
  // If it finds a key "isThereData" in user's browser, it reads the data and writes it to the variables
  if (localStorage.getItem('user_OBJECT')) {
    user = JSON.parse(localStorage.getItem('user_OBJECT'));
    displayUserClassInfo();
  }
}


// ---------------  LESSON START TIME  ---------------

const startTimeInput = document.getElementById("timeInput");
let schoolHourStart;
let selectedStartTime;

getStartTimeFromStorage();
function getStartTimeFromStorage() {
  if (localStorage.getItem('lessonStartTime')) {
    selectedStartTime = localStorage.getItem('lessonStartTime');
  } else {
    selectedStartTime = 8;
    localStorage.setItem('lessonStartTime', selectedStartTime);
  }
  startTimeInput.value = selectedStartTime.toString().padStart(2, "0") + ":00";
  schoolHourStart = selectedStartTime;
}

startTimeInput.addEventListener("change", () => {
  let timeParts = startTimeInput.value.split(":");
  timeParts[1] = "00";
  selectedStartTime = parseInt(timeParts[0]);
  if (selectedStartTime < 5) {
    selectedStartTime = 5;
  } else if (selectedStartTime > 17) {
    selectedStartTime = 17;
  }
  // Update the input value with the selected hour and ":00" for minutes
  startTimeInput.value = selectedStartTime.toString().padStart(2, "0") + ":00";
  localStorage.setItem('lessonStartTime', selectedStartTime);
  schoolHourStart = selectedStartTime;
});

// ---------------  SHOWING USER CLASS DATA TO NOW TAB  ---------------

// Here all the data collected, saved, written and read from previous lines gets displayed to Now tab in the appropriate time

let previousSubject = null;
let previousRoom = null;

// USER'S DATA
function displayUserToNowTab(day, hour) {
  // USERS CLASS DATA IN NOW TAB
  const userClassroomDisplay = document.getElementById("userClassroomDisplay");
  const userComplexDisplay = document.getElementById("userComplexDisplay");
  const userSubjectAndTeacher = document.getElementById("userSubjectAndTeacher");

  const userNextRoomDisplay = document.getElementById("userNextRoom");
  const userNextSubjectDisplay = document.getElementById("userNextSubject");

  if (!usingCustomSearch) {
    // If usingCustomSearch is true than the hour is already compatible with array indexes, otherwise it must be subtracted by the time when school starts defined by the user
    hour -= schoolHourStart;
  }
  if (day != -1) { // day is subtracted by 1 in updateTime function, so sunday corresponds to -1 since week starts on sunday (wtf americans?!)
    if (!user.room[day][hour]) userClassroomDisplay.textContent = "No lesson";
    else {
      userClassroomDisplay.textContent = user.room[day][hour];
      userNextRoomDisplay.textContent = user.room[day][hour + 1];
    }
    if (!user.complex[day][hour]) {
      userComplexDisplay.style.display = "none";
      userComplexDisplay.textContent = " ";
      userNextSubjectDisplay.textContent = "";
    }
    else {
      userComplexDisplay.style.display = "block";
      userComplexDisplay.textContent = user.complex[day][hour];
    }
    if (!user.subject[day][hour]) {
      userSubjectAndTeacher.style.display = "none";
    }
    else {
      userSubjectAndTeacher.style.display = "block";
      userSubjectAndTeacher.textContent = user.subject[day][hour];
      userNextSubjectDisplay.textContent = user.subject[day][hour + 1];
      if (user.teacher[day][hour]) userSubjectAndTeacher.textContent += " - " + user.teacher[day][hour];
    }
    if (!user.room[day][hour + 1]) {
      userNextSubjectDisplay.textContent = "No lesson";
      userNextRoomDisplay.textContent = "";
    }
    else if (!user.room[day][hour]) {
      userNextSubjectDisplay.textContent = "No lesson";
      userNextRoomDisplay.textContent = "";
      if (user.room[day][hour + 1]) {
        userNextSubjectDisplay.textContent = user.subject[day][hour + 1];
        userNextRoomDisplay.textContent = user.room[day][hour + 1];
      }
    }
  }
  else {
    userClassroomDisplay.textContent = "No lesson";
    userComplexDisplay.textContent = "";
    userSubjectAndTeacher.textContent = "";
  }
  if (previousSubject != userSubjectAndTeacher.textContent) {
    userSubjectAndTeacher.style.animation = "none";
    setTimeout(() => {
      userSubjectAndTeacher.style.animation = "0.4s complex ease";
    }, 0);
  }

  if (previousRoom != userClassroomDisplay.textContent) {
    userClassroomDisplay.style.animation = "none";
    userComplexDisplay.style.animation = "none";
    setTimeout(() => {
      userClassroomDisplay.style.animation = "0.4s room ease";
      userComplexDisplay.style.animation = "0.5s complex ease";
    }, 0);
  }
  previousSubject = userSubjectAndTeacher.textContent;
  previousRoom = userClassroomDisplay.textContent;
}

// ---------------  DARK MODE  ---------------

const darkModeSwitch = document.getElementById("darkModeSwitch"); // reference to the switch <input> item which actually is a checkbox type
let darkModeState; // stores whether dark mode is active or not (0-1)
const themeSelection = document.getElementById("themeSelection");
let activeTheme = getThemeFromStorage();

findThemeStateAtLoad(); // When the page loads look for user's dark theme choice in local storage, if there isn't activates light mode 
function findThemeStateAtLoad() {
  if (localStorage.getItem('darkModeState')) {
    darkModeState = localStorage.getItem('darkModeState');
    if (darkModeState == "1") {
      darkModeSwitch.checked = true;
    }
  }
  else darkModeState = "0";
  setTheme();
  localStorage.setItem('darkModeState', darkModeState);
}

function toggleDarkMode() { // triggered when the switch is clicked
  if (darkModeSwitch.checked) {
    darkModeState = "1";
    setTheme();
  }
  else if (!darkModeSwitch.checked) {
    darkModeState = "0";
    setTheme();
  }
  localStorage.setItem('darkModeState', darkModeState);
}

// ---------------  SHOW/HIDE WELCOME MESSAGE  ---------------

const showGreetingSwitch = document.getElementById("showGreetingSwitch"); // reference to the switch <input> item which actually is a checkbox type
let showGreetingState; // stores whether the option of showing Greeting is active or not (0-1)

findShowGreetingStateAtLoad();  // When the page loads look for user's 'show greeting' choice in local storage, if there isn't it becomes false by default 
function findShowGreetingStateAtLoad() {
  if (localStorage.getItem('showGreetingState')) {
    showGreetingState = localStorage.getItem('showGreetingState');
    if (showGreetingState == "1") {
      document.getElementById("greetingDisplay").style.display = "block";
      showGreetingSwitch.checked = true;
    }
    else {
      showGreetingState = "0";
      showGreetingSwitch.checked = false;
      toggleShowGreetingState();
    }
  }
  else {
    showGreetingState = "0";
    showGreetingSwitch.checked = false;
  }
  localStorage.setItem('showGreetingState', showGreetingState);
  toggleShowGreetingState();
}

function toggleShowGreetingState() { // triggered when the switch is clicked
  if (showGreetingSwitch.checked) {
    document.getElementById("greetingDisplay").style.display = "block";
    showGreetingState = "1";
    document.getElementById("userDataForm").style.opacity = "1";
    document.getElementById("submitUserInfoBtn").style.opacity = "1";
    document.getElementById("greetingNotShownBox").style.display = "none";
  }
  else if (!showGreetingSwitch.checked) {
    document.getElementById("greetingDisplay").style.display = "none";
    showGreetingState = "0";
    document.getElementById("userDataForm").style.opacity = "0.5";
    document.getElementById("submitUserInfoBtn").style.opacity = "0.5";
    document.getElementById("greetingNotShownBox").style.display = "flex";
  }
  localStorage.setItem('showGreetingState', showGreetingState);
}



// ---------------  EXPAND USER CARDS  ---------------

let expandedUserCardState = 0;
let expandedUserCardElement = document.querySelector(".expandedUserCardContainer");
function toggleExpandedUserCard() {
  if (expandedUserCardState == 0) {
    expandedUserCardState = 2; // set state to 2 to avoid users from spamming the same button and glitch the animation
    expandedUserCardElement.style.display = "block";
    expandedUserCardElement.classList.remove("expandedUserCardContainerHidden");
    expandedUserCardElement.classList.add("expandedUserCardContainerShown");
    setTimeout(() => {
      expandedUserCardElement.style.animationDuration = "0s";
      expandedUserCardState = 1;
    }, 350);
  }
  else if (expandedUserCardState == 1) {
    expandedUserCardState = 2; // set state to 2 to avoid users from spamming the same button and glitch the animation
    expandedUserCardElement.style.animationDuration = "0.35s";
    expandedUserCardElement.classList.add("expandedUserCardContainerHidden");
    expandedUserCardElement.classList.remove("expandedUserCardContainerShown");
    setTimeout(() => {
      expandedUserCardState = 0;
      expandedUserCardElement.classList.remove("expandedUserCardContainerHidden");
      expandedUserCardElement.animation = "none";
    }, 350);
  }
}


// ---------------  EXPAND MATES CARDS  ---------------

let expandedCardsState = [0, 0, 0, 0, 0]
let expandedCardsElements = document.querySelectorAll(".expandedMatesCardContainer");
function toggleExpandedMatesCard(cardIdx) {
  if (expandedCardsState[cardIdx] == 0) {
    expandedCardsState[cardIdx] = 2; // set state to 2 to avoid users from spamming the same button and glitch the animation
    expandedCardsElements[cardIdx].style.display = "block";
    expandedCardsElements[cardIdx].classList.remove("expandedMatesCardContainerHidden");
    expandedCardsElements[cardIdx].classList.add("expandedMatesCardContainerShown");
    setTimeout(() => {
      expandedCardsElements[cardIdx].style.animationDuration = "0s";
      expandedCardsState[cardIdx] = 1;
    }, 350);
  }
  else if (expandedCardsState[cardIdx] == 1) {
    expandedCardsState[cardIdx] = 2; // set state to 2 to avoid users from spamming the same button and glitch the animation
    expandedCardsElements[cardIdx].style.animationDuration = "0.35s";
    expandedCardsElements[cardIdx].classList.add("expandedMatesCardContainerHidden");
    expandedCardsElements[cardIdx].classList.remove("expandedMatesCardContainerShown");
    setTimeout(() => {
      expandedCardsElements[cardIdx].classList.remove("expandedMatesCardContainerHidden");
      expandedCardsState[cardIdx] = 0;
    }, 350);
  }
}


// ---------------  TOGGLE ALWAYS EXPAND CARDS SWITCH  ---------------

const alwaysExpandCardsSwitch = document.getElementById("alwaysExpandCardsSwitch"); // reference to the switch <input> item which actually is a checkbox type
let alwaysExpandCardsState; // stores whether the option of showing Greeting is active or not (0-1)

function toggleAlwaysExpandCards() { // triggered when the switch is clicked
  if (alwaysExpandCardsSwitch.checked) {
    alwaysExpandCardsState = "1";
    expandedCardsState = [0, 0, 0, 0, 0]; // they are reversed because the toggle function sets them to '1'
    expandedUserCardState = 0;
  }
  else if (!alwaysExpandCardsSwitch.checked) {
    alwaysExpandCardsState = "0";
    expandedCardsState = [1, 1, 1, 1, 1]; // they are reversed because the toggle function sets them to '0'
    expandedUserCardState = 1;
  }
  toggleExpandedMatesCard(0);
  toggleExpandedMatesCard(1);
  toggleExpandedMatesCard(2);
  toggleExpandedMatesCard(3);
  toggleExpandedMatesCard(4);
  toggleExpandedUserCard();
  localStorage.setItem('alwaysExpandCardsState', alwaysExpandCardsState);
}

function findAlwaysExpandCards() {
  if (localStorage.getItem('alwaysExpandCardsState')) {
    alwaysExpandCardsState = localStorage.getItem('alwaysExpandCardsState');
    if (alwaysExpandCardsState == "1") {
      expandedCardsState = [0, 0, 0, 0, 0]; // they are reversed because the toggle function sets them to '1'
      expandedUserCardState = 0;
      alwaysExpandCardsSwitch.checked = true;
    }
    else {
      alwaysExpandCardsState = "0";
      expandedCardsState = [1, 1, 1, 1, 1]; // they are reversed because the toggle function sets them to '0'
      expandedUserCardState = 1;
      alwaysExpandCardsSwitch.checked = false;
    }
    toggleExpandedMatesCard(0);
    toggleExpandedMatesCard(1);
    toggleExpandedMatesCard(2);
    toggleExpandedMatesCard(3);
    toggleExpandedMatesCard(4);
    toggleExpandedUserCard();
  }
  else {
    alwaysExpandCardsState = "0";
    alwaysExpandCardsSwitch.checked = false;
  }
  localStorage.setItem('alwaysExpandCardsState', alwaysExpandCardsState);
}
findAlwaysExpandCards();  // When the page loads look for user's 'show greeting' choice in local storage, if there isn't it becomes false by default 


// ---------------  USER EXPANDED CARD BUTTONS  ---------------

const metaViewport = document.getElementById('viewportMeta');
let page = document.body.innerHTML;
let interruptTimeUpdate = false;

function userCardDownload() {
  if (expandedUserCardState == 1 && confirm("Download your class timetable as an image?")) {
    event.stopPropagation();
    interruptTimeUpdate = true;
    document.body.style.overflowX = "scroll";
    document.body.style.overscrollBehavior = "contain";
    const tableID = document.getElementById("tableContainer");
    const table =
      `
    <div id="tableContainer" class="">
    <table class="userFullTableContainer">
    <tr>
          <td class="hourNum"><img src="icons/icon-any-192x192.png" alt="SchoolTimetable Logo"></td>
          <th class="dayName">Monday</th>
          <th class="dayName">Tuesday</th>
          <th class="dayName">Wednesday</th>
          <th class="dayName">Thursday</th>
          <th class="dayName">Friday</th>
          <th class="dayName">Saturday</th>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 0) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][0] ? user.room[0][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][0] ? user.subject[0][0] : '.'}</p><p class="tabTeacher">${user.teacher[0][0] ? user.teacher[0][0] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][0] ? user.room[1][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][0] ? user.subject[1][0] : '.'}</p><p class="tabTeacher">${user.teacher[1][0] ? user.teacher[1][0] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][0] ? user.room[2][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][0] ? user.subject[2][0] : '.'}</p><p class="tabTeacher">${user.teacher[2][0] ? user.teacher[2][0] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][0] ? user.room[3][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][0] ? user.subject[3][0] : '.'}</p><p class="tabTeacher">${user.teacher[3][0] ? user.teacher[3][0] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][0] ? user.room[4][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][0] ? user.subject[4][0] : '.'}</p><p class="tabTeacher">${user.teacher[4][0] ? user.teacher[4][0] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][0] ? user.room[5][0] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][0] ? user.subject[5][0] : '.'}</p><p class="tabTeacher">${user.teacher[5][0] ? user.teacher[5][0] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 1) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][1] ? user.room[0][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][1] ? user.subject[0][1] : '.'}</p><p class="tabTeacher">${user.teacher[0][1] ? user.teacher[0][1] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][1] ? user.room[1][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][1] ? user.subject[1][1] : '.'}</p><p class="tabTeacher">${user.teacher[1][1] ? user.teacher[1][1] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][1] ? user.room[2][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][1] ? user.subject[2][1] : '.'}</p><p class="tabTeacher">${user.teacher[2][1] ? user.teacher[2][1] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][1] ? user.room[3][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][1] ? user.subject[3][1] : '.'}</p><p class="tabTeacher">${user.teacher[3][1] ? user.teacher[3][1] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][1] ? user.room[4][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][1] ? user.subject[4][1] : '.'}</p><p class="tabTeacher">${user.teacher[4][1] ? user.teacher[4][1] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][1] ? user.room[5][1] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][1] ? user.subject[5][1] : '.'}</p><p class="tabTeacher">${user.teacher[5][1] ? user.teacher[5][1] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 2) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][2] ? user.room[0][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][2] ? user.subject[0][2] : '.'}</p><p class="tabTeacher">${user.teacher[0][2] ? user.teacher[0][2] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][2] ? user.room[1][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][2] ? user.subject[1][2] : '.'}</p><p class="tabTeacher">${user.teacher[1][2] ? user.teacher[1][2] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][2] ? user.room[2][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][2] ? user.subject[2][2] : '.'}</p><p class="tabTeacher">${user.teacher[2][2] ? user.teacher[2][2] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][2] ? user.room[3][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][2] ? user.subject[3][2] : '.'}</p><p class="tabTeacher">${user.teacher[3][2] ? user.teacher[3][2] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][2] ? user.room[4][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][2] ? user.subject[4][2] : '.'}</p><p class="tabTeacher">${user.teacher[4][2] ? user.teacher[4][2] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][2] ? user.room[5][2] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][2] ? user.subject[5][2] : '.'}</p><p class="tabTeacher">${user.teacher[5][2] ? user.teacher[5][2] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 3) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][3] ? user.room[0][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][3] ? user.subject[0][3] : '.'}</p><p class="tabTeacher">${user.teacher[0][3] ? user.teacher[0][3] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][3] ? user.room[1][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][3] ? user.subject[1][3] : '.'}</p><p class="tabTeacher">${user.teacher[1][3] ? user.teacher[1][3] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][3] ? user.room[2][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][3] ? user.subject[2][3] : '.'}</p><p class="tabTeacher">${user.teacher[2][3] ? user.teacher[2][3] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][3] ? user.room[3][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][3] ? user.subject[3][3] : '.'}</p><p class="tabTeacher">${user.teacher[3][3] ? user.teacher[3][3] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][3] ? user.room[4][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][3] ? user.subject[4][3] : '.'}</p><p class="tabTeacher">${user.teacher[4][3] ? user.teacher[4][3] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][3] ? user.room[5][3] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][3] ? user.subject[5][3] : '.'}</p><p class="tabTeacher">${user.teacher[5][3] ? user.teacher[5][3] : '.'}</p></td>
        </tr>
        <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 4) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][4] ? user.room[0][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][4] ? user.subject[0][4] : '.'}</p><p class="tabTeacher">${user.teacher[0][4] ? user.teacher[0][4] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][4] ? user.room[1][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][4] ? user.subject[1][4] : '.'}</p><p class="tabTeacher">${user.teacher[1][4] ? user.teacher[1][4] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][4] ? user.room[2][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][4] ? user.subject[2][4] : '.'}</p><p class="tabTeacher">${user.teacher[2][4] ? user.teacher[2][4] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][4] ? user.room[3][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][4] ? user.subject[3][4] : '.'}</p><p class="tabTeacher">${user.teacher[3][4] ? user.teacher[3][4] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][4] ? user.room[4][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][4] ? user.subject[4][4] : '.'}</p><p class="tabTeacher">${user.teacher[4][4] ? user.teacher[4][4] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][4] ? user.room[5][4] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][4] ? user.subject[5][4] : '.'}</p><p class="tabTeacher">${user.teacher[5][4] ? user.teacher[5][4] : '.'}</p></td>
        </tr>
        <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 5) + ":00"}</td>
          <td class="cell"><h2>${user.room[0][5] ? user.room[0][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[0][5] ? user.subject[0][5] : '.'}</p><p class="tabTeacher">${user.teacher[0][5] ? user.teacher[0][5] : '.'}</p></td>
          <td class="cell"><h2>${user.room[1][5] ? user.room[1][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[1][5] ? user.subject[1][5] : '.'}</p><p class="tabTeacher">${user.teacher[1][5] ? user.teacher[1][5] : '.'}</p></td>
          <td class="cell"><h2>${user.room[2][5] ? user.room[2][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[2][5] ? user.subject[2][5] : '.'}</p><p class="tabTeacher">${user.teacher[2][5] ? user.teacher[2][5] : '.'}</p></td>
          <td class="cell"><h2>${user.room[3][5] ? user.room[3][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[3][5] ? user.subject[3][5] : '.'}</p><p class="tabTeacher">${user.teacher[3][5] ? user.teacher[3][5] : '.'}</p></td>
          <td class="cell"><h2>${user.room[4][5] ? user.room[4][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[4][5] ? user.subject[4][5] : '.'}</p><p class="tabTeacher">${user.teacher[4][5] ? user.teacher[4][5] : '.'}</p></td>
          <td class="cell"><h2>${user.room[5][5] ? user.room[5][5] : 'No lesson'}</h2><p class="tabSubject">${user.subject[5][5] ? user.subject[5][5] : '.'}</p><p class="tabTeacher">${user.teacher[5][5] ? user.teacher[5][5] : '.'}</p></td>
        </tr>
    </table>
  </div>
    `
    page = document.body.innerHTML;
    document.body.innerHTML = table;
    metaViewport.setAttribute('content', 'width=10, initial-scale=1.0 user-scalable=yes, maximum-scale=5');
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => {
      downloadImage("tableContainer", user.className + " timetables", () => {
        window.location.reload();
      });
    }, 1);
  }
  else return;
}

function downloadImage(divId, fileName, callback) {
  return new Promise(function (resolve, reject) {
    // Get the div element
    var divElement = document.getElementById(divId);

    // Apply inline styles to the div and its children
    applyInlineStyles(divElement);

    // Use dom-to-image to render the div to an image
    domtoimage.toBlob(divElement)
      .then(function (blob) {
        // Create a link element
        var link = document.createElement('a');

        // Create a URL for the blob object
        var url = URL.createObjectURL(blob);

        // Set the href and download attributes of the link
        link.href = url;
        link.download = fileName;

        // Append the link to the document body
        document.body.appendChild(link);

        // Trigger a click event on the link to initiate download
        link.click();

        // Remove the link from the document body
        document.body.removeChild(link);

        // Revoke the URL to release memory
        URL.revokeObjectURL(url);

        // Resolve the Promise

        // Call the callback function
        if (callback && typeof callback === 'function') {
          callback();
        }
      })
      .catch(function (error) {
        console.error('Error rendering image:', error);
      });
    resolve();
  });
}

function applyInlineStyles(element) {
  // Apply inline styles to the element
  element.style.fontFamily = 'Calibri, Arial, sans-serif'; // Example font family
  element.style.backgroundColor = "rgb(229, 229, 229)";
  // Add more styles as needed

  // Apply inline styles to the children of the element recursively
  var children = element.children;
  for (var i = 0; i < children.length; i++) {
    applyInlineStyles(children[i]);
  }
}

// Example usage:
// Call the function with the ID of the div you want to download and the desired file name
// downloadImage('yourDivId', 'image.png');


async function userCardShare() {
  if (expandedUserCardState == 1) {
    event.stopPropagation();
    try {
      await navigator.share({
        title: "User data",
        text: JSON.stringify(user),
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  else return;
}

function userCardEdit() {
  if (expandedUserCardState == 1) {
    event.stopPropagation();
    navbarAction(1);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    let day = "";
    let j, k;
    if (usingCustomSearch) {
      j = customHour + 1;
      k = customDay;
    }
    else {
      j = currentDate.getHours() - selectedStartTime + 1;
      if (j < 1 || j > 6) j = 1;
      k = currentDate.getDate() - 1;
    }
    switch (k) {
      case 0:
        day = "monday";
        break;
      case 1:
        day = "tuesday";
        break;
      case 2:
        day = "wednesday";
        break;
      case 3:
        day = "thursday";
        break;
      case 4:
        day = "friday";
        break;
      case 5:
        day = "saturday";
        break;
      default:
        day = "monday";
        break;
    }
    userDaySelection.value = day;
    userHourSelection.value = j;
    setTimeout(() => {
      userDaySelection.style.borderColor = "red";
      userHourSelection.style.borderColor = "red";
      userDaySelection.style.boxShadow = "0 0 18px rgb(255,0,0,0.4)";
      userHourSelection.style.boxShadow = "0 0 18px rgb(255,0,0,0.4)";
    }, 500);
    setTimeout(() => {
      userDaySelection.style.borderColor = "var(--solidAccentColor2)";
      userHourSelection.style.borderColor = "var(--solidAccentColor2)";
      userDaySelection.style.boxShadow = "none";
      userHourSelection.style.boxShadow = "none";
    }, 1300);
    updateUserClassGrid();
  }
  else return;
}


// ---------------  MATES EXPANDED CARD BUTTONS  ---------------

function matesCardDownload(i) {
  console.log("A");
  if (expandedCardsState[i] == 1 && confirm("Download class '" + mates[i].className + "' as an image?")) {
    event.stopPropagation();
    interruptTimeUpdate = true;
    document.body.style.overflowX = "scroll";
    document.body.style.overscrollBehavior = "contain";
    const tableID = document.getElementById("tableContainer");
    const table =
      `
    <div id="tableContainer" class="">
    <table class="userFullTableContainer">
    <tr>
          <td class="hourNum"><img src="icons/icon-any-192x192.png" alt="SchoolTimetable Logo"></td>
          <th class="dayName">Monday</th>
          <th class="dayName">Tuesday</th>
          <th class="dayName">Wednesday</th>
          <th class="dayName">Thursday</th>
          <th class="dayName">Friday</th>
          <th class="dayName">Saturday</th>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 0) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][0] ? mates[i].room[0][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][0] ? mates[i].subject[0][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][0] ? mates[i].teacher[0][0] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][0] ? mates[i].room[1][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][0] ? mates[i].subject[1][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][0] ? mates[i].teacher[1][0] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][0] ? mates[i].room[2][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][0] ? mates[i].subject[2][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][0] ? mates[i].teacher[2][0] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][0] ? mates[i].room[3][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][0] ? mates[i].subject[3][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][0] ? mates[i].teacher[3][0] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][0] ? mates[i].room[4][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][0] ? mates[i].subject[4][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][0] ? mates[i].teacher[4][0] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][0] ? mates[i].room[5][0] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][0] ? mates[i].subject[5][0] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][0] ? mates[i].teacher[5][0] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 1) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][1] ? mates[i].room[0][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][1] ? mates[i].subject[0][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][1] ? mates[i].teacher[0][1] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][1] ? mates[i].room[1][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][1] ? mates[i].subject[1][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][1] ? mates[i].teacher[1][1] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][1] ? mates[i].room[2][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][1] ? mates[i].subject[2][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][1] ? mates[i].teacher[2][1] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][1] ? mates[i].room[3][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][1] ? mates[i].subject[3][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][1] ? mates[i].teacher[3][1] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][1] ? mates[i].room[4][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][1] ? mates[i].subject[4][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][1] ? mates[i].teacher[4][1] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][1] ? mates[i].room[5][1] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][1] ? mates[i].subject[5][1] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][1] ? mates[i].teacher[5][1] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 2) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][2] ? mates[i].room[0][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][2] ? mates[i].subject[0][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][2] ? mates[i].teacher[0][2] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][2] ? mates[i].room[1][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][2] ? mates[i].subject[1][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][2] ? mates[i].teacher[1][2] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][2] ? mates[i].room[2][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][2] ? mates[i].subject[2][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][2] ? mates[i].teacher[2][2] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][2] ? mates[i].room[3][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][2] ? mates[i].subject[3][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][2] ? mates[i].teacher[3][2] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][2] ? mates[i].room[4][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][2] ? mates[i].subject[4][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][2] ? mates[i].teacher[4][2] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][2] ? mates[i].room[5][2] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][2] ? mates[i].subject[5][2] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][2] ? mates[i].teacher[5][2] : '.'}</p></td>
          </tr>
          <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 3) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][3] ? mates[i].room[0][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][3] ? mates[i].subject[0][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][3] ? mates[i].teacher[0][3] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][3] ? mates[i].room[1][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][3] ? mates[i].subject[1][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][3] ? mates[i].teacher[1][3] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][3] ? mates[i].room[2][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][3] ? mates[i].subject[2][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][3] ? mates[i].teacher[2][3] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][3] ? mates[i].room[3][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][3] ? mates[i].subject[3][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][3] ? mates[i].teacher[3][3] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][3] ? mates[i].room[4][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][3] ? mates[i].subject[4][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][3] ? mates[i].teacher[4][3] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][3] ? mates[i].room[5][3] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][3] ? mates[i].subject[5][3] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][3] ? mates[i].teacher[5][3] : '.'}</p></td>
        </tr>
        <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 4) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][4] ? mates[i].room[0][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][4] ? mates[i].subject[0][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][4] ? mates[i].teacher[0][4] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][4] ? mates[i].room[1][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][4] ? mates[i].subject[1][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][4] ? mates[i].teacher[1][4] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][4] ? mates[i].room[2][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][4] ? mates[i].subject[2][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][4] ? mates[i].teacher[2][4] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][4] ? mates[i].room[3][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][4] ? mates[i].subject[3][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][4] ? mates[i].teacher[3][4] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][4] ? mates[i].room[4][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][4] ? mates[i].subject[4][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][4] ? mates[i].teacher[4][4] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][4] ? mates[i].room[5][4] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][4] ? mates[i].subject[5][4] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][4] ? mates[i].teacher[5][4] : '.'}</p></td>
        </tr>
        <tr>
          <td class="hourNum">${(parseInt(selectedStartTime) + 5) + ":00"}</td>
          <td class="cell"><h2>${mates[i].room[0][5] ? mates[i].room[0][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[0][5] ? mates[i].subject[0][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[0][5] ? mates[i].teacher[0][5] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[1][5] ? mates[i].room[1][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[1][5] ? mates[i].subject[1][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[1][5] ? mates[i].teacher[1][5] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[2][5] ? mates[i].room[2][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[2][5] ? mates[i].subject[2][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[2][5] ? mates[i].teacher[2][5] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[3][5] ? mates[i].room[3][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[3][5] ? mates[i].subject[3][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[3][5] ? mates[i].teacher[3][5] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[4][5] ? mates[i].room[4][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[4][5] ? mates[i].subject[4][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[4][5] ? mates[i].teacher[4][5] : '.'}</p></td>
          <td class="cell"><h2>${mates[i].room[5][5] ? mates[i].room[5][5] : 'No lesson'}</h2><p class="tabSubject">${mates[i].subject[5][5] ? mates[i].subject[5][5] : '.'}</p><p class="tabTeacher">${mates[i].teacher[5][5] ? mates[i].teacher[5][5] : '.'}</p></td>
        </tr>
    </table>
  </div>
    `
    page = document.body.innerHTML;
    document.body.innerHTML = table;
    metaViewport.setAttribute('content', 'width=10, initial-scale=1.0 user-scalable=yes, maximum-scale=5');
    document.body.style.backgroundColor = "rgba(0,0,0,0)";
    setTimeout(() => {
      downloadImage("tableContainer", mates[i].className + " timetables", () => {
        window.location.reload();
      });
    }, 1);
  }
  else return;
}

async function matesCardShare(i) {
  if (expandedCardsState[i] == 1) {
    event.stopPropagation();
    try {
      await navigator.share({
        title: "Data from class " + mates[i].className,
        text: JSON.stringify(mates[i]),
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  else return;
}

function matesCardEdit(i) {
  if (expandedCardsState[i] == 1) {
    event.stopPropagation();
    navbarAction(1);
    document.querySelectorAll(".settingsSection")[1].scrollIntoView({ behavior: 'smooth' });
    let day = "";
    let j, k;
    if (usingCustomSearch) {
      j = customHour + 1;
      k = customDay;
    }
    else {
      j = currentDate.getHours() - selectedStartTime + 1;
      if (j < 1 || j > 6) j = 1;
      k = currentDate.getDate() - 1;
    }
    switch (k) {
      case 0:
        day = "monday";
        break;
      case 1:
        day = "tuesday";
        break;
      case 2:
        day = "wednesday";
        break;
      case 3:
        day = "thursday";
        break;
      case 4:
        day = "friday";
        break;
      case 5:
        day = "saturday";
        break;
      default:
        day = "monday";
        break;
    }
    classNumberSelection.value = i + 1;
    matesDaySelection.value = day;
    matesHourSelection.value = j;
    setTimeout(() => {
      classNumberSelection.style.borderColor = "red";
      matesDaySelection.style.borderColor = "red";
      matesHourSelection.style.borderColor = "red";
      classNumberSelection.style.boxShadow = "0 0 18px rgb(255,0,0,0.4)";
      matesDaySelection.style.boxShadow = "0 0 18px rgb(255,0,0,0.4)";
      matesHourSelection.style.boxShadow = "0 0 18px rgb(255,0,0,0.4)";
    }, 500);
    setTimeout(() => {
      classNumberSelection.style.borderColor = "var(--solidAccentColor2)";
      classNumberSelection.style.boxShadow = "none";
      matesDaySelection.style.borderColor = "var(--solidAccentColor2)";
      matesDaySelection.style.boxShadow = "none";
      matesHourSelection.style.borderColor = "var(--solidAccentColor2)";
      matesHourSelection.style.boxShadow = "none";
    }, 1300);
    changeMatesIndexLabels();
  }
  else return;
}

// ---------------  MANAGING AND SAVING DATA ABOUT MATES  ---------------

// JavaScript variables that contain mates' info
class matesInfo {
  constructor(name, className) {
    this.classMatesNames = name;
    this.className = className;
    this.room = [[]];
    this.subject = [[]];
    this.teacher = [[]];
    if (!localStorage.getItem('user')) this.fillArrays();
  }

  fillArrays() {
    // Define the size of the arrays
    const rows = 6;
    const columns = 6;

    // Fill each array with empty strings
    for (let i = 0; i < rows; i++) {
      this.room[i] = Array(columns).fill("");
      this.subject[i] = Array(columns).fill("");
      this.teacher[i] = Array(columns).fill("");
    }
  }
}

let mates = [];
mates.push(new matesInfo("", "", ""));
mates.push(new matesInfo("", "", ""));
mates.push(new matesInfo("", "", ""));
mates.push(new matesInfo("", "", ""));
mates.push(new matesInfo("", "", ""));

const matesClassInput = document.getElementById("matesClassInput");
const matesNamesInput = document.getElementById("matesNamesInput");

const matesRoomInput = document.getElementById("matesRoomInput");
const matesSubjectInput = document.getElementById("matesSubjectInput");
const matesTeacherInput = document.getElementById("matesTeacherInput");

let mateObjIndex = 0;
let previousMateObject = 0;

getMatesInfoFromLocalStorage();
function getMatesInfoFromLocalStorage() {
  // If it finds the key "mates_name" in user's browser, it reads the data and writes it to the variables
  if (localStorage.getItem('mates_OBJECT')) {
    let tempMatesOBJECT = JSON.parse(localStorage.getItem('mates_OBJECT'));
    mates.forEach((mate, index) => {
      mate.classMatesNames = tempMatesOBJECT[index].classMatesNames;
      mate.className = tempMatesOBJECT[index].className;
      mate.room = tempMatesOBJECT[index].room;
      mate.subject = tempMatesOBJECT[index].subject;
      mate.teacher = tempMatesOBJECT[index].teacher;
    });
    displayMatesInfo();
  }
}

function displayMatesInfo() {
  matesClassInput.value = mates[mateObjIndex].className;
  matesNamesInput.value = mates[mateObjIndex].classMatesNames;
  matesRoomInput.value = mates[mateObjIndex].room[0][0];
  matesSubjectInput.value = mates[mateObjIndex].subject[0][0];
  matesTeacherInput.value = mates[mateObjIndex].teacher[0][0];
}

function updateMatesInfo() {
  // When updateUserInfo is triggered the user class gets updated only if the input fields are not empty
  localStorage.setItem('isThereData', "HEYYY I'M HEREEE");
  mates[mateObjIndex].className = matesClassInput.value;
  mates[mateObjIndex].classMatesNames = matesNamesInput.value;

  localStorage.setItem('isThereData', "HEYYY I'M HEREEE");
  localStorage.setItem('mates_OBJECT', JSON.stringify(mates));
}

const classNumberSelection = document.getElementById("classNumberSelection");

classNumberSelection.addEventListener("change", changeMatesIndexLabels);

function changeMatesIndexLabels() {
  updateMatesClassGrid();
  mates[previousMateObject].className = matesClassInput.value;
  mates[previousMateObject].classMatesNames = matesNamesInput.value;


  mateObjIndex = classNumberSelection.value - 1;

  matesClassInput.value = mates[mateObjIndex].className.trim();
  matesNamesInput.value = mates[mateObjIndex].classMatesNames.trim();
  matesRoomInput.value = mates[mateObjIndex].room[MATEpreviousDayState][MATEpreviousHourState];
  matesSubjectInput.value = mates[mateObjIndex].subject[MATEpreviousDayState][MATEpreviousHourState];
  matesTeacherInput.value = mates[mateObjIndex].teacher[MATEpreviousDayState][MATEpreviousHourState];

  previousMateObject = mateObjIndex;
}

function updateMatesClassInfo() {
  // This function is triggered when the user clicks submit on the user class data. When this happens, all data in input fields get saved in variables AND in localStorage
  updateMatesInfo();
  updateMatesClassGrid();
  localStorage.setItem('isThereData', "HEYYY I'M HEREEE");
  localStorage.setItem('mates_OBJECT', JSON.stringify(mates));
}

// DAYS AND HOURS PART (MATES)

let MATEpreviousDayState = 0;
let MATEpreviousHourState = 0;

const matesDaySelection = document.getElementById("matesDaySelection");
const matesHourSelection = document.getElementById("matesHourSelection");

matesDaySelection.addEventListener("change", updateMatesClassGrid);
matesHourSelection.addEventListener("change", updateMatesClassGrid);

function updateMatesClassGrid() {
  mates[mateObjIndex].room[MATEpreviousDayState][MATEpreviousHourState] = matesRoomInput.value;
  mates[mateObjIndex].subject[MATEpreviousDayState][MATEpreviousHourState] = matesSubjectInput.value;
  mates[mateObjIndex].teacher[MATEpreviousDayState][MATEpreviousHourState] = matesTeacherInput.value;

  let MATEdayIndex = null;
  switch (matesDaySelection.value) {
    case 'monday':
      MATEdayIndex = 0;
      break;
    case 'tuesday':
      MATEdayIndex = 1;
      break;
    case 'wednesday':
      MATEdayIndex = 2;
      break;
    case 'thursday':
      MATEdayIndex = 3;
      break;
    case 'friday':
      MATEdayIndex = 4;
      break;
    case 'saturday':
      MATEdayIndex = 5;
      break;
  }

  let MATEhourIndex = null;
  switch (matesHourSelection.value) {
    case '1':
      MATEhourIndex = 0;
      break;
    case '2':
      MATEhourIndex = 1;
      break;
    case '3':
      MATEhourIndex = 2;
      break;
    case '4':
      MATEhourIndex = 3;
      break;
    case '5':
      MATEhourIndex = 4;
      break;
    case '6':
      MATEhourIndex = 5;
      break;
  }
  changeMatesClassInfoLabel(MATEdayIndex, MATEhourIndex);
}

function changeMatesClassInfoLabel(dayIndex, hourIndex) {
  matesRoomInput.value = mates[mateObjIndex].room[dayIndex][hourIndex];
  matesSubjectInput.value = mates[mateObjIndex].subject[dayIndex][hourIndex];
  matesTeacherInput.value = mates[mateObjIndex].teacher[dayIndex][hourIndex];

  MATEpreviousDayState = dayIndex;
  MATEpreviousHourState = hourIndex;
}

// ---------------  SHOWING MATES CLASS DATA TO NOW TAB  ---------------

// Here all the data collected, saved, written and read from previous lines gets displayed to Now tab in the appropriate time

let previousMateSubject = [null, null, null, null, null];
let previousMateRoom = [null, null, null, null, null];

// MATES' DATA
function displayMatesToNowTab(day, hour) {
  // MATES CLASS DATA IN NOW TAB
  const matesRoomDisplay = document.querySelectorAll(".matesRoomDisplay");
  const matesClass = document.querySelectorAll(".matesClass");
  const matesNotes = document.querySelectorAll(".matesNotes");
  const matesSubject = document.querySelectorAll(".matesSubject");
  const matesTeacher = document.querySelectorAll(".matesTeacher");

  const matesNextRoomDisplay = document.querySelectorAll(".matesNextRoom");
  const matesNextSubjectDisplay = document.querySelectorAll(".matesNextSubject");

  if (!usingCustomSearch) {
    // If usingCustomSearch is true than the hour is already compatible with array indexes, otherwise it must be subtracted by the time when school starts defined by the user
    hour -= schoolHourStart;
  }
  let atLeastOneMateBoxIsShown = false;
  if (day != -1) { // day is subtracted by 1 in updateTime function, so sunday corresponds to -1 since week starts on sunday (wtf americans?!)
    for (let i = 0; i < 5; i++) {
      if (!mates[i].room[day][hour] && mates[i].className) {
        matesRoomDisplay[i].textContent = "No lesson";
        matesNextSubjectDisplay[i].textContent = "No lesson";
        matesSubject[i].textContent = "";
        matesNextSubjectDisplay[i].textContent = "";
        matesTeacher[i].textContent = "";
      }
      else {
        matesSubject[i].textContent = mates[i].subject[day][hour];
        matesNextSubjectDisplay[i].textContent = mates[i].subject[day][hour + 1];
        matesRoomDisplay[i].textContent = mates[i].room[day][hour];
        matesNextRoomDisplay[i].textContent = mates[i].room[day][hour + 1];
        matesTeacher[i].textContent = mates[i].teacher[day][hour];
      }
      matesNotes[i].textContent = mates[i].classMatesNames;
      if (!mates[i].room[day][hour + 1]) {
        if (mates[i].room[day][hour]) {
          matesNextSubjectDisplay[i].textContent = "No lesson";
          matesNextRoomDisplay[i].textContent = "";
        }
        else {
          matesNextSubjectDisplay[i].textContent = "No lesson ";
          matesNextRoomDisplay[i].textContent = "";
        }
      }
      if (!mates[i].room[day][hour + 1]) {
        matesNextSubjectDisplay[i].textContent = "No lesson";
        matesNextRoomDisplay[i].textContent = "";
      }
      else if (!mates[i].room[day][hour]) {
        matesNextSubjectDisplay[i].textContent = "No lesson";
        matesNextRoomDisplay[i].textContent = "";
        if (mates[i].room[day][hour + 1]) {
          matesNextSubjectDisplay[i].textContent = mates[i].subject[day][hour + 1];
          matesNextRoomDisplay[i].textContent = mates[i].room[day][hour + 1];
        }
      }
      if (!mates[i].className) {
        matesClass[i].parentElement.parentElement.style.display = "none";
        matesClass[i].textContent = "";
      }
      else {
        atLeastOneMateBoxIsShown = true;
        matesClass[i].parentElement.parentElement.style.display = "block";
        matesClass[i].textContent = mates[i].className;
      }
      if (!atLeastOneMateBoxIsShown) {
        document.getElementById("userMatesSeparator").style.display = "none";
        document.getElementById("secondaryBoxesLabel").style.display = "none";
      }
      else {
        document.getElementById("userMatesSeparator").style.display = "block";
        document.getElementById("secondaryBoxesLabel").style.display = "block";
      }
      if (previousMateSubject[i] != matesSubject[i].textContent) {
        matesSubject[i].style.animation = "none";
        matesTeacher[i].style.animation = "none";
        setTimeout(() => {
          matesSubject[i].style.animation = "0.4s complex ease";
          matesTeacher[i].style.animation = "0.4s complex ease";
        }, 0);
      }

      if (previousMateRoom[i] != matesRoomDisplay[i].textContent) {
        matesRoomDisplay[i].style.animation = "none";
        setTimeout(() => {
          matesRoomDisplay[i].style.animation = "0.4s room ease";
        }, 0);
      }
      previousMateSubject[i] = matesSubject[i].textContent;
      previousMateRoom[i] = matesRoomDisplay[i].textContent;
    }
  }
  else {
    for (let i = 0; i < 5; i++) {
      if (!mates[i].className) {
        matesClass[i].parentElement.parentElement.style.display = "none";
      }
      else {
        matesClass[i].parentElement.parentElement.style.display = "block";
        matesRoomDisplay[i].textContent = "No lesson";
        matesClass[i].textContent = mates[i].className;
        matesNotes[i].textContent = mates[i].classMatesNames;
        matesSubject[i].textContent = "";
        matesTeacher[i].textContent = "";
        atLeastOneMateBoxIsShown = true;
      }
    }
  }
  if (!atLeastOneMateBoxIsShown && showGreetingState == "0" && userClassroomDisplay.textContent == "No lesson") {
    document.getElementById("userMatesSeparator").style.display = "none";
    document.getElementById("secondaryBoxesLabel").style.display = "none";
    document.getElementById("yourClassBox").style.display = "none";
    document.getElementById("letsStartMessage").style.display = "block";
  }
  else {
    document.getElementById("yourClassBox").style.display = "block";
    document.getElementById("letsStartMessage").style.display = "none";
  }
}


// ---------------  RESET LOCALSTORAGE SAVED DATA  ---------------

function deleteLocalStorage() {
  // Ask for confirmation
  if (confirm("Are you sure you want to delete all data and reset the app?")) {
    // If user confirms, delete everything in local storage
    localStorage.clear();
    alert("Local storage cleared successfully!");
    window.location.reload();
  }
}


// ---------------  IMPORT EXPORT FEATURE  ---------------

// IMPORT FEATURE

const importDialogBox = document.getElementById("importDialogBox");

toggleImportTab();
function toggleImportTab() {
  if (importDialogBox.style.display == "none") {
    importDialogBox.style.display = "flex";
    // if the opposite dialog box is shown, hides it
    if (exportDialogBox.style.display == "flex") {
      exportDialogBox.style.display = "none";
    }
  }
  else {
    importDialogBox.style.display = "none";
  }
}

const dataToImportSelection = document.getElementById("dataToImportSelection");
const dataToImportInput = document.getElementById("dataToImportInput");
const submitImportDataBtn = document.getElementById("submitImportDataBtn");

function confirmImportData() {
  const dataToImport = dataToImportSelection.value;
  if (dataToImport != "0") {
    const dataValue = dataToImportInput.value;
    try {
      switch (dataToImport) {
        case 'YourClass':
          user = JSON.parse(dataValue);
          user.fillArrays;
          localStorage.setItem('user_OBJECT', JSON.stringify(user));
          break;
        case 'MatesClass1':
          mates[0] = JSON.parse(dataValue);
          localStorage.setItem('mates_OBJECT', JSON.stringify(mates))
          break;
        case 'MatesClass2':
          mates[1] = JSON.parse(dataValue);
          localStorage.setItem('mates_OBJECT', JSON.stringify(mates))
          break;
        case 'MatesClass3':
          mates[2] = JSON.parse(dataValue);
          localStorage.setItem('mates_OBJECT', JSON.stringify(mates))
          break;
        case 'MatesClass4':
          mates[3] = JSON.parse(dataValue);
          localStorage.setItem('mates_OBJECT', JSON.stringify(mates))
          break;
        case 'MatesClass5':
          mates[4] = JSON.parse(dataValue);
          localStorage.setItem('mates_OBJECT', JSON.stringify(mates))
          break;
      }
    } catch (error) {
      console.error(error);
      window.alert("Invalid data entered. please only import data obtained from the appropriate export function");
      return;
    }
    window.alert("Data imported succesfully!");
    window.location.reload();
  }
}

// EXPORT FEATURE

const exportDialogBox = document.getElementById("exportDialogBox");

toggleExportTab(); // executes once so the next time user clicks the div appears
function toggleExportTab() {
  if (exportDialogBox.style.display == "none") {
    exportDialogBox.style.display = "flex";
    // if the opposite dialog box is shown, hides it
    if (importDialogBox.style.display == "flex") {
      importDialogBox.style.display = "none";
    }
  }
  else {
    exportDialogBox.style.display = "none";
  }
}

const dataToExportSelection = document.getElementById("dataToExportSelection");
dataToExportSelection.addEventListener("change", async () => {
  let dataToExport = null;
  switch (dataToExportSelection.value) {
    case 'YourClass':
      dataToExport = user;
      break;
    case 'MatesClass1':
      dataToExport = mates[0];
      break;
    case 'MatesClass2':
      dataToExport = mates[1];
      break;
    case 'MatesClass3':
      dataToExport = mates[2];
      break;
    case 'MatesClass4':
      dataToExport = mates[3];
      break;
    case 'MatesClass5':
      dataToExport = mates[4];
      break;
  }
  if (dataToExport) {
    try {
      await navigator.share({
        title: "Data from " + dataToExportSelection.value,
        text: JSON.stringify(dataToExport),
      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }
  toggleExportTab();
});


function copyToClipboard(data) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(data)
      .then(() => {
        // Provide feedback to the user indicating successful copy
      })
      .catch((error) => {
        console.error('Unable to copy data to clipboard: ', error);
        // Handle errors, such as permissions or unsupported browsers
      });
  } else {
    // Fallback for browsers that do not support the Clipboard API
    var textarea = document.createElement('textarea');
    textarea.value = data;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    // Provide feedback to the user indicating successful copy
  }
}

// ---------------  DELETE CLASS DATA  ---------------

function deleteUserClass() {
  if (confirm("Are you sure you want to delete your entire timetable?")) {
    user.className = "";
    user.schoolName = "";
    user.name = "";
    for (let i = 0; i < 6; i++) {
      user.room[i] = Array(6).fill("");
      user.subject[i] = Array(6).fill("");
      user.teacher[i] = Array(6).fill("");
      user.complex[i] = Array(6).fill("");
    }
    localStorage.setItem('user_OBJECT', JSON.stringify(user));
    window.alert("Class timetable deleted.");
    window.location.reload();
  }
}

function deleteMatesClass() {
  let selectedClass = document.getElementById("classNumberSelection").value - 1;
  if (confirm("Are you sure you want to delete all timetables about class " + mates[selectedClass].className + "? This operation cannot be reversed.")) {
    mates[selectedClass].className = "";
    mates[selectedClass].classMatesNames = "";
    for (let i = 0; i < 6; i++) {
      mates[selectedClass].room[i] = Array(6).fill("");
      mates[selectedClass].subject[i] = Array(6).fill("");
      mates[selectedClass].teacher[i] = Array(6).fill("");
    }
    localStorage.setItem('mates_OBJECT', JSON.stringify(mates));
    window.alert("Class timetable deleted.");
    window.location.reload();
  }
}


// ---------------  FORCE RELOAD APP  ---------------

function reloadApp() {
  window.location.reload(true);
}


// ---------------  CHECK IF THERE'S A NEW VERSION  ---------------

let deviceVersion;
let latestVersion;
checkVersion();
function checkVersion() {
  if (localStorage.getItem("version")) {
    deviceVersion = localStorage.getItem("version");
    latestVersion = document.getElementById("latestVersionDisplay").textContent;
    if (deviceVersion != latestVersion) {
      console.log("THE APP GOT UPDATED");
    }
    else {
      console.log("NOPE");
    }
  }
  else {
    localStorage.setItem('version', document.getElementById("latestVersionDisplay").textContent);
  }
  localStorage.setItem("version", latestVersion);
  deviceVersion = localStorage.getItem("version");
  console.log(deviceVersion);
}


// ---------------  H1DD3N F34TUR3S  ---------------
// I'll regret this when ill be famous.
// Annoyed cat and rickroll easter eggs were added in April 2024, version 1.70.234

let timesYouAnnoyedTheGitCat = 0;
function annoyGitCat() {
  timesYouAnnoyedTheGitCat += 1;
  if (timesYouAnnoyedTheGitCat % 5 == 0 && timesYouAnnoyedTheGitCat <= 50) {
    const sentenceNum = Math.floor(Math.random() * 20) + 1;
    switch (sentenceNum) {
      case 1:
        window.alert("Stop annoying the git cat. He tryna sleep.");
        break;
      case 2:
        window.alert("Bruh, chill with the cat clicks. It's vibing, not coding.");
        break;
      case 3:
        window.alert("Yo, the git cat is low-key done with your clicks. Give it a break.");
        break;
      case 4:
        window.alert("Bro, you're clicking like it's a TikTok video. Let the cat be.");
        break;
      case 5:
        window.alert("Stop spamming the cat, it's not a Snapchat streak.");
        break;
      case 6:
        window.alert("Dude, the git cat's patience level is reaching '404 not found'.");
        break;
      case 7:
        window.alert("Seriously, stop poking the cat icon. It's not a 'like' button.");
        break;
      case 8:
        window.alert("Hey, can you not? The git cat is about to yeet outta here.");
        break;
      case 9:
        window.alert("The git cat is this close to throwing shade at your clicking spree.");
        break;
      case 10:
        window.alert("Enough with the cat clicks, fam. It's time to give it some space.");
        break;
      case 11:
        window.alert("Chill with the cat clicks, it's disrupting its vibe.");
        break;
      case 12:
        window.alert("Quit bugging the git cat, it's low-key getting triggered.");
        break;
      case 13:
        window.alert("Bruh, stop spamming the cat icon, it's giving major side-eye.");
        break;
      case 14:
        window.alert("The git cat is fed up with your clicks, it's about to throw some shade.");
        break;
      case 15:
        window.alert("Enough with the cat taps, it's about to yeet outta here.");
        break;
      case 16:
        window.alert("Yo, lay off the cat clicks, it's not a fan of your energy.");
        break;
      case 17:
        window.alert("The git cat's patience is wearing thin, it's ready to ghost you.");
        break;
      case 18:
        window.alert("Quit poking the git cat, it's on the verge of a meltdown.");
        break;
      case 19:
        window.alert("Seriously, stop bothering the cat, it's gonna clap back.");
        break;
      case 20:
        window.alert("The git cat's giving you major 'stop it' vibes, take the hint.");
        break;

      default:
        window.alert("Stop annoying the git cat. He tryna sleep.");
        break;
    }
  }
  if (timesYouAnnoyedTheGitCat > 20) {
    document.getElementById("socialIcon").style.scale = "1.1";
  }
  if (timesYouAnnoyedTheGitCat > 30) {
    window.alert("NAH BRO YOU DONE IMMA LEAVE.");
    document.getElementById("socialIcon").style.transition = "2s all ease-in-out";
    document.getElementById("socialIcon").style.transform = "translateY(-100vh)";
    setTimeout(() => {
      document.getElementById("nowTab").style.display = "none";
      document.getElementById("timetablesTab").style.display = "none";
      document.getElementById("settingsTab").style.display = "none";
      document.getElementById("navbar").style.display = "none";
      document.querySelector(".topNotchContainer").style.display = "none";
      setTimeout(() => {
        var div = document.createElement('div');
        // Create div
        div.className = "annoyedCatDiv";
        // Create image element
        var image = document.createElement('img');
        image.src = "/icons/github-mark.svg";
        image.style.width = '25vh';
        image.style.height = '25vh';
        div.appendChild(image);
        // Create text element
        var text = document.createElement('h1');
        text.textContent = "The cat's got beef with you now, no turning back.";
        div.appendChild(text);
        // Append div to document body
        document.body.appendChild(div);
      }, 1500);
    }, 2500);
  }
}


// ---------------  THEMES AND COLOR ACCENTS  ---------------

themeSelection.addEventListener("change", () => {
  activeTheme = themeSelection.value;
  setTheme();
});

function getThemeFromStorage() {
  if (!localStorage.getItem('theme')) {
    return "blueTheme";
  } else {
    return localStorage.getItem('theme');
  }
}

function setTheme() {
  themeSelection.value = activeTheme;
  document.body.classList.remove("DARKblueTheme");
  document.body.classList.remove("LIGHTblueTheme");
  document.body.classList.remove("DARKgreenTheme");
  document.body.classList.remove("LIGHTgreenTheme");
  document.body.classList.remove("DARKorangeTheme");
  document.body.classList.remove("LIGHTorangeTheme");
  document.body.classList.remove("DARKpurpleTheme");
  document.body.classList.remove("LIGHTpurpleTheme");
  document.body.classList.remove("darkModeVariables");
  if (darkModeState == "1") {
    document.body.classList.add("darkModeVariables");
    document.body.classList.add("DARK" + activeTheme);
  }
  else {
    document.body.classList.remove("darkModeVariables");
    document.body.classList.add("LIGHT" + activeTheme);
  }
  localStorage.setItem('theme', activeTheme)
}


// ---------------  CUSTOM/ADVANCED SEARCH FOR TIME AND DATE  ---------------

const changeTimeContainer = document.querySelector(".changeTimeContainer");
const topNotch = document.querySelector(".topNotchContainer");
const topNotchFixed = document.querySelector(".topNotchFixed");

let usingCustomSearch = false;
let customSearchPanelOpened = false;
const daysButtons = document.querySelectorAll(".daysButtons");
const hoursButtons = document.querySelectorAll(".hoursButtons");

let customHour = null;
let customDay = null;
let closeBox = false;

function toggleChangeTime(resetButtons) {
  // Closing box
  if (topNotch.classList.contains("topNotchContainerTALL")) {
    changeTimeContainer.classList.add("changeTimeContainerHidden");
    setTimeout(() => {
      topNotchFixed.classList.remove("topNotchFixedTALL");
      topNotch.classList.remove("topNotchContainerTALL");
      changeTimeContainer.style.display = "none";
    }, 200);
    if (resetButtons) {
      daysButtons.forEach(button => button.classList.remove("timeButtonActive"));
      hoursButtons.forEach(button => button.classList.remove("timeButtonActive"));
    }
    // usingCustomSearch = false;
    customSearchPanelOpened = false;
  }
  // Opening box
  else {
    customSearchPanelOpened = true;
    topNotch.classList.add("topNotchContainerTALL");
    topNotchFixed.classList.add("topNotchFixedTALL");
    setTimeout(() => {
      changeTimeContainer.style.display = "flex";
    }, 200);
    setTimeout(() => {
      changeTimeContainer.classList.remove("changeTimeContainerHidden");
    }, 250);
  }
}

function setCustomDay(event, selectedDay) {
  event.stopPropagation(); // prevents from closing tab when clicking buttons
  if (customSearchPanelOpened) {
    // Clicking on a button already selected closes the box
    if (daysButtons[selectedDay].classList.contains("timeButtonActive")) {
      usingCustomSearch = false;
      customHour = null;
      customDay = null;
      toggleChangeTime(true);
      return;
    }
    daysButtons.forEach(button => button.classList.remove("timeButtonActive"));
    daysButtons[selectedDay].classList.add("timeButtonActive");
    customDay = selectedDay;
    usingCustomSearch = true;
    closeBox = true;
    displayCustomTimes(true);
  }
}
function setCustomHour(event, selectedHour) {
  event.stopPropagation(); // prevents from closing tab when clicking buttons
  if (customSearchPanelOpened) {
    // Clicking on a button already selected closes the box
    if (hoursButtons[selectedHour].classList.contains("timeButtonActive")) {
      usingCustomSearch = false;
      customHour = null;
      customDay = null;
      toggleChangeTime(true);
      return;
    }
    hoursButtons.forEach(button => button.classList.remove("timeButtonActive"));
    hoursButtons[selectedHour].classList.add("timeButtonActive");
    customHour = selectedHour;
    usingCustomSearch = true;
    closeBox = true;
    displayCustomTimes();
  }
}

function displayCustomTimes() {
  if (customDay != null && customHour != null) {
    displayUserToNowTab(customDay, customHour);
    displayMatesToNowTab(customDay, customHour);
    if (closeBox) {
      toggleChangeTime(false);
    }
    closeBox = false;
  }
  else usingCustomSearch = false;
}

// ---------------  DATE AND TIME DISPLAY  ---------------

const dayDisplay = document.getElementById("dayDisplay");
const timeDisplay = document.getElementById("timeDisplay");
let currentDate = new Date();
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

updateDateTime();
function updateDateTime() {
  if (!interruptTimeUpdate) {
    // UPDATING TIME AND DATE
    currentDate = new Date();
    if (!usingCustomSearch) {
      let day = currentDate.getDay();
      let hour = currentDate.getHours();

      // CALLING FUNCTION TO UPDATE DATA CONSTANTLY
      day--; // decrements by one because in date object monday is '1' 
      // day = 3; // debug
      // hour = 7; // debug
      displayUserToNowTab(day, hour);
      displayMatesToNowTab(day, hour);


      const dayOfWeek = days[currentDate.getDay()];
      const dayOfMonth = currentDate.getDate();
      const month = months[currentDate.getMonth()];
      const hours = String(currentDate.getHours()).padStart(2, '0');
      const minutes = String(currentDate.getMinutes()).padStart(2, '0');

      dateText = dayOfWeek + ' ' + dayOfMonth + ' ' + month;
      timeText = hours + ':' + minutes;

      timeDisplay.textContent = timeText;

    } else {
      displayCustomTimes();
      let k = (parseInt(selectedStartTime) + customHour);
      timeDisplay.textContent = days[customDay + 1].slice(0, 3) + " at " + k + ":00";
    }

    dayDisplay.textContent = dateText;
  }
}

// Initial call to update immediately and then every 2 seconds
setInterval(updateDateTime, 500);

