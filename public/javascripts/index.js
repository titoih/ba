const sendEmailList = (id) => {

  event.preventDefault();

    const name = document.getElementById(`nameSendEmail-${id}`);
    const email = document.getElementById(`emailSendEmail-${id}`);
    const phone = document.getElementById(`phoneSendEmail-${id}`);
    const message = document.getElementById(`textAreaSendEmail-${id}`);
    const parent = document.getElementById(`categorySendEmail-${id}`);


    const body = {
      category: parent.value,
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
      ref:id
    }

    // validators
    const phoneValidator = (phone) => {
      const reg = '^((6)|(7))[0-9]{8}$';

      if(phone != ''){
        if(!phone.match(reg)) {
          if(!document.getElementById(`errorPhone-${body.ref}`)){
          const errorPhone = document.createElement('p');
          errorPhone.setAttribute("id", `errorPhone-${body.ref}`);
          errorPhone.innerHTML = 'El teléfono parece incorrecto';
          document.getElementById(`divSendEmail-${body.ref}`).appendChild(errorPhone);
          }
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    }

    cleanForm = () => {
      const inputVariables = [name, email, phone, message];
      return inputVariables.map(variable => variable.value = '')
    }

    const axiosVerify = (body) => {
      axios.post('/send-email', body)
      .then(response => {
        if(response.data.success == `success-${body.ref}`) {
          document.getElementById(`success-${body.ref}`).click();
          cleanForm();
        } else {
            console.log('unsuccess...')
        }
      })
      .catch(error => console.log(error))
    }
    const globalValidator = (body) => {
      if(phoneValidator(body.phone) == true) {
        return axiosVerify(body)
      } else {
        console.log('phone mistake...')
      }
    }
    globalValidator(body);
}

const adminLock = (em) => {
  const lockColor = document.getElementById('spanEmAdLock');
  const wordLock = document.getElementById('isLocked');
  if(lockColor.style['color'] == 'red') {
    lockColor.style['color'] = '';
    wordLock.innerHTML = 'Lock';
  } else {
    lockColor.style['color'] = 'red';
    wordLock.innerHTML = 'Locked'
  }
  axios.post(`admin/lock/${em}`)
  .then( em => console.log(em, 'is em'))
  .catch(error => console.log(error))
}

const adminDelete = (parent, id, ref) => {
  const hideElement = document.getElementById(ref);
  hideElement.style.display = "none";
  axios.post(`admin/borrar/${parent}/${id}`)
  .then(() => {
    console.log('is in index')
  })
  .catch(error => {
  console.log("Error is: ", error);
  })
}

const renovateMyAds = (id,ren,ref) => {

  const rightNow = new Date();
  const renovate = new Date(ren);
  const toRenovate = rightNow.getTime() - renovate.getTime();


  if(toRenovate >= 50400000) {

    axios.post(`usuario/renovar/${id}`)
    .then(success => {
      const idRenovate = 'renovate'+ref;
      document.getElementById(idRenovate).innerHTML = "Renovando...";
      setTimeout(function(){ 
      document.getElementById(idRenovate).innerHTML = "1 seg";
      }, 2000);

      console.log(success)
      console.log('ok')
    })
    .catch(error => {
      console.log(error)
    })
  } else {
    alert('Puedes renovar cada 15 horas, ¡ten paciencia!')
  }
}


