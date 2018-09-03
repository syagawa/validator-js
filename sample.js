"use strict";

(function(global){

  var Validator = function(){

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