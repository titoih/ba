const hbs = require('hbs');

hbs.registerHelper("category", function(value) {
  if(value == 'Servicio Doméstico' || value == 'Camareros') {
    return 2;
  }
  else if(value == 'Coches' || value == 'Motos') {
    return 1;
  } else {
    console.log('Warning: Not subcategory Id is settle, check category HELPER!')
  }
}); 