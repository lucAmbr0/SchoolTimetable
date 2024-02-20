/* 
    School Timetable - JavaScript Functions
    What're you doing here?
*/

// ---------------  NAVBAR  ---------------

let currentTab = null;
const navbar = document.getElementById("navbar");
const navbarBtn = document.querySelectorAll(".navbarBtn");
const navbarIcon = document.querySelectorAll(".navbarIcon");
const navbarLabel = document.querySelectorAll(".navbarLabel");
const appTabs = document.querySelectorAll(".appTabs");

appTabs.forEach(appTab => appTab.classList.remove("appTabsShown"));
appTabs.forEach(appTab => appTab.classList.add("appTabsHidden"));

navbarAction(1);

function navbarAction(tab) {
  if (currentTab !== tab) {
    currentTab = tab;
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
  nameDisplay.textContent = ", " + user.name;
  classDisplay.textContent = " - " + user.className;
  schoolDisplay.textContent = user.schoolName;

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
    if (!localStorage.getItem('user_room')) this.fillArrays();
  }

  fillArrays() {
    // Define the size of the arrays (adjust as needed)
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

let user = new UserInfo("YourName", "2CL", "SchoolName - AndCityMaybe");

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
  if (userNameInput.value) {
    user.name = userNameInput.value;
    localStorage.setItem('user_name', user.name);
  }
  if (userClassInput.value) {
    user.className = userClassInput.value;
    localStorage.setItem('user_className', user.className);
  }
  if (userSchoolNameInput.value) {
    user.schoolName = userSchoolNameInput.value;
    localStorage.setItem('user_schoolName', user.schoolName);
  }

  // If there's even one of these items in localStorage, displays a message to tell user that data is saved
  if (localStorage.getItem('user_name') || localStorage.getItem('user_className') || localStorage.getItem('user_schoolName')) {
    window.alert("Saved data successfully!");
    displayUserInfo();
  }
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
  displayUserToNowTab();
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
  if (localStorage.getItem('isThereData')) {
    user.room = JSON.parse(localStorage.getItem('user_roomARR'));
    user.complex = JSON.parse(localStorage.getItem('user_complexARR'));
    user.subject = JSON.parse(localStorage.getItem('user_subjectARR'));
    user.teacher = JSON.parse(localStorage.getItem('user_teacherARR'));
    displayUserClassInfo();
    displayUserToNowTab();
  }
}

// ---------------  SHOWING USER CLASS DATA TO NOW TAB  ---------------

// Here all the data collected, saved, written and read from previous lines gets displayed to Now tab in the appropriate time

// USER'S DATA
displayUserToNowTab();
function displayUserToNowTab() {
  // USERS CLASS DATA IN NOW TAB
  const userClassroomDisplay = document.getElementById("userClassroomDisplay");
  const userComplexDisplay = document.getElementById("userComplexDisplay");
  const userSubjectAndTeacher = document.getElementById("userSubjectAndTeacher");
  const date = new Date(); // object containing time info
  let schoolHourStart = 8; // standard hour when school starts is 8
  // const hour = date.getHours() - schoolHourStart;
  // const day = date.getDay() - 1; // minus one because date object sets monday as 1, while the array starts from position 0
  const day = 0; // >>> DEBUG
  const hour = 8 - schoolHourStart; // >>> DEBUG
  if (day != 7) {
    userClassroomDisplay.textContent = user.room[day][hour];
    userComplexDisplay.textContent = user.complex[day][hour];
    if (user.subject[day][hour]) {
      userSubjectAndTeacher.textContent = user.subject[day][hour] + " - " + user.teacher[day][hour];
    } else {
      userSubjectAndTeacher.textContent = "There's no data here :(";
    }
  }
}


// ---------------  DARK MODE [WORK IN PROGRESS]  ---------------

// trigger();

// function trigger() {
//   document.body.classList.toggle("darkModeVariables");
// }
