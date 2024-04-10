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
        .register('../service_worker.js')
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
function displayUserToNowTab(day, hour,) {
  // USERS CLASS DATA IN NOW TAB
  const userClassroomDisplay = document.getElementById("userClassroomDisplay");
  const userComplexDisplay = document.getElementById("userComplexDisplay");
  const userSubjectAndTeacher = document.getElementById("userSubjectAndTeacher");
  if (!usingCustomSearch) {
    // If usingCustomSearch is true than the hour is already compatible with array indexes, otherwise it must be subtracted by the time when school starts defined by the user
    hour -= schoolHourStart;
  }
  if (day != -1) { // day is subtracted by 1 in updateTime function, so sunday corresponds to -1 since week starts on sunday (wtf americans?!)
    if (!user.room[day][hour]) userClassroomDisplay.textContent = "No lesson";
    else userClassroomDisplay.textContent = user.room[day][hour];
    if (!user.complex[day][hour]) {
      userComplexDisplay.style.display = "none";
      userComplexDisplay.textContent = " ";
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
      if (user.teacher[day][hour]) userSubjectAndTeacher.textContent += " - " + user.teacher[day][hour];
    }
  }
  else {
    userClassroomDisplay.textContent = "No lesson";
    userComplexDisplay.textContent = "";
    userSubjectAndTeacher.textContent = "";
  }
  if (previousSubject != userSubjectAndTeacher.textContent || previousRoom != userClassroomDisplay.textContent) {
    userClassroomDisplay.style.animation = "none";
    setTimeout(() => {
      userClassroomDisplay.style.animation = "0.4s room ease";
    }, 0);

    userComplexDisplay.style.animation = "none";
    setTimeout(() => {
      userComplexDisplay.style.animation = "0.5s complex ease";
    }, 0);

    userSubjectAndTeacher.style.animation = "none";
    setTimeout(() => {
      userSubjectAndTeacher.style.animation = "0.6s complex ease";
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

  if (!usingCustomSearch) {
    // If usingCustomSearch is true than the hour is already compatible with array indexes, otherwise it must be subtracted by the time when school starts defined by the user
    hour -= schoolHourStart;
  }
  let atLeastOneMateBoxIsShown = false;
  if (day !== -1) { // day is subtracted by 1 in updateTime function, so sunday corresponds to -1 since week starts on sunday (wtf americans?!)
    for (let i = 0; i < 5; i++) {
      if (!mates[i].room[day][hour] && mates[i].className) matesRoomDisplay[i].textContent = "No lesson";
      else matesRoomDisplay[i].textContent = mates[i].room[day][hour];
      matesSubject[i].textContent = mates[i].subject[day][hour];
      matesTeacher[i].textContent = mates[i].teacher[day][hour];
      matesNotes[i].textContent = mates[i].classMatesNames;
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
      if (previousMateSubject[i] != matesSubject[i].textContent || previousMateRoom[i] != matesRoomDisplay[i].textContent) {

        matesRoomDisplay[i].style.animation = "none";
        setTimeout(() => {
          matesRoomDisplay[i].style.animation = "0.4s room ease";
        }, 0);

        matesSubject[i].style.animation = "none";
        setTimeout(() => {
          matesSubject[i].style.animation = "0.6s complex ease";
        }, 0);

        matesNotes[i].style.animation = "none";
        setTimeout(() => {
          matesNotes[i].style.animation = "0.6s complex ease";
        }, 0);

        matesClass[i].style.animation = "none";
        setTimeout(() => {
          matesClass[i].style.animation = "0.6s complex ease";
        }, 0);

        matesTeacher[i].style.animation = "none";
        setTimeout(() => {
          matesTeacher[i].style.animation = "0.6s complex ease";
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
dataToExportSelection.addEventListener("change", () => {
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
    copyToClipboard(JSON.stringify(dataToExport));
    window.alert("Exported data to clipboard successfully");
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
const daysButtons = document.querySelectorAll(".daysButtons");
const hoursButtons = document.querySelectorAll(".hoursButtons");

let customHour = null;
let customDay = null;

function toggleChangeTime() {
  // Closing box
  if (topNotch.classList.contains("topNotchContainerTALL")) {
    changeTimeContainer.classList.add("changeTimeContainerHidden");
    setTimeout(() => {
      topNotchFixed.classList.remove("topNotchFixedTALL");
      topNotch.classList.remove("topNotchContainerTALL");
      changeTimeContainer.style.display = "none";
    }, 200);
    daysButtons.forEach(button => button.classList.remove("timeButtonActive"));
    hoursButtons.forEach(button => button.classList.remove("timeButtonActive"));
    usingCustomSearch = false;
    customHour = null;
    customDay = null;
  }
  // Opening box
  else {
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
  // Clicking on a button already selected closes the box
  if (daysButtons[selectedDay].classList.contains("timeButtonActive")) {
    usingCustomSearch = false;
    toggleChangeTime();
    return;
  }
  daysButtons.forEach(button => button.classList.remove("timeButtonActive"));
  daysButtons[selectedDay].classList.add("timeButtonActive");
  customDay = selectedDay;
  usingCustomSearch = true;
  displayCustomTimes();
}
function setCustomHour(event, selectedHour) {
  event.stopPropagation(); // prevents from closing tab when clicking buttons
  // Clicking on a button already selected closes the box
  if (hoursButtons[selectedHour].classList.contains("timeButtonActive")) {
    usingCustomSearch = false;
    toggleChangeTime();
    return;
  }
  hoursButtons.forEach(button => button.classList.remove("timeButtonActive"));
  hoursButtons[selectedHour].classList.add("timeButtonActive");
  customHour = selectedHour;
  usingCustomSearch = true;
  displayCustomTimes();
}

function displayCustomTimes() {
  if (customDay != null && customHour != null) {
    displayUserToNowTab(customDay, customHour);
    displayMatesToNowTab(customDay, customHour);
  }
  else usingCustomSearch = false;
}



// ---------------  DATE AND TIME DISPLAY  ---------------

const dayDisplay = document.getElementById("dayDisplay");
const timeDisplay = document.getElementById("timeDisplay");
let currentDate = new Date();
updateDateTime();
function updateDateTime() {
  // UPDATING TIME AND DATE
  currentDate = new Date();
  if (!usingCustomSearch) {
    let day = currentDate.getDay();
    let hour = currentDate.getHours();

    // CALLING FUNCTION TO UPDATE DATA CONSTANTLY
    day--; // decrements by one because in date object monday is '1' 
    // day = 0; // debug
    displayUserToNowTab(day, hour);
    displayMatesToNowTab(day, hour);

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek = days[currentDate.getDay()];
    const dayOfMonth = currentDate.getDate();
    const month = months[currentDate.getMonth()];
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');

    dateText = dayOfWeek + ' ' + dayOfMonth + ' ' + month;
    timeText = hours + ':' + minutes;

  } else {
    displayCustomTimes();
  }
  dayDisplay.textContent = dateText;
  timeDisplay.textContent = timeText;
}

// Initial call to update immediately and then every 2 seconds
setInterval(updateDateTime, 500);

