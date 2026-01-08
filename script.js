window.onload = function() {
  const explicacion1 = document.getElementById("explicacion1");
  const parrafo = document.createElement("p");
  parrafo.textContent = "Un choque tambien llamado colision ocurre cuando dos cuerpos establecen contacto fisico generando una fuerza intensa que modifica el movimiento de los cuerpos involucrados";
  explicacion1.appendChild(parrafo);
};

function iniciar() {
  const tipo = document.getElementById("tipoChoque").value;
  const obj1 = document.getElementById("objeto1");
  const obj2 = document.getElementById("objeto2");
  const explicacion = document.getElementById("explicacion");


  // Posiciones iniciales
  let pos1 = 0;
  let pos2 = 550;
  obj1.style.left = pos1 + "px";
  obj2.style.left = pos2 + "px";

  // Velocidades iniciales
  let velocidad1 = 2;
  let velocidad2 = -2;

  // Limpia explicación
  explicacion.innerHTML = "";

  const intervalo = setInterval(() => {
    pos1 += velocidad1;
    pos2 += velocidad2;

    obj1.style.left = pos1 + "px";
    obj2.style.left = pos2 + "px";

    // Detecta choque
    if (pos1 + 50 >= pos2) {
      clearInterval(intervalo);

      switch (tipo) {
        case "elastico":
          // Rebotan: invierten velocidades
          velocidad1 = -velocidad1;
          velocidad2 = -velocidad2;
          explicacion.innerHTML = "Choque Elástico: Donde se conserva tanto la cantidad de movieminto como la energia cinetica. Los cuerpos rebotan sin perder energia";
          break;

        case "inelastico":
          // Rebotan con menor velocidad
          velocidad1 = -velocidad1 * 0.5;
          velocidad2 = -velocidad2 * 0.5; 
          explicacion.innerHTML = "Choque Inelástico: Se conserva la cantidad de movimiento, pero se pierde parte de la energia cinetica";
          break;

        case "perfectamente-inelastico":
          // Se pegan y se mueven juntos
          velocidad1 = 1;
          velocidad2 = 1;
          explicacion.innerHTML = "Choque Perfectamente Inelástico: Los cuerpos se quedan unidos despues del impacto y se mueven juntos ";
          break;
      }

      // Segunda fase: movimiento post-choque
      const postChoque = setInterval(() => {
        pos1 += velocidad1;
        pos2 += velocidad2;

        obj1.style.left = pos1 + "px";
        obj2.style.left = pos2 + "px";

        // Cuando salen del área, reiniciar
        if (pos1 < 0 || pos2 > 600) {
          clearInterval(postChoque);
          obj1.style.left = "0px";
          obj2.style.left = "550px";
        }
      }, 20);
    }
  }, 20);
  }
