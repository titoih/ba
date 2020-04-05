const hbs = require('hbs');
var paginate = require('./handlebars-paginate/index.js');
hbs.registerHelper('paginate', paginate);
 