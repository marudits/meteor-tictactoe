import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// ui : layout
import '../layout/board.js';
import '../layout/home.js';

// ui : pages
import './main.html';

Template.mainTemplate.helpers({
  isNotLoggedIn() {
    return Meteor.userId() === null
  }
});

Template.mainTemplate.events({
  'click header h1'() {
    window.location.href = '/';
  }
})