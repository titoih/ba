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
