
const content_form = document.getElementById('content-form');
const content_aports = document.getElementById('seccion_aportes');

const saveAport = (content_user, content_user_form) =>
  db.collection('aportes').doc().set({
    name: content_user,
    contenido:  content_user_form
})

const getAport = () => db.collection('aportes').get();

window.addEventListener('DOMContentLoaded', async (e) =>{
  const querySnapshot = await getAport();
  querySnapshot.forEach(doc => {
    console.log(doc.data())
    content_aports.innerHTML += `<div class="d-flex flex-column border mt-3">
    <p class="mx-3  mb-0"> <strong>${doc.data().name}</strong></p>
    <p class="mx-3" style="font-size:15px;">${doc.data().contenido}</p>
    `

  })
})  

content_form.addEventListener('submit', async(e) => {
  e.preventDefault();

  const content_user = "Jonh Doe";
  const content_user_form = content_form['txt-content-form'].value;

  await saveAport(content_user,content_user_form);
  content_form.reset();
})
