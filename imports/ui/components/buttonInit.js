import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// ui : components
import './buttonInit.html';

Template.buttonInit.events({
    'click .button-init'() {
        Meteor.call('boards.init', 3, (err, res) => {
            if (err) {
                alert(`Something wrong has happened`);
            } else {
                window.location.href = `/board/${res}`;
            }
        });
    }
})

