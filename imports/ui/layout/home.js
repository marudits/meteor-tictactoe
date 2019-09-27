import { Template } from 'meteor/templating';

// ui : components
import '../components/buttonInit.js';

// ui : pages
import './home.html';

Template.layoutHome.events({
  'click header h1'() {
    window.location.href = '/';
  }
})