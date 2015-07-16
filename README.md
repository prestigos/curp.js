curp.js
=======

[![Build Status](https://travis-ci.org/prestigos/curp.js.png?branch=master)](https://travis-ci.org/prestigos/curp.js)

Función para generar el CURP, de acuerdo a las especificaciones oficiales.

Se puede usar con node.js y directamente en el navegador.

## Instalación

Navegador : `<script src="curp.js"></script>`
Node.js   : `var generaCurp = require('curp');`

## Modo de uso

```javascript
var curp = generaCurp({
  nombre            : 'Juan',
  apellido_paterno  : 'Perez',
  apellido_materno  : 'Ramirez',
  sexo              : 'H',
  estado            : 'DF',
  fecha_nacimiento  : [31, 1, 1981]
});
```

## Pruebas

Para correr las pruebas utiliza el comando:

`npm run mocha`

## Licencia

MIT ( http://opensource.org/licenses/MIT )

