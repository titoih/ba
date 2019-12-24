const hbs = require('hbs');

hbs.registerHelper("date", function(value) {
  var currentDate = new Date(); 
  var datetime = "Last Sync: " + currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/" 
                + currentDate.getFullYear() + " @ "  
                + currentDate.getHours() + ":"  
                + currentDate.getMinutes() + ":" 
                + currentDate.getSeconds();

const countTimeNumber = currentDate.getTime() - value.getTime();

const convertMiliseconds = (miliseconds, format, ud) => {
  var days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;
  
  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);
  
  switch(format) {
	case 's':
		return total_seconds + ud;
	case 'm':
		return total_minutes + ud;
	case 'h':
		return total_hours + ud;
	case 'd':
		return days + ud;
	default:
		return { d: days, h: hours, m: minutes, s: seconds };
  }
};
if(countTimeNumber < 60000) {
  return convertMiliseconds(countTimeNumber,'s', ' seg')
}
else if(countTimeNumber < 3600000) {
  return convertMiliseconds(countTimeNumber,'m', ' min')
}
else if(countTimeNumber >= 3600000 && countTimeNumber <= 7140000 && countTimeNumber < 86400000) {
  return convertMiliseconds(countTimeNumber,'h', ' hora')
}
else if(countTimeNumber > 7140000 && countTimeNumber < 86400000) {
  return convertMiliseconds(countTimeNumber,'h', ' horas')
}

else if(countTimeNumber >= 86400000 && countTimeNumber < 172800000) {
  return convertMiliseconds(countTimeNumber,'d', ' día')
}

else if(countTimeNumber > 86400000) {
  return convertMiliseconds(countTimeNumber,'d', ' días')
}

})