const express = require('express')
const app = express()
const port = 3000

PopStateEvent.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // Si ya iniciamos sesión, mostrar bienvenida
    // Si no inicia sesión, redireccionar a /login
  })


app.get('/login', (req, res) => {
    //Mostrar el formulario de Login
  res.render("login");
})

app.post('/login', (req, res) => {
    //Recibir las credenciales e iniciar sesión
    res.send('Hello World!')
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})