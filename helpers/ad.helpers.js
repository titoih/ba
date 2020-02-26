const hbs = require('hbs');

hbs.registerHelper("select", function(value, options) {
  switch(value) {
    case 'Aston Martin':
      value = '1';
      break;
      case 'Audi':
      value = '2';
      break;
      case 'Austin':
      value = '3';
      break;
      case 'Bentley':
      value = '4';
      break;
      case 'BMW':
      value = '5';
      break;
      case 'Chevrolet':
      value = '6';
      break;
      case 'Chrysler':
      value = '7';
      break;
      case 'Citroen':
      value = '8';
      break;
      case 'Dacia':
      value = '9';
      break;
      case 'Daewoo':
      value = '10';
      break;
      case 'Daihatsu':
      value = '11';
      break;
      case 'Dodge':
      value = '12';
      break;
      case 'Fiat':
      value = '13';
      break;
      case 'Ford':
      value = '14';
      break;
      case 'Galloper':
      value = '15';
      break;
      case 'Honda':
      value = '16';
      break;
      case 'Hummer':
      value = '17';
      break;
      case 'Hyundai':
      value = '18';
      break;
      case 'Infiniti':
      value = '19';
      break;
      case 'Isuzu':
      value = '20';
      break;
      case 'Jaguar':
      value = '21';
      break;
      case 'Jeep':
      value = '22';
      break;
      case 'Kia':
      value = '23';
      break;
      case 'Lada':
      value = '24';
      break;
      case 'Lamborghini':
      value = '25';
      break;
      case 'Lancia':
      value = '26';
      break;
      case 'Land-Rover':
      value = '27';
      break;
      case 'Lexus':
      value = '28';
      break;
      case 'Lotus':
      value = '29';
      break;
      case 'Mazda':
      value = '30';
      break;
      case 'Mercedes-Benz':
      value = '31';
      break;
      case 'MG':
      value = '32';
      break;
      case 'Mini':
      value = '33';
      break;
      case 'Mitsubishi':
      value = '34';
      break;
      case 'Nissan':
      value = '35';
      break;
      case 'Opel':
      value = '36';
      break;
      case 'Peugeot':
      value = '37';
      break;
      case 'Pontiac':
      value = '38';
      break;
      case 'Porsche':
      value = '39';
      break;
      case 'Renault':
      value = '40';
      break;
      case 'Rolls-Royce':
      value = '41';
      break;
      case 'Rover':
      value = '42';
      break;
      case 'Saab':
      value = '43';
      break;
      case 'Seat':
      value = '44';
      break;
      case 'Skoda':
      value = '45';
      break;
      case 'Smart':
      value = '46';
      break;
      case 'Ssangyong':
      value = '47';
      break;
      case 'Subaru':
      value = '48';
      break;
      case 'Suzuki':
      value = '49';
      break;
      case 'Tesla':
      value = '50';
      break;
      case 'Toyota':
      value = '51';
      break;
      case 'Volkswagen':
      value = '52';
      break;
      case 'Volvo':
      value = '53';
      case 'Aprilia':
      value = '100';
      break;
      case 'Benelli':
      value = '101';
      break;
      case 'Beta':
      value = '102';
      break;
      case 'Bimota':
      value = '103';
      break;
      case 'BMW':
      value = '104';
      break;
      case 'Bombardier':
      value = '105';
      break;
      case 'Bultaco':
      value = '106';
      break;
      case 'Cagiva':
      value = '107';
      break;
      case 'Daelim':
      value = '108';
      break;
      case 'Derbi':
      value = '109';
      break;
      case 'Ducati':
      value = '110';
      break;
      case 'Gasgas':
      value = '111';
      break;
      case 'Gilera':
      value = '112';
      break;
      case 'Hanway':
      value = '113';
      break;
      case 'Harley Davidson':
      value = '114';
      break;
      case 'Honda':
      value = '115';
      break;
      case 'Husaberg':
      value = '116';
      break;
      case 'Husqvarna':
      value = '117';
      break;
      case 'Hyosung':
      value = '118';
      break;
      case 'Italjet':
      value = '119';
      break;
      case 'Kawasaki':
      value = '120';
      break;
      case 'Keeway':
      value = '121';
      break;
      case 'KTM':
      value = '122';
      break;
      case 'Kymco':
      value = '123';
      break;
      case 'Lambretta':
      value = '124';
      break;
      case 'Laverda':
      value = '125';
      break;
      case 'Malaguti':
      value = '126';
      break;
      case 'MBK':
      value = '127';
      break;
      case 'Montesa':
      value = '128';
      break;
      case 'Moto Guzzi':
      value = '129';
      break;
      case 'Motor Hispania':
      value = '130';
      break;
      case 'MV Agusta':
      value = '131';
      break;
      case 'Ossa':
      value = '132';
      break;
      case 'Peugeot':
      value = '133';
      break;
      case 'Piaggio':
      value = '134';
      break;
      case 'Puch':
      value = '135';
      break;
      case 'Renault':
      value = '136';
      break;
      case 'Rieju':
      value = '137';
      break;
      case 'Royal Enfield':
      value = '138';
      break;
      case 'Sherco':
      value = '139';
      break;
      case 'Siam':
      value = '140';
      break;
      case 'Suzuki':
      value = '141';
      break;
      case 'Sym':
      value = '142';
      break;
      case 'TGB':
      value = '143';
      break;
      case 'Triumph':
      value = '144';
      break;
      case 'Vespa':
      value = '145';
      break;
      case 'Vespino':
      value = '146';
      break;
      case 'Yamaha':
      value = '147';
      break;
  }
  
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})

hbs.registerHelper("selectFuel", function(value,options) {
  switch(value) {
    case 'Gasolina':
    value = 'Gasolina';
    break;
    case 'Diesel':
    value = 'Diesel';
    break;
    case 'Eléctrico':
    value = 'Eléctrico';
    break;
    case 'Híbrido':
    value = 'Híbrido';
    break;
    case 'GLP':
    value = 'GLP';
    break;


  }
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})

hbs.registerHelper("selectDoors", function(value,options) {
  switch(value) {
    case '5':
    value = '5';
    break;
    case '4':
    value = '4';
    break;
    case '3':
    value = '3';
    break;
    case '2':
    value = '2';
    break;
  }
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})

hbs.registerHelper("selectVendorType", function(value,options) {
  switch(value) {
    case 'Particular':
    value = 'Particular';
    break;
    case 'Profesional':
    value = 'Profesional';
    break;
  }
  return options.fn(this)
    .split('\n')
    .map(function(v) {
      var t = 'value="' + value + '"'
      return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})
