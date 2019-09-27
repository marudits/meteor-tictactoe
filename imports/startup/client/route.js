FlowRouter.route('/', {
    name: 'Home',
    action() {
        BlazeLayout.render('mainTemplate', { main: 'layoutHome' });
    }
});

FlowRouter.route('/board/:board_id', {
    name: 'Boards.show',
    action() {
        BlazeLayout.render('mainTemplate', { main: 'layoutBoard' });
    }
});