"use strict";

(function(global){


  var types = {
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
    isAlphabetNum: {
      validate: function(value){
        return !/[^a-z0-9]/i.test(value);
      },
      instruction: ""
    }
  };


  var Validator = function(){
    this.types = types;

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

  var validator = new Validator();

  var data = {
    first_name: "Tarou",
    last_name: "Tanaka",
    age: 24,
    username: "tt"
  };

  validator.config = {
    first_name: "isNoEmpty",
    age: "isNumber",
    username: "isAlphabetNum"
  };

  validator.validate(data);
  if(validator.hasErrors()){
    console.log(validator.messages.join("\n"));
  }


})(window);