const hbs = require('hbs');
// #select => post, search category in list.hbs not in switch
// switch just for brands

hbs.registerHelper("brandCategory", function(value) {
  const brandCar = `<option value="">Marca</option>
  <option value="1">Aston Martin</option>
  <option value="2">Audi</option>
  <option value="3">Austin</option>
  <option value="4">Bentley</option>
  <option value="5">BMW</option>
  <option value="6">Chevrolet</option>
  <option value="7">Chrysler</option>
  <option value="8">Citroen</option>
  <option value="9">Dacia</option>
  <option value="10">Daewoo</option>
  <option value="11">Daihatsu</option>
  <option value="12">Dodge</option>
  <option value="13">Fiat</option>
  <option value="14">Ford</option>
  <option value="15">Galloper</option>
  <option value="16">Honda</option>
  <option value="17">Hummer</option>
  <option value="18">Hyundai</option>
  <option value="19">Infiniti</option>
  <option value="20">Isuzu</option>
  <option value="21">Jaguar</option>
  <option value="22">Jeep</option>
  <option value="23">Kia</option>
  <option value="24">Lada</option>
  <option value="25">Lamborghini</option>
  <option value="26">Lancia</option>
  <option value="27">Land-Rover</option>
  <option value="28">Lexus</option>
  <option value="29">Lotus</option>
  <option value="30">Mazda</option>
  <option value="31">Mercedes-Benz</option>
  <option value="32">MG</option>
  <option value="33">Mini</option>
  <option value="34">Mitsubishi</option>
  <option value="35">Nissan</option>
  <option value="36">Opel</option>
  <option value="37">Peugeot</option>
  <option value="38">Pontiac</option>
  <option value="39">Porsche</option>
  <option value="40">Renault</option>
  <option value="42">Rover</option>
  <option value="43">Saab</option>
  <option value="44">Seat</option>
  <option value="45">Skoda</option>
  <option value="46">Smart</option>
  <option value="47">Ssangyong</option>
  <option value="48">Subaru</option>
  <option value="49">Suzuki</option>
  <option value="50">Tesla</option>
  <option value="51">Toyota</option>
  <option value="52">Volkswagen</option>
  <option value="53">Volvo</option>`;

  const brandMotorbike = `<option value="">Marca</option>
  <option value="100">Aprilia</option>
  <option value="101">Benelli</option>
  <option value="102">Beta</option>
  <option value="103">Bimota</option>
  <option value="104">BMW</option>
  <option value="106">Bultaco</option>
  <option value="107">Cagiva</option>
  <option value="108">Daelim</option>
  <option value="109">Derbi</option>
  <option value="110">Ducati</option>
  <option value="111">Gasgas</option>
  <option value="112">Gilera</option>
  <option value="113">Hanway</option>
  <option value="114">Harley Davidson</option>
  <option value="115">Honda</option>
  <option value="116">Husaberg</option>
  <option value="117">Husqvarna</option>
  <option value="118">Hyosung</option>
  <option value="119">Italjet</option>
  <option value="120">Kawasaki</option>
  <option value="121">Keeway</option>
  <option value="122">KTM</option>
  <option value="123">Kymco</option>
  <option value="124">Lambretta</option>
  <option value="125">Laverda</option>
  <option value="126">Malaguti</option>
  <option value="127">MBK</option>
  <option value="128">Montesa</option>
  <option value="129">Moto Guzzi</option>
  <option value="130">Motor Hispania</option>
  <option value="131">MV Agusta</option>
  <option value="132">Ossa</option>
  <option value="133">Peugeot</option>
  <option value="134">Piaggio</option>
  <option value="135">Puch</option>
  <option value="136">Renault</option>
  <option value="137">Rieju</option>
  <option value="138">Royal Enfield</option>
  <option value="139">Sherco</option>
  <option value="140">Siam</option>
  <option value="141">Suzuki</option>
  <option value="142">Sym</option>
  <option value="143">TGB</option>
  <option value="144">Triumph</option>
  <option value="145">Vespa</option>
  <option value="146">Vespino</option>
  <option value="147">Yamaha</option>`

  switch(value) {
    case '1':
    return brandCar;
    case '2':
    return brandMotorbike;
    case '3':
    return brandCar;
  }
  
})

hbs.registerHelper("selectBrandMotor", function(value, category, options) {

if(category == 'Motos') {
  switch(value) {
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
} else {
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
  }
}

return options.fn(this)
.split('\n')
.map(function(v) {
  var t = 'value="' + value + '"'
  return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
})
.join('\n')
})

hbs.registerHelper("select", function(value, options) {
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

hbs.registerHelper("selectVendorType", function(value, options) {
  switch(value) {
    case "Particular":
    value = "Particular";
    break;
    case "Profesional":
    value = "Profesional";
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

hbs.registerHelper("selectVendor", function(value, options) {
  switch(value) {
    case "OFERTA":
    value = "OFERTA";
    break;
    case "DEMANDA":
    value = "DEMANDA";
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

//title UPPERCASE

hbs.registerHelper("toUpperCase", function(brand, carmodel, cv, doors, title) {
  if(title) {
    return title.toUpperCase()
  } else {
    if(cv && doors) {
      return brand.toUpperCase() + ' - ' + carmodel.toUpperCase() + ' - '  + cv.toUpperCase() + ' - ' + doors + 'P';
    }
    else if(!cv && doors){
      return brand.toUpperCase() + ' - ' + carmodel.toUpperCase() + ' - '  + doors + 'P';
    } 
    else if(cv && !doors){
      return brand.toUpperCase() + ' - ' + carmodel.toUpperCase() + ' - '  + cv.toUpperCase();
    } 
    else if(!cv && !doors) {
      return brand.toUpperCase() + ' - ' + carmodel.toUpperCase()
    } else {'here is the issue #issuehelperUpperCase'}
  }
})
