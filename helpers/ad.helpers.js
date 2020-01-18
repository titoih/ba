const hbs = require('hbs');

hbs.registerHelper("select", function(value, options) {
  if(value == 'Audi') {
    value = 1;
  }
  else if(value == 'BMW') {
    value = 2;
  }
  else if (value == 'Citroen') {
    value = 3;
  }
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})