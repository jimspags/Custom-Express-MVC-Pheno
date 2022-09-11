class Validator {
    constructor() {
        // Flag/Checker if the validates are goods
        this.ok = true;

        // Store all the validated fields and validation messages
        this.validates = {};
    }

    // Main function of the validator and will return an array that contains field name and its validation message
    async Validate(fields, rules) {
        // Reset validates variable
        this.validates = {};

        // Reset to true
        this.ok = true;


        // Loop all the rules added
        for(var i = 0; i < rules.length; i++) {

            // Check all rules then go to its function
            switch(rules[i][0]) {
                // Pass fields object and rules and its fields
                case "required":
                    this.Required(fields, rules[i]);
                    break;
                case "alpha":
                    this.Alpha(fields, rules[i]);
                    break;
                case "match":
                    this.Match(fields, rules[i]);
                    break;
                case "email":
                    this.Email(fields, rules[i]);
                    break;
                case "unique":
                    await this.Unique(fields, rules[i]);
                    break;
            }
        }
        // Return validates wether there is error or none
        // PS: this.ok is the basis of validation result
        return this.validates;
    }

    // Required function to empty if field is empty
    Required(fields, rules) {
        // Loop all fields that labeled as required
        for(var i = 0; i < rules[1].length; i++) {
            // Check if the field is empty
            if(!fields[rules[1][i]].length > 0) {
                // Set object key by variable
                var object = {};

                // Set the field name as key and value as message
                object[rules[1][i]] = (rules[1][i] + " is required!");
                Object.assign(this.validates, object);

                // Check if there is any error
                this.ok = false;
            }
        }
    }

    // Alpha checker
    Alpha(fields, rules) {
        // Loop all fields that labeled as alpha
        for(var i = 0; i < rules[1].length; i++) {
            // Loop each field character
            for(var j = 0; j < fields[rules[1][i]].length; j++) {
                // Check if the field contains letters/string
                if(!(fields[rules[1][i]][j]).match(/[A-Za-z\s]/i)) {
                    // Set object key by variable
                    var object = {};
                    
                    // Set the field name as key and value as message
                    object[rules[1][i]] = (rules[1][i] + " must only contain letters");
                    Object.assign(this.validates, object);
                    this.ok = false;
                    break;
                }
            }
        }
    }

    // Match 2 fields and mainly for password
    Match(fields, rules) {
        if(fields[rules[1][0]] !== fields[rules[1][1]]) {
            // Set object key by variable
            var object = {};

            // Set the field name as key and value as message
            object[rules[1][0]] = (rules[1][0] + " and " + rules[1][1] + " does not matched");
            Object.assign(this.validates, object);
            this.ok = false;

        }
    }

    // Email Validator
    Email(fields, rules) {
        if (!fields[rules[0]].match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            // Set object key by variable
            var object = {};

            // Set the field name as key and value as message
            object[rules[0]] = (rules[0] + " invalid format of Email");
            Object.assign(this.validates, object);
            this.ok = false;
        }
    }
    

    // Duplicate checcker and must use async await
    async Unique(fields, rules) {
        // Get the base model to use as database and execute query
        const BaseModel = require("../models/BaseModel");
        const database = new BaseModel();

        // Loop each field that set as unique
        for(var i = 0; i < rules[1].length; i++) {
            // Create query string
            var query = `SELECT ${rules[1][i][0]} FROM ${rules[1][i][1]} WHERE ${rules[1][i][0]} = '${fields[rules[1][i][0]]}';`;

            // Execute query
            var result = await database.ExecuteQuery(query);
            
            if(result.length > 0) {
                // Set object key by variable
                var object = {};

                // Set the field name as key and value as message
                object[rules[1][i][0]] = (rules[1][i][0] + " already exists");
                Object.assign(this.validates, object);
                this.ok = false;
            }
        }

    }
}

module.exports = new Validator();

// To use the validator || Validator syntax
// SampleValidation(data) {
//     const validator = require("../libraries/Validator");

//     // - Return object error validations if there is any error.
//     // - Validate() function require 2 arguments. First argument get data objects, second argument are the rules
//     var result = validator.Validate(data, [
//         // Required
//         ["required", ["first_name", "last_name", "email", "password", "confirm_password"]],
//         // Alpha with spaces
//         ["alpha", ["first_name", "last_name"]],
//         // Takes two values in 2 array that will check its values if those 2 are equal
//         ["match", ["password", "confirm_password"]],
//         // Validate email
//         ["email", ["email"]],
//         // Check if the input are unique to the existing data on users table. takes 2 values in 1 array. Index 0 is the field and second is the table name and must use async await
//         ["unique", [["email", "users"]]]
//     ]);

//     // Check the validation
//     if(validator.ok === false) {
//         return result;
//     } else {
//         return true;
//     }
// }



