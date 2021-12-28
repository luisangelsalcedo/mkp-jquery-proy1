$(() => {
  const contenedor = $("body");
  let result = [];
  let random = "";

  $("#fourNumbers").keyup(e => {
    let value = e.target.value; // capturamos el valor ingresado en la caja de texto
    contenedor.removeClass("error"); // limpiamos la clase error anterior

    let picas = 0;
    let fijas = 0;
    let html = "<tr><th>#</th><th>Número</th><th>Picas</th><th>Fijas</th></tr>";

    // validaciones
    if (e.key === "Enter") {
      // validar vacio
      if (value == "") {
        contenedor.addClass("error");
        return;
      }
      // validar solo numeros y min 4 digitos
      if (!/[0-9]{4}/g.test(value)) {
        contenedor.addClass("error");
        return;
      }
      //  validar digitos diferentes
      if (!fourDiferent(value)) {
        contenedor.addClass("error");
        return;
      }
      // buscamos las picas y las fijas
      value.split("").forEach((digito, idx) => {
        if (random.indexOf(digito) != -1) {
          if (random.indexOf(digito) == idx) ++fijas;
          else ++picas;
        }
      });
      // Agregamos los resultados en la tabla
      result = [
        { id: result.length + 1, n: value, p: picas, f: fijas },
        ...result,
      ];
      result.forEach(({ id, n, p, f }) => {
        html += `<tr><td>${id}</td><td >${n}</td><td>${p}</td><td>${f}</td></tr>`;
      });
      $("table").html(html);
      // verificar si hemos ganado
      if (fijas === 4) {
        contenedor.addClass("win");
        $("#fourNumbers").attr("disabled", "disabled");
      } else {
        // limpiamos el input y nos pocisionamos el foco sobre él para volver a digital
        $("#fourNumbers").val("");
        $("#fourNumbers").focus();
      }
    }
  });

  $(".modal a").click(() => {
    init();
  });

  ////////////////////////////////////////////////////////////
  //*/ funcion para validar que 4 digitos son diferentes (return Boolean)
  const fourDiferent = str => {
    const arr = str.split("");
    const digito1 = arr.filter(e => e === arr[0]).length == 1;
    const digito2 = arr.filter(e => e === arr[1]).length == 1;
    const digito3 = arr.filter(e => e === arr[2]).length == 1;
    const digito4 = arr.filter(e => e === arr[3]).length == 1;

    if (digito1 && digito2 && digito3 && digito4) return true;
    else return false;
  };
  //*/
  //*/ funcion para general un numero aleatoreo de 4 digitos (return String) (depende de fourDiferent)
  const randomFour = () => {
    let generado = "";
    while (true) {
      generado =
        String(Math.floor(Math.random() * 10)) +
        String(Math.floor(Math.random() * 10)) +
        String(Math.floor(Math.random() * 10)) +
        String(Math.floor(Math.random() * 10));

      if (fourDiferent(String(generado))) break;
    }
    return String(generado);
  };
  //*/
  //*/ reiniciamos todo
  const init = () => {
    contenedor.removeClass("win");
    result = [];
    random = randomFour(); // cargamos un nuevo numero random
    console.log(random);
    $("table").html(
      "<tr><th>#</th><th>Número</th><th>Picas</th><th>Fijas</th></tr>"
    );
    $("#fourNumbers").attr("disabled", false).val("").focus();
  };
  //*/

  // generamos el numero aleatoreo
  random = randomFour();
  console.log(random);
});
