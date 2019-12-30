const hbs = require('hbs');
const path = require('path');

hbs.registerHelper(path.join(__dirname, '../helpers'));
require('../helpers/ad.helpers');
require('../helpers/date.helpers');

// hbs.registerPartials(path.join(__dirname, '../views/partials'));
// require('../helpers/ad.helpers');
// require('../helpers/date.helpers');
// require('../helpers/image.helpers');