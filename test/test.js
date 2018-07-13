/*jslint node: true, indent:2, regexp:true*/
/*global describe,it,expect,beforeEach,afterEach,emit*/
"use strict";
var assert, curp, persona;

assert = require('assert');
curp = require('./../curp.js');

function Persona() {
  return;
}

persona = new Persona();
beforeEach(function () {
  persona.nombre = "pepito";
  persona.apellido_paterno = "perez";
  persona.apellido_materno = "alvarado";
  persona.sexo = "M";
  persona.estado = "DF";
  persona.fecha_nacimiento = [1, 1, 1969];
});

describe('Posiciones 1-4', function () {
  it('Deberia regresar "x" si la primer letra de algun de los nombres es Ñ', function () {
    persona.setName('alberto', 'ñando', 'rodriguez');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'XARA');
  });

  describe('Deberia utilizar la primera letra de la primera palabra cuando el nombre es compuesto. Siempre y cuando no sea "MARIA, MA, MA., JOSE, J o JJ" ', function () {
    it('Para Maria', function () {
      persona.setName('maria luisa', 'perez', 'hernandez');
      var letras = curp(persona).substr(0, 4);
      assert.equal(letras, 'PEHL');
    });

    it('Para compuesto regular', function () {
      persona.setName('luis enrique', 'romero', 'palazuelos');
      var letras = curp(persona).substr(0, 4);
      assert.equal(letras, 'ROPL');
    });
  });

  it('Deberia regresar "X" en caso que un caracter especial como "/" o "-" vaya a ser utilizado en la creacion de la clave', function () {
    persona.setName("juan jose", "d/amico", "alvarez");
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'DXAJ');
  });

  it("Deberia remover dieresis si se llegara a tener que utilizar una letra con ellas", function () {
    persona.setName('Pedro', 'güero', 'hernandez');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'GUHP');
  });

  it('Deberia utilizar la primera palabra en apellidos compuestos', function () {
    persona.setName('rocio', 'riva palacio', 'cruz');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'RICR');
  });

  it('Deberia de quitar las preposiciones, conjunciones o contracciones', function () {
    persona.setName('carlos', 'MC Gregor', 'lopez');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'GELC');
  });

  it('Deberia cambiar la segunda letra por una "X" si la clave es una palabra altisonante', function () {
    persona.setName('ofelia', 'pedrero', 'dominguez');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'PXDO');
  });

  it('Deberia poner una "x" en vez de una segunda letra si el primer apellido no tiene una vocal interna', function () {
    persona.setName('andres', 'ich', 'rodríguez');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'IXRA');
  });

  it('Debera asignar una x en la 3ra posicion de la clave si no hay segundo apellido', function () {
    persona.setName('luis', 'perez', '');
    var letras = curp(persona).substr(0, 4);
    assert.equal(letras, 'PEXL');
  });
});

describe('Posiciones 14-16', function () {
  describe('Deberia asignar una "X"', function () {
    it('cuando la primera consonante interna sea una ñ', function () {
      persona.setName('alberto', 'oñante', 'rodriguez');
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'XDL');
    });

    it('Cuando no existan consonantes internas', function () {
      persona.setName('andres', 'po', 'barrios');
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'XRN');
    });

    it('en la posicion 15 cuando haya un solo apellido', function () {
      persona.setName('leticia', 'luna', undefined);
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'NXT');
    });
  });

  describe('Deberia utilizar la primera consonante interna del primer nombre', function () {
    it('cuando este sea compuesto', function () {
      persona.setName('juan jose', 'alvarado', 'barrios');
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'LRN');
    });

    it('Excepto si es maria o jose, en ese caso se usa el segundo nombre', function () {
      persona.setName('ma. de los angeles', 'moreno', 'sanchez');
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'RNN');
    });

    it('Pero si es maria o jose y solo tiene un nombre, debe usar ese', function () {
      persona.setName('Maria', 'moreno', 'sanchez');
      var letras = curp(persona).substr(13, 3);
      assert.equal(letras, 'RNR');
    });
  });
});

describe('Usando un curp famoso', function () {
  it('Deberia dar PXNE como las primeras 4 letras', function () {
    var curpstr = curp({
      nombre: 'enrique',
      apellido_paterno: 'peña',
      apellido_materno: 'nieto',
      sexo: 'H',
      estado: 'MC',
      fecha_nacimiento: [20, 7, 1966]
    });
    assert.equal(curpstr, 'PXNE660720HMCXTN06');
  });
});

Persona.prototype.setName = function (nombre, apellido_paterno, apellido_materno) {
  this.nombre = nombre;
  this.apellido_paterno = apellido_paterno;
  this.apellido_materno = apellido_materno;
};
