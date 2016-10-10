/**
* Answer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    // Primitives
    text: {
      type: 'string',
      size: 1000,
      required: true
    },
    correct: {
      type: 'boolean',
    },
    option: {
      type: 'string',
      enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    },

    // Associations
    question: {
      model: 'question'
    }

    // Methods
  }
};
