(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var body = document.body;
var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl");
var findEl = function (x) {
  return document.getElementById(x);
};

function Shader(gl, type, text) {
  var shader = gl.createShader(type);
  var isValid = false;

  gl.shaderSource(shader, text);
  gl.compileShader(shader);

  isValid = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

  if (!isValid) throw new Error("Not valid shader: \n" + text);else return shader;
}

function Program(gl, vs, fs) {
  var _program = gl.createProgram(vs, fs);

  gl.attachShader(_program, vs);
  gl.attachShader(_program, fs);
  gl.linkProgram(_program);
  return _program;
}

//no allocation.  writes data into an allocated Typed Array at given index
function setBox(boxes, index, x, y, w, h) {
  var x1 = x;
  var x2 = x + w;
  var y1 = y;
  var y2 = y + h;
  var i = index * BOX_POINT_COUNT;

  boxes[i] = x1;
  boxes[i + 1] = y1;
  boxes[i + 2] = x2;
  boxes[i + 3] = y1;
  boxes[i + 4] = x1;
  boxes[i + 5] = y2;

  boxes[i + 6] = x1;
  boxes[i + 7] = y2;
  boxes[i + 8] = x2;
  boxes[i + 9] = y1;
  boxes[i + 10] = x2;
  boxes[i + 11] = y2;
}

//:: glContext, glBuffer, Int, Int, Float32Array
function updateBuffer(gl, buffer, position, chunkSize, data) {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, chunkSize, gl.FLOAT, false, 0, 0);
}

//a_position vec2

var MAX_BOX_COUNT = 2;
var BOX_POINT_COUNT = 12;
var BOX_TRIANGLE_COUNT = BOX_POINT_COUNT / 2;
var POINT_DIMENSION = 2;

var vShader = Shader(gl, gl.VERTEX_SHADER, findEl("vertex").text);
var fShader = Shader(gl, gl.FRAGMENT_SHADER, findEl("fragment").text);
var program = Program(gl, vShader, fShader);
var posPtr = gl.getAttribLocation(program, "a_position");
var colorPtr = gl.getUniformLocation(program, "u_color");
var resPtr = gl.getUniformLocation(program, "u_resolution");
var boxBuffer = gl.createBuffer();
var boxes = new Float32Array(MAX_BOX_COUNT * BOX_POINT_COUNT);
var boxColor = [0, 1, 1, 1];

setBox(boxes, 0, 0, 0, 30, 30);
setBox(boxes, 1, 500, 50, 200, 200);

function fitTo(reference, element) {
  element.width = reference.innerWidth;
  element.height = reference.innerHeight;
}

function makeRender() {
  return function render() {
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.uniform2f(resPtr, w, h);
    gl.uniform4f(colorPtr, boxColor[0], boxColor[1], boxColor[2], boxColor[3]);
    updateBuffer(gl, boxBuffer, posPtr, POINT_DIMENSION, boxes);
    gl.drawArrays(gl.TRIANGLES, 0, BOX_TRIANGLE_COUNT * MAX_BOX_COUNT);
    requestAnimationFrame(render);
  };
}

console.log("yo this is the best thing ever");

function boot() {
  fitTo(window, canvas);
  document.body.appendChild(canvas);
  requestAnimationFrame(makeRender());
}

