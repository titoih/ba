const myfun = (parent, id, ref) => {
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
