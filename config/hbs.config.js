const hbs = require('hbs');
const path = require('path');

hbs.registerHelper(path.join(__dirname, '../helpers'));
require('../helpers/ad.helpers');
require('../helpers/date.helpers');
require('../helpers/category.helpers');
require('../helpers/pagination.helpers');
require('../helpers/urlPagination.helpers');