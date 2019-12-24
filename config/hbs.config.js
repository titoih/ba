const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));
require('../helpers/ad.helpers');
require('../helpers/date.helpers');