const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    telefon:{
        type: String,
        required: [true, 'Telefon Numarası Zorunlu.'],
        min: [10,'Telefon en az 10 karakter olmalı.'],
        max: [10,'Telefon en çok 10 karakter olmalı.'],
        index: true        
    },
    username:{
        type: String,
        required: [true, 'Üye Adi Zorunlu.'],
        min: [3, 'İsim en az 3 karakter olmalı.'],
        max: [30,'İsim en az 30 karakter olmalı.'],
        index: true
    },
    email: { 
        type: String, 
        //required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { 
        type: String, 
        required: [true, 'Şifre zorunlu'],
        min: [6, 'Şifre en az 6 karakter olmalı.'],
        max: [20,'Şifre en az 20 karakter olmalı.']       
    }
    
});

module.exports = mongoose.model('User', userSchema);