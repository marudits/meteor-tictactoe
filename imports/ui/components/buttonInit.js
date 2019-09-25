import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

// api
import { Boards } from '../../api/boards.js';

// ui : components
import './buttonInit.html';

Template.buttonInit.events({
    'click .button-init'() {
        console.log(`New Game started`);

        Meteor.call('boards.init', 3, (err, res) => {
            if (err) {
                alert(`Something wrong has happened`);
            } else {
                // console.log('res', res);
                window.location.href = `/board/${res}`;
            }
        });
    }
})

