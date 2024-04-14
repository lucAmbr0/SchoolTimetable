* Worked on this project for: <a href="https://wakatime.com/badge/github/lucAmbr0/SchoolTimetable"><img src="https://wakatime.com/badge/github/lucAmbr0/SchoolTimetable.svg?style=flat" alt="wakatime"></a>
# Introduction
> This project is considered finished. It won't receive regular updates since it's considered stable.
* **School Timetable** aims to provide a **convenient way for students to access their weekly class schedules**. Users can select their class, choose a day of the week, and specify a time slot to view which subjects are scheduled and in which classroom.
* This **web-based** tool streamlines the process of **checking timetables**, making it easier for students to **plan** their **academic activities**.
* This web project offers a **user-friendly interface** for **efficient navigation** and quick access to essential information.

## :ledger: Index

* [About](#beginner-about)
* [Usage](#zap-usage)
  - [Installation](#electric_plug-installation)
* [Development](#wrench-development)
  - [Pre-Requisites](#notebook-pre-requisites)
  - [File Structure](#file_folder-file-structure)
* [Community](#cherry_blossom-community)
  - [Contribution](#fire-contribution)
  - [Branches](#cactus-branches)
  - [Guideline](#exclamation-guideline)  
* [FAQ](#question-faq)
* [Gallery](#camera-gallery)
* [Credit/Acknowledgment](#star2-creditacknowledgment)
* [License](#lock-license)

##  :beginner: About
School Timetable is a project started last year with my personal need to have an all-in-one tool where I can consult my school timetables and quickly find my subjects, my teachers, the classrooms in which I will have lessons and those of my classmates of other classes quickly and in a single step.
<br>
From this need I created an html/css/js page where all the timetables I needed were stored and could be quickly filtered by day, time and class.
<br>
Its limitation was that modifying the code was required in order to use it. This problem led me to start this new project, in which I intend to develop a **user-friendly web app** where **each user can enter their personal data** and have a complete and **personalized experience without having to touch up the code**.

## :zap: Usage
Once you open the app you will find a navigation bar with 3 buttons:
* **Now**: This is the main page of the app, where you can easily and quickly check your school times and up to 5 other classes.
* **Timetables**: In this section you can save and modify your school times and your personal info to be shown in 'Now'
* **Settings**: Settings contains various type of options to customize the app as you'd like: dark mode, color themes, preferences...

###  :electric_plug: Installation
You can get this app in many ways.
* Since this app now follows the guidelines to be installed as PWA (Progressive Web App) you can open this app from the github pages link (on top of this page) and then accept the prompt to install or if it doesn't appear for any reason click the three dots on the top-right of your browser and tap "Install App" to get the WebApp available in your Android smartphone. This way usually offers a better experience. You will automatically get most of the updates remotely (exept changes in manifest.json) and you won't need to be connected to the internet to use it normally.
* Otherwise you can always use the link to connect to github pages. Your data is saved in the browser's local storage, so it will always stay on your phone.
* I also plan to make an actual apk application for android using a PWA builder service in the future.

##  :wrench: Development

### :notebook: Pre-Requisites
There are no special prerequisites for this project other than the following:
* A **chromium browser** like Google Chrome, Brave, Edge, Opera... (Not optimised for Safari and Firefox, which may not be compatible with some CSS rules)
* An internet connection (not always required if you install the WebApp)
* Compatibility with browser's local storage functionality

###  :file_folder: File Structure
I will try to keep the repository structure as clean as possible to make maintenance and community contributions clearer

```
.
│   index.html
│   index.js
│   LICENSE
│   manifest.json
│   README.md
│   service_worker.js
│   style.css
│
├───icons
│       github-mark.svg
│       icon-any-192x192.png
│       icon-any-512x512.png
│       icon-maskable-192x192.png
│       icon-maskable-512x512.png
│
└───screenshots
        desktop-screenshot1.png
        desktop-screenshot2.png
        desktop-screenshot3.png
        desktop-screenshot4.png
        desktop-screenshot5.png
        desktop-screenshot6.png
        mobile-screenshot1.png
        mobile-screenshot2.png
        mobile-screenshot3.png
        mobile-screenshot4.png
        mobile-screenshot5.png
        mobile-screenshot6.png
        splashscreen.png
```

## :cherry_blossom: Community

Teamwork is important! If you want to contribute and help in this project, fixing bugs, adding features or changing the look and feel of the page feel free to contribute!

 ###  :fire: Contribution

Feel free to contribute as much as you'd like!

 1. **Report a bug** <br>
 If you think you have encountered a bug, and I should know about it, feel free to report it and I will take care of it.

 2. **Request a feature** <br>
 You can also request for a feature and if it will viable, it will be picked for development.  

 3. **Create a pull request** <br>
 It can't get better then this, your pull request will be appreciated by the community. You can get started by picking up any open issues and make a pull request.

 > If you are new to open-source, make sure to check read more about it [here](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) and learn more about creating a pull request [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).


 ### :cactus: Branches

1. **`stage`** is the development branch.

2. **`master`** is the production branch.

3. No other permanent branches should be created in the main repository, you can create feature branches but they should get merged with the master.

**Steps to work with feature branch**

1. To start working on a new feature, create a new branch prefixed with `feat` and followed by feature name. (ie. `feat-FEATURE-NAME`)
2. Once you are done with your changes, you can raise PR.

### :exclamation: Guideline
There are no particular guidelines to follow to contribute to the project.
<br>
Feel free to change whatever you want however you want, but try to keep the code tidy and readable.


## :question: FAQ
* **What's this thing?** <br>
This is School Timetable, a web app created to help you organize your school timetable

* **What can I do with it?** <br>
If you are in a large school, with numerous classes and need a quick tool to organize your studies, or know where a lesson will take place or where your classmates are, this tool is perfect for you!

* **How do I configure this?** <br>
The app is very user-friendly, navigate to the timetables screen, enter the class, the complete weekly timetables of subjects, teachers and classrooms and quickly find what you need!
Additionally, since v1.53.187 you can export and import data in a second, if you'd ever need to change device you'll be ready to go in a moment!

* **Can I contribute to this?** <br>
Yes, absolutely! Contributions are always well-accepted! To know more, go to the contribution section of this readme

* **How are you?** <br>
It's a little cold at home now, I think I'll put on a sweater. Thanks for asking <3

##  :camera: Gallery
<div style="display: flex">
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot1.png?raw=true" width="200" />
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot2.png?raw=true" width="200" />
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/mobile-screenshot3.png?raw=true" width="200" />
</div>
<div style="display: flex">
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/desktop-screenshot4.png?raw=true" width="600" />
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/desktop-screenshot5.png?raw=true" width="600" />
<img src="https://github.com/lucAmbr0/SchoolTimetable/blob/master/screenshots/desktop-screenshot6.png?raw=true" width="600" />
</div>


## :star2: Credit/Acknowledgment
I'm the only one that worked on this as of now :')

##  :lock: License
This project is licensed with MIT License. You can practically do anything with this code and also reuse it for commerical purposes. Read the full License file for more specific details.
