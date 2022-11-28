const errors = [{
  code: 401,
  title: '¡No está autorizado!',
  description: 'Verifique sus datos de acceso',
},
{
  code: 404,
  title: '¡Página no encontrada!',
  description: 'Lo siento, no hemos encontrado lo que estabas buscando.',
},
{
  code: 500,
  title: '¡Ocurrió un error inesperado!',
  description: 'Inténtalo nuevamente en unos minutos',
},
{
  code: 502,
  title: '¡Petición incorrecta!',
  description: 'Dirígete al inicio e inténtalo de nuevo',
},
];

export default errors;
