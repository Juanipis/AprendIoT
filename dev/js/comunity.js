var userName = "";
var routeImage = "";
var email = ""
var listaAportes = new Array();

const seccion_aportes = document.getElementById("seccion_aportes");


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    userName = user.displayName;
    routeImage = user.photoURL;
    email = user.email;

    document.getElementById("nombre_usuario").innerHTML = userName;
    document.getElementById("foto_perfil").src = routeImage;
    
    // ...
  } else {
    alert("Debes estar logeado para visualizar esta página");
    window.location.replace("https://aprendiot.com/");
  }
});

function busqueda_aportes(nombre_coleccion){
  fs.collection("contenido").doc(nombre_coleccion).collection("aportes").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if (doc.data().user_mail == email) {
          seccion_aportes.innerHTML += `
          <div class="d-flex border border-secondary my-2">
            <img  src="${routeImage}" class="rounded-circle align-self-center" style="width:70px" alt="">
            <div class="d-flex flex-column">
              <p  class="mx-3  mb-0">En la lección ${nombre_coleccion} el ${doc.data().date}</p>
              <p class="mx-3" style="font-size:12px;">${doc.data().contenido}</p>
            </div>
          </div>
          `
        }
    });
  });

}

window.addEventListener('DOMContentLoaded', async (e) =>{
  fs.collection("contenido").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        listaAportes.push(doc.id);
      });
      for(index in listaAportes){
        busqueda_aportes(listaAportes[index]);
      }
    });

    

    

})