document.addEventListener("DOMContentLoaded", boot);
window.addEventListener("resize", function (_ref) {
  var target = _ref.target;
  return fitTo(target, canvas);
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlc1xcYnJvd3NlcmlmeVxcbm9kZV9tb2R1bGVzXFxicm93c2VyLXBhY2tcXF9wcmVsdWRlLmpzIiwiQzovVXNlcnMva2FuZXNfMDAwL3Byb2plY3RzL2JyZWFrb3V0L3NyYy9kcmF3LXRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLElBQUksSUFBSSxHQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUE7QUFDMUIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUM3QyxJQUFJLEVBQUUsR0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3ZDLElBQUksTUFBTSxHQUFHLFVBQUMsQ0FBQztTQUFLLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0NBQUEsQ0FBQTs7QUFFOUMsU0FBUyxNQUFNLENBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDL0IsTUFBSSxNQUFNLEdBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNuQyxNQUFJLE9BQU8sR0FBRyxLQUFLLENBQUE7O0FBRW5CLElBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzdCLElBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUE7O0FBRXhCLFNBQU8sR0FBRyxFQUFFLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQTs7QUFFMUQsTUFBSSxDQUFDLE9BQU8sRUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxDQUFBLEtBQzlDLE9BQU8sTUFBTSxDQUFBO0NBQzVCOztBQUVELFNBQVMsT0FBTyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0FBQzVCLE1BQUksUUFBTyxHQUFHLEVBQUUsQ0FBQyxhQUFh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bGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJsZXQgYm9keSAgID0gZG9jdW1lbnQuYm9keVxyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKVxyXG5sZXQgZ2wgICAgID0gY2FudmFzLmdldENvbnRleHQoXCJ3ZWJnbFwiKVxyXG5sZXQgZmluZEVsID0gKHgpID0+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHgpXHJcblxyXG5mdW5jdGlvbiBTaGFkZXIgKGdsLCB0eXBlLCB0ZXh0KSB7XHJcbiAgbGV0IHNoYWRlciAgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSlcclxuICBsZXQgaXNWYWxpZCA9IGZhbHNlXHJcblxyXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHRleHQpXHJcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXHJcblxyXG4gIGlzVmFsaWQgPSBnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUylcclxuXHJcbiAgaWYgKCFpc1ZhbGlkKSB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgdmFsaWQgc2hhZGVyOiBcXG5cIiArIHRleHQpXHJcbiAgZWxzZSAgICAgICAgICByZXR1cm4gc2hhZGVyXHJcbn1cclxuXHJcbmZ1bmN0aW9uIFByb2dyYW0gKGdsLCB2cywgZnMpIHtcclxuICBsZXQgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0odnMsIGZzKVxyXG5cclxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnMpXHJcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZzKVxyXG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pXHJcbiAgcmV0dXJuIHByb2dyYW1cclxufVxyXG5cclxuLy9ubyBhbGxvY2F0aW9uLiAgd3JpdGVzIGRhdGEgaW50byBhbiBhbGxvY2F0ZWQgVHlwZWQgQXJyYXkgYXQgZ2l2ZW4gaW5kZXhcclxuZnVuY3Rpb24gc2V0Qm94IChib3hlcywgaW5kZXgsIHgsIHksIHcsIGgpIHtcclxuICBsZXQgeDEgPSB4XHJcbiAgbGV0IHgyID0geCArIHdcclxuICBsZXQgeTEgPSB5XHJcbiAgbGV0IHkyID0geSArIGhcclxuICBsZXQgaSAgPSBpbmRleCAqIEJPWF9QT0lOVF9DT1VOVFxyXG5cclxuICBib3hlc1tpXSAgICA9IHgxXHJcbiAgYm94ZXNbaSsxXSAgPSB5MVxyXG4gIGJveGVzW2krMl0gID0geDJcclxuICBib3hlc1tpKzNdICA9IHkxXHJcbiAgYm94ZXNbaSs0XSAgPSB4MVxyXG4gIGJveGVzW2krNV0gID0geTJcclxuXHJcbiAgYm94ZXNbaSs2XSAgPSB4MVxyXG4gIGJveGVzW2krN10gID0geTJcclxuICBib3hlc1tpKzhdICA9IHgyXHJcbiAgYm94ZXNbaSs5XSAgPSB5MVxyXG4gIGJveGVzW2krMTBdID0geDJcclxuICBib3hlc1tpKzExXSA9IHkyXHJcbn0gXHJcblxyXG4vLzo6IGdsQ29udGV4dCwgZ2xCdWZmZXIsIEludCwgSW50LCBGbG9hdDMyQXJyYXlcclxuZnVuY3Rpb24gdXBkYXRlQnVmZmVyIChnbCwgYnVmZmVyLCBwb3NpdGlvbiwgY2h1bmtTaXplLCBkYXRhKSB7XHJcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIGJ1ZmZlcilcclxuICBnbC5idWZmZXJEYXRhKGdsLkFSUkFZX0JVRkZFUiwgZGF0YSwgZ2wuRFlOQU1JQ19EUkFXKVxyXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KHBvc2l0aW9uKVxyXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIocG9zaXRpb24sIGNodW5rU2l6ZSwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxyXG59XHJcblxyXG4vL2FfcG9zaXRpb24gdmVjMlxyXG5cclxuY29uc3QgTUFYX0JPWF9DT1VOVCAgICAgID0gMlxyXG5jb25zdCBCT1hfUE9JTlRfQ09VTlQgICAgPSAxMlxyXG5jb25zdCBCT1hfVFJJQU5HTEVfQ09VTlQgPSBCT1hfUE9JTlRfQ09VTlQgLyAyXHJcbmNvbnN0IFBPSU5UX0RJTUVOU0lPTiAgICA9IDJcclxuXHJcbmxldCB2U2hhZGVyICAgPSBTaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIGZpbmRFbChcInZlcnRleFwiKS50ZXh0KVxyXG5sZXQgZlNoYWRlciAgID0gU2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZpbmRFbChcImZyYWdtZW50XCIpLnRleHQpXHJcbmxldCBwcm9ncmFtICAgPSBQcm9ncmFtKGdsLCB2U2hhZGVyLCBmU2hhZGVyKVxyXG5sZXQgcG9zUHRyICAgID0gZ2wuZ2V0QXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgXCJhX3Bvc2l0aW9uXCIpXHJcbmxldCBjb2xvclB0ciAgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X2NvbG9yXCIpXHJcbmxldCByZXNQdHIgICAgPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24ocHJvZ3JhbSwgXCJ1X3Jlc29sdXRpb25cIilcclxubGV0IGJveEJ1ZmZlciA9IGdsLmNyZWF0ZUJ1ZmZlcigpXHJcbmxldCBib3hlcyAgICAgPSBuZXcgRmxvYXQzMkFycmF5KE1BWF9CT1hfQ09VTlQgKiBCT1hfUE9JTlRfQ09VTlQpXHJcbmxldCBib3hDb2xvciAgPSBbMC4wLCAxLjAsIDEuMCwgMS4wXVxyXG5cclxuc2V0Qm94KGJveGVzLCAwLCAwLCAwLCAzMCwgMzApXHJcbnNldEJveChib3hlcywgMSwgNTAwLCA1MCwgMjAwLCAyMDApXHJcblxyXG5mdW5jdGlvbiBmaXRUbyAocmVmZXJlbmNlLCBlbGVtZW50KSB7XHJcbiAgZWxlbWVudC53aWR0aCAgPSByZWZlcmVuY2UuaW5uZXJXaWR0aFxyXG4gIGVsZW1lbnQuaGVpZ2h0ID0gcmVmZXJlbmNlLmlubmVySGVpZ2h0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1ha2VSZW5kZXIgKCkge1xyXG4gIHJldHVybiBmdW5jdGlvbiByZW5kZXIgKCkge1xyXG4gICAgbGV0IHcgPSBjYW52YXMuY2xpZW50V2lkdGhcclxuICAgIGxldCBoID0gY2FudmFzLmNsaWVudEhlaWdodFxyXG5cclxuICAgIGdsLmNsZWFyQ29sb3IoMC4wLCAwLjAsIDAuMCwgMS4wKVxyXG4gICAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVClcclxuICAgIGdsLnVzZVByb2dyYW0ocHJvZ3JhbSlcclxuICAgIGdsLnVuaWZvcm0yZihyZXNQdHIsIHcsIGgpXHJcbiAgICBnbC51bmlmb3JtNGYoY29sb3JQdHIsIGJveENvbG9yWzBdLCBib3hDb2xvclsxXSwgYm94Q29sb3JbMl0sIGJveENvbG9yWzNdKVxyXG4gICAgdXBkYXRlQnVmZmVyKGdsLCBib3hCdWZmZXIsIHBvc1B0ciwgUE9JTlRfRElNRU5TSU9OLCBib3hlcylcclxuICAgIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCBCT1hfVFJJQU5HTEVfQ09VTlQgKiBNQVhfQk9YX0NPVU5UKVxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJlbmRlcilcclxuICB9XHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKFwieW8gdGhpcyBpcyB0aGUgYmVzdCB0aGluZyBldmVyXCIpXHJcblxyXG5mdW5jdGlvbiBib290ICgpIHtcclxuICBmaXRUbyh3aW5kb3csIGNhbnZhcykgXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW52YXMpXHJcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1ha2VSZW5kZXIoKSlcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgYm9vdClcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgKHt0YXJnZXR9KSA9PiBmaXRUbyh0YXJnZXQsIGNhbnZhcykpXHJcbiJdfQ==
