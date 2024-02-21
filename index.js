/* 
    School Timetable - JavaScript Functions
    What're you doing here?
*/

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
  tab = 1;
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
    navbarAction(2);
  }, 600)
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
    if (!localStorage.getItem('user_roomARR')) this.fillArrays();
  }

  fillArrays() {
    // Define the size of the arrays
    const rows = 6;
    const columns = 6;

    // Fill each array with empty strings
    for (let i = 0; i < rows; i++) {
      this.room[i] = Array(columns).fill("");
      this.complex[i] = Array(columns).fill("");
      this.subject[i] = Array(columns).fill("");
      this.teacher[i] = Array(columns).fill("");
    }
  }
}

let user = new UserInfo("", "", "");

getUserInfoFromLocalStorage();
function getUserInfoFromLocalStorage() {
  // If it finds the key "user_name" in user's browser, it reads the data and writes it to the variables
  if (localStorage.getItem('user_name')) {
    user.name = localStorage.getItem('user_name');
    user.className = localStorage.getItem('user_className');
    user.schoolName = localStorage.getItem('user_schoolName');
    displayUserInfo();
  }
}

function updateUserInfo() {
  // When updateUserInfo is triggered the user class gets updated only if the input fields are not empty
  localStorage.setItem('isThereData', "HEYYY I'M HEREEE");
  user.name = userNameInput.value;
  localStorage.setItem('user_name', user.name);
  user.className = userClassInput.value;
  localStorage.setItem('user_className', user.className);
  user.schoolName = userSchoolNameInput.value;
  localStorage.setItem('user_schoolName', user.schoolName);

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
  localStorage.setItem('isThereData', "HEYYY I'M HEREEE");
  localStorage.setItem('user_roomARR', JSON.stringify(user.room));
  localStorage.setItem('user_complexARR', JSON.stringify(user.complex));
  localStorage.setItem('user_subjectARR', JSON.stringify(user.subject));
  localStorage.setItem('user_teacherARR', JSON.stringify(user.teacher));
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
  if (localStorage.getItem('user_roomARR')) {
    user.room = JSON.parse(localStorage.getItem('user_roomARR'));
    user.complex = JSON.parse(localStorage.getItem('user_complexARR'));
    user.subject = JSON.parse(localStorage.getItem('user_subjectARR'));
    user.teacher = JSON.parse(localStorage.getItem('user_teacherARR'));
    displayUserClassInfo();
  }
}

// ---------------  SHOWING USER CLASS DATA TO NOW TAB  ---------------

// Here all the data collected, saved, written and read from previous lines gets displayed to Now tab in the appropriate time

// USER'S DATA
function displayUserToNowTab(day, hour) {
  // USERS CLASS DATA IN NOW TAB
  const userClassroomDisplay = document.getElementById("userClassroomDisplay");
  const userComplexDisplay = document.getElementById("userComplexDisplay");
  const userSubjectAndTeacher = document.getElementById("userSubjectAndTeacher");
  let schoolHourStart = 8; // standard hour when school starts is 8
  hour -= schoolHourStart; // >>> DEBUG
  if (day !== 7) {
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
    if (!localStorage.getItem('mates_roomARR')) this.fillArrays();
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

// MATES' DATA
function displayMatesToNowTab(day, hour) {
  // MATES CLASS DATA IN NOW TAB
  const matesRoomDisplay = document.querySelectorAll(".matesRoomDisplay");
  const matesClass = document.querySelectorAll(".matesClass");
  const matesNotes = document.querySelectorAll(".matesNotes");
  const matesSubject = document.querySelectorAll(".matesSubject");
  const matesTeacher = document.querySelectorAll(".matesTeacher");

  let schoolHourStart = 8; // standard hour when school starts is 8
  hour -= schoolHourStart;
  if (day != 7) {
    let atLeastOneMateBoxIsShown = false;
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
    }
    if (!atLeastOneMateBoxIsShown && showGreetingState == "0" && userClassroomDisplay.textContent == "No lesson") {
      document.getElementById("yourClassBox").style.display = "none";
      document.getElementById("letsStartMessage").style.display = "block";
    }
    else {
      document.getElementById("yourClassBox").style.display = "block";
      document.getElementById("letsStartMessage").style.display = "none";
    }
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
  document.body.classList.remove("darkModeVariables");
  if (darkModeState == "1") {
    document.body.classList.add("darkModeVariables");
    document.body.classList.add("DARK"+activeTheme);    
  }
  else {
    document.body.classList.remove("darkModeVariables");
    document.body.classList.add("LIGHT"+activeTheme);    
  }
  localStorage.setItem('theme',activeTheme)
}


// ---------------  DATE AND TIME DISPLAY  ---------------

const dayDisplay = document.getElementById("dayDisplay");
const timeDisplay = document.getElementById("timeDisplay");
let currentDate = new Date();
updateDateTime();
function updateDateTime() {
  // UPDATING TIME AND DATE
  currentDate = new Date();
  let day = currentDate.getDay();
  let hour = currentDate.getHours();

  // CALLING FUNCTION TO UPDATE DATA CONSTANTLY
  day--; // decrements by one because in date object monday is '1' 

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

  dayDisplay.textContent = dateText;
  timeDisplay.textContent = timeText;
}

// Initial call to update immediately and then every 2 seconds
setInterval(updateDateTime, 500);

