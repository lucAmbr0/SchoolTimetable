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

// ---------------  PERSONAL DATA DISPLAY  ---------------

// Here are all the instructions and variables that write data to the frontend html
// Now Tab variables that contain user's info
const nameDisplay = document.getElementById("nameDisplay");
const classDisplay = document.getElementById("classDisplay");
const schoolDisplay = document.getElementById("schoolDisplay");

function displayUserInfo() {
  // Triggers if there is saved data and fills all html fields that already have data

  // Writes data in Now Tab
  nameDisplay.textContent = ", "+user.name;
  classDisplay.textContent = " - "+user.className;
  schoolDisplay.textContent = user.schoolName;

  // Writes data to input fields in settings tab
  userNameInput.value = user.name;
  userClassInput.value = user.className;
  userSchoolNameInput.value = user.schoolName;


}

// ---------------  PERSONAL DATA INPUT  ---------------

// JavaScript variables that contain user's info
let userDaySelected;
let userHourSelected;
class UserInfo {
  constructor(name, className, schoolName) {
    this.name = name;
    this.className = className;
    this.schoolName = schoolName;
    this.room = [[]];
    this.complex = [[]];
    this.subject = [[]];
    this.teacher = [[]];
  }
}

let user = new UserInfo("YourName", "2CL", "SchoolName - AndCityMaybe");
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
const userRoomInput = document.getElementById("userRoomInput");
const userComplexInput = document.getElementById("userComplexInput");
const userSubjectInput = document.getElementById("userSubjectInput");
const userTeacherInput = document.getElementById("userTeacherInput");
const submitUserClassTimesBtn = document.getElementById("submitUserClassTimesBtn");

getUserInfoFromLocalStorage();
function getUserInfoFromLocalStorage() {
  // If it finds a key "isThereData" in user's browser, it reads the data and writes it to the variables
  if (localStorage.getItem('isThereData')) {
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