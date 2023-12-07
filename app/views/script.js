document.addEventListener('DOMContentLoaded', function () {
    const loginButton = document.getElementById('loginbutton');
    const datosButton = document.getElementById('datos');
    var token ;
    var sesion = 0;
  
  
    loginButton.addEventListener('click', handleLogin);
    datosButton.addEventListener('click', mostrarDatos);
  
    async function handleLogin() {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
     
    
      const resultado = await loginUser(username, password);
  
      token = resultado.token;
      rol = resultado.rol;
      if (token) {
          
        if(rol=="ROLE_USER"){
          console.log('Token login obtenido :', token);
          console.log('rol obtenido:'+rol);
          sesion = 1;
        var form = document.getElementById("formularioindex");
        var et = document.getElementById("texts");
        et.textContent =" Bienvenido "+username;
        form.style.display ="none";
        }else if(rol=="ROLE_ADMIN"){
          console.log('rol obtenido'+rol);
          var form = document.getElementById("formularioindex");
        var et = document.getElementById("texts");
        et.textContent =" Bienvenido "+username;
        form.style.display ="none";
        sesion=2;
          
        }
       
      } else {
        console.error('Error al obtener el token');
      }
    }
  
    
  
    async function loginUser(username, password) {
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return { token: data.accessToken, rol : data.roles};
      }
  
      console.error('Error en la solicitud POST:', response.statusText);
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error.message);
    }
  
    return null;
  }
  
    async function mostrarDatos()  {
        if(sesion==1){
          const response = await handleGETClick(token);
          if (Array.isArray(response) && response.length > 0) {
            let alertusuario = "Usuarios:\n";
         response.forEach((obj, index) => {
      const username = obj.username;
      alertusuario += `Usuario ${index + 1}: ${username}\n`;
    });
    alert(alertusuario);
  
    
  }   else {
        alert('La respuesta no contiene datos o no es un array válido.');
            }
            }else if(sesion==2){
              console.log("el token es"+token);
              const response = await handleGETClickAdmin(token);
              console.log("Esta respuesta es" +response);
              
              if (Array.isArray(response) && response.length > 0) {
            let alertusuario = "Usuarios:\n";
         response.forEach((obj, index) => {
      const username = obj.username;
      const password = obj.password;
      alertusuario += `Usuario ${index + 1}: ${username} ${password}\n`;
    });
    alert(alertusuario);
  
    
  }   else {
        alert('La respuesta no contiene datos o no es un array válido.');
            }
            }
            
            else{
  
            try {
          const response = await fetch('/api/test/all', {
            method: 'GET',
            headers: {
              
            },
          });
  
          if (!response.ok) {
            console.error('Error en la solicitud GET:', response.status, response.statusText);
          
          } else {
            const data = await response.json();
            alert("Numero total de usuarios registrados: "+data);
          }
        } catch (error) {
          console.error('Error al realizar la solicitud GET:', error.message);
        }
  
          }
        }
  
    async function handleGETClick(token)  {
      try {
      const response = await fetch('/api/test/user', {
        method: 'GET',
        headers: {
          'x-access-token': token ,
        },
      });
  
      if (!response.ok) {
        console.error('Error en la solicitud GET:', response.status, response.statusText);
      
      } else {
        const data = await response.json();
        console.log('Respuesta GET:', data);
        return data;
      }
    } catch (error) {
      console.error('Error al realizar la solicitud GET:', error.message);
    }
    }
  
    async function handleGETClickAdmin(token)  {
      try {
      const response = await fetch('/api/test/admin', {
        method: 'GET',
        headers: {
          'x-access-token': token ,
        },
      });
  
      if (!response.ok) {
        console.error('Error en la solicitud GET:', response.status, response.statusText);
      
      } else {
        const data = await response.json();
        console.log('Respuesta GET:', data);
        return data;
      }
    } catch (error) {
      console.error('Error al realizar la solicitud GET:', error.message);
    }
    }
  });
  