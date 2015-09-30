/**
* Entry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string'
    },
    slug: {
      type: 'string'
    },
    featured_image: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    filename: {
      type: 'string'
    },
    content: {
      type: 'text'
    },
    excerpt: {
      type: 'text'
    }
  }
};

