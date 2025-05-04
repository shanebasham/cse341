const express = require('express');
const mongoose = require('mongoose');
const User = require('../db/user');
const route = express.Router();

route.post('/', async (req, res) => {
    const { firstName , lastName , email ,  favoriteColor , dateOfBirth } = req.body;
    let user = {};
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.favoriteColor = favoriteColor;
    user.dateOfBirth = dateOfBirth;
    let newUser = new User(user);
    await newUser.save();
    res.json(newUser);
    });

// route.post('/', async (req, res) => {
//     const { name, email, favoriteColor, dateOfBirth } = req.body;
//     let user = {
//     name,
//     email,
//     favoriteColor,
//     dateOfBirth
//     };
//     user.name = name;
//     let newUser = new User(user);
//     await newUser.save();
//     res.json(newUser);
//     // res.status(201).json({ message: 'User created successfully', user: newUser });
//     });

module.exports = route;
