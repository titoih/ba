const hbs = require('hbs');

hbs.registerHelper("category", function(value) {
  if(value == 'Coches' || value == 'Motos' || value == 'Todoterrenos') {
    return 1;
  }
  else if(value == 'Servicio Doméstico' || value == 'Camareros'
  || value == 'Educación' || value == 'Administrativos' || value == 'Administrativos'
  || value == 'Otros Empleo') {
    return 2;
  }
  else if(value == 'Bricolaje' || value == 'Para Bebés' || value == 'Electrodomésticos' 
  || value == 'Muebles' || value == 'Ropa' || value == 'Otros') {
    return 3;
  }
  else if(value == 'Contactos Mujeres' || value == 'Contactos Gays' || value == 'Contactos Trans' 
  || value == 'Contactos Hombres' || value == 'Otros Contactos') {
    return 4;
  } else {
    console.log('Warning: Not subcategory Id is settle, check category HELPER!'+ ' ' + value)
  }
}); 