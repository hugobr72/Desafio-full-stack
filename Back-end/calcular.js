function calcularDistanciaMatriz(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

const clientes = [
  { id: 1, nome: 'Cliente 1', email: 'cliente1@example.com', telefone: '111-111-1111', x: 0, y: 2 },
  { id: 2, nome: 'Cliente 2', email: 'cliente2@example.com', telefone: '222-222-2222', x: 2, y: 2 },
  { id: 3, nome: 'Cliente 3', email: 'cliente3@example.com', telefone: '333-333-3333', x: 1, y: 0 },
  { id: 4, nome: 'Cliente 4', email: 'cliente4@example.com', telefone: '444-444-4444', x: 3, y: 4 },
  { id: 5, nome: 'Cliente 5', email: 'cliente5@example.com', telefone: '555-555-5555', x: 9, y: 3 },
  { id: 6, nome: 'Cliente 6', email: 'cliente6@example.com', telefone: '555-555-5555', x: 5, y: 4 }
];


function calcular() {
  const dc = []

  clientes.map(e => {
    dc.push(
      {
        id: e.id,
        nome: e.nome,
        email: e.email,
        telefone: e.telefone,
        x: e.x,
        y: e.y,
        distancia: calcularDistanciaMatriz(0, 0, e.x, e.y)
      }
    )
  })


  let clientesResponse = [];
  let dcAux = dc.sort((a, b) => a.distancia - b.distancia);

  clientesResponse.push(
    {
      id: dcAux[0].id,
      nome: dcAux[0].nome,
      email: dcAux[0].email,
      telefone: dcAux[0].telefone,
      x: dcAux[0].x,
      y: dcAux[0].y
    }
  )

  dcAux.shift()
  dc.sort((a, b) => a.distancia - b.distancia).map((e) => {
    let clienteMenor;
    let indexMenor = 0;
    let distanciaMenor = null;

    dcAux.forEach((element, i) => {
      let calculoDist = calcularDistanciaMatriz(e.x, e.y, element.x, element.y);
      if (distanciaMenor == null || distanciaMenor > calculoDist) {
        indexMenor = i;
        distanciaMenor = calculoDist;
        clienteMenor = element;
      }

      if (i == dcAux.length - 1) {
        dcAux.splice(i, 1)
        clientesResponse.push(
          {
            id: e.id,
            nome: e.nome,
            email: e.email,
            telefone: e.telefone,
            x: e.x,
            y: e.y
          }
        )
      }
    });
  })
  return clientesResponse;
}

calcular()