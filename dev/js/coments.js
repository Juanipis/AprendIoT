
const content_form = document.getElementById('content-form');
const content_aports = document.getElementById('seccion_aportes');
var userName = "";
var routeImage = "";
var email = "";
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userName = user.displayName;
    routeImage = user.photoURL;
    email = user.email;
    // ...
  } else {
    alert("Debes estar logeado para comentar");
  }
});


const saveAport = (content_user ,content_user_form) =>
  fs.collection("contenido").doc(nombre_pagina).collection("aportes").add({
    name: content_user,
    contenido:  content_user_form,
    foto: routeImage,
    date : hoy.toLocaleDateString(),
    user_mail : email
});


const getAport = () => fs.collection("contenido").doc(nombre_pagina).collection("aportes").get();

window.addEventListener('DOMContentLoaded', async (e) =>{
  fs.collection("contenido").doc(nombre_pagina).set({
    name: nombre_pagina,
    date: hoy
  })
  const querySnapshot = await getAport();
  querySnapshot.forEach(doc => {
    content_aports.innerHTML += `<div class="d-flex border mt-3 justify-content-around align-items-center">
    <img class="rounded-circle mx-3" style="max-width: 100px; max-height: 100px" src="${doc.data().foto}" >
    <div class="d-flex flex-column border mt-3">
    <p class="mx-3  mb-0"> <strong>${doc.data().name}</strong></p>
    <p class="mx-3" style="font-size:10px;">${doc.data().date}</p>
    <p class="mx-3" style="font-size:15px;">${doc.data().contenido}</p>
    </div>
    `

  })
})  

content_form.addEventListener('submit', async(e) => {
  e.preventDefault();

  const content_user = userName;
  const content_user_form = content_form['txt-content-form'].value;
  
  await saveAport(content_user,content_user_form);
  content_form.reset();
})


