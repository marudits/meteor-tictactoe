// startup
import '../imports/startup/client/route.js';
import '../imports/startup/client/accounts-config.js';

// ui
import '../imports/ui/pages/main.js';

Template.registerHelper('and', (a , b) => {
    return a && b;
});

Template.registerHelper('or', (a , b) => {
    return a || b;
});