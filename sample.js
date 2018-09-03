"use strict";

(function(global){

  var Validator = function(){
    this.types = {};

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
        if(!type){
          continue;
        }
        if(!checker){
          throw {
            name: "ValidationError",
            message: "No handler to validate type" + type
          };
        }

        result = checker.validate(data[key]);
        if(!result){
          msg = "Invalid value for *" + key + "*, " + checker.instruction;
          this.messages.push(msg);
        }
      }
      return this.hasErrors();
    };

    this.hasErrors = function(){
      return this.messages.length !== 0;
    };

  };

  Validator.prototype.isNoEmpty = {
    validate: function(value){
      return value !== "";
    },
    instruction: ""
  };

  Validator.prototype.isNumber = {
    validate: function(value){
      return !isNaN(value);
    },
    instruction: ""
  };

  Validator.prototype.isAlphabetNum = {
    validate: function(value){
      return !/[^a-z0-9]/i.test(value);
    },
    instruction: ""
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