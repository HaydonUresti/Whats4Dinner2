# Overview

Whats4Dinner2 is a second version of my Whats4Dinner app. This version uses cloud storage through Google Firebase to store data and authenticate users.
The app itself is a meal note app that allows a user to enter a meal for each day of the week as well as any notes they may want to save about the meal.

My purpose in creating this app was to improve upon my first version while learning about cloud databases and more about databases in general.

[Whats4Dinner2: Demo](https://youtu.be/l6siuqXVzuA)

# Cloud Database

Google Firebase

The main structure of the database in a separate collection and document for each day and field. This secures data by making in impossible for differing days to be mixed or for repeated values to be allowed.

# Development Environment

Whats4Dinner2 was created in Visual Studio Code using npm and expo to manage packages and run the app.

It was Written in JavaScript using multiple libraries including:

- React Native
- Node.js
- Firebase
- react-navigation
- and react-modal

# Useful Websites

- [Google Cloud](https://cloud.google.com/firestore/docs/query-data/get-data)
- [React Native Firebase](https://rnfirebase.io/firestore/usage)
- [Made With Matt](https://www.youtube.com/watch?v=ql4J6SpLXZA&t=1065s)

# Future Work

- Allow each user to have their own files, not connected to others
- Improve database security
- Improve error messages
