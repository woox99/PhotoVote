<img src="client/src/assets/photovote.png" width="650" alt="Image Description">


## About PhotoVote

Developed this application end-to-end with the JavaScript MERN stack and deployed on AWS. This application allows users to upload photos to be voted on by other users, helping them make decisions based on large group consensus.

## Build Stack
![Static Badge](https://img.shields.io/badge/React%20-%20%23EEAEAE) ![Static Badge](https://img.shields.io/badge/Node.js%20-%20%23EEAEAE)   ![Static Badge](https://img.shields.io/badge/Express%20-%20%23EEAEAE)   ![Static Badge](https://img.shields.io/badge/MongoDB-%20%23EEAEAE) ![Static Badge](https://img.shields.io/badge/Mongoose%20-%20%23EEAEAE)  ![Static Badge](https://img.shields.io/badge/npm%20-%20%23EEAEAE)   ![Static Badge](https://img.shields.io/badge/Multer%20-%20%23EEAEAE) ![Static Badge](https://img.shields.io/badge/AWS%20EC2%20-%20%23EEAEAE)


## Overview

* Leveraged a component-based architecture & virtual DOM with React, combined with Node.js & Express
framework on the backend, & MongoDB for data storage.
* Integrated multiple photo uploads with a single request using multer middleware.
* Utilized JSON Web Token (JWT) for user authentication, authorization, & route protection | Bcrypt hashing &
salting algorithm for robust password security.



## Features Walkthrough

#### Security 🔒

User Authentication & Authorization
* Password ***hashing***
* Registration ***validation***
* Route protection

--- 

#### File Storage

<img src="client/src/assets/create.png" width="450" alt="Image Description">

<br>

* PhotoVote uses Multer middleware integration for handling ***photo uploads*** and storing the photo data as a buffer in memory. 
* ***Upload*** 3 photos smaller than 1MB each.
* Include a ***caption*** so your audience knows the context for which you intend to use the photos for.

---

#### Voting & Karma

<img src="client/src/assets/vote2.png" width="450" alt="Image Description">

<br>

* ***Vote*** on other user's polls to earn ***Karma Points***. You don't need Karma to create a poll, however, users with Karma will always get their polls voted on first. 
* ***Leave feedback*** if you want to pass a message on to the poll's author.

---
#### Results

<img src="client/src/assets/result.png" width="450" alt="Image Description">

<br>

* Once you create an active poll, allow time for the ***results*** and visit back to see which photo received the most votes and read feedback messages the audience sent you. 
* ***Delete*** the poll and create a new one at anytime. 

---
#### Responsiveness

<img src="client/src/assets/mobile.png" width="300" alt="Image Description">

<br>

* ***Responsive*** design to fit any device.

---

<br>

***Adminstrative*** dashboard for approved users to manage user activity.

* Delete inappropriate content
* Ban rule breakers
* Catalog user statistics and activity