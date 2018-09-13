"use strict";

(function(global){

  var Validator = function(){
    this.types = {
      isNoEmpty: {
        validate: function(value){
          return value !== "";
        },
        instruction: ""
      },
      isNumber: {
        validate: function(value){
          return !isNaN(value);
        },
        instruction: ""
      },
      isAlphabet: {
        validate: function(value){
          return !/[^a-z]/i.test(value);
        },
        instruction: ""
      },
      isAlphabetCap: {
        validate: function(value){
          return !/[^A-Z]/.test(value);
        },
        instruction: ""
      },
      isAlphabetLow: {
        validate: function(value){
          return !/[^a-z]/.test(value);
        },
        instruction: ""
      },
      isAlphabetNum: {
        validate: function(value){
          return !/[^a-z0-9]/i.test(value);
        },
        instruction: ""
      },
      isHyphen: {
        validate: function(value){
          return !/[^\-]/.test(value);
        },
        instruction: ""
      },
      isUnderscore: {
        validate: function(value){
          return !/[^\_]/.test(value);
        },
        instruction: ""
      },
      isAlphabetLowNumHyphenUnderscore: {
        validate: function(value){
          return !/[^a-z|0-9|\-|\_]/.test(value);
        },
        instruction: ""
      }

    };

    this.messages = [];

    this.config = {};

    this.validate = function(data){
      var msg,
          type,
          checker,
          result;
      this.messages = [];
      for(var key in data){
        type = this.config[key];
        checker = this.types[type];
        console.info(type);
        console.info(checker);
        if(!type){
          continue;
        }
        if(!checker){
          throw {
            name: "ValidationError",
            message: "No handler, " + type
          };
        }

        result = checker.validate(data[key]);
        if(!result){
          msg = key + " is Invalid value. " + checker.instruction;
          this.messages.push(msg);
        }
      }
      return this.hasErrors();
    };

    this.hasErrors = function(){
      return this.messages.length !== 0;
    };

  };

  var config = {
    first_name: "isNoEmpty",
    age: "isNumber",
    username: "isAlphabetNum"
  };

  var validator1 = new Validator();

  var right_data = {
    first_name: "Tarou",
    last_name: "Tanaka",
    age: 24,
    username: "tt"
  };

  validator1.config = config;

  validator1.validate(right_data);
  if(validator1.hasErrors()){
    console.log(validator1.messages.join("\n"));
  }

  var validator2 = new Validator();

  var wrong_data = {
    first_name: "",
    last_name: "",
    age: "aaaaa",
    username: "たなか"
  };

  validator2.config = config;

  validator2.validate(wrong_data);
  if(validator2.hasErrors()){
    console.log(validator2.messages.join("\n"));
  }


})(window);