'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ShippingzonelocationSchema = new Schema({
    // name: {
    //     type: String,
    //     required: 'Please fill a Shippingzonelocation name',
    // },
    code: {
        type: String,
    },
    type: {
        type: String,
        enum: ["postcode","state","country","continent"],
        default: "country"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Shippingzonelocation", ShippingzonelocationSchema);