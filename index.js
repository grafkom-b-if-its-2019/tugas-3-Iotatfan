(function() {

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v3.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    //For Triangles
    var thetaLoc = gl.getUniformLocation(program, 'theta'); 
    var thetaT = [20, 60, 0];
  
    //For Cube
    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [20, 60, 0];


    function cube(){
      gl.useProgram(programCube);

      // Definisi verteks dan buffer

      // Missing Lines : AD, DC, EF, DH
      var cubeVertices = [
        // x, y, z             r, g, b

        //ABCD
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        0.5, 0.5, 0.5,      1.0, 0.0, 0.0,    //C
        0.5, 0.5, 0.5,      1.0, 0.0, 0.0,    //C
        0.5, -0.5, 0.5,     1.0, 0.0, 0.0,    //D
        0.5, -0.5, 0.5,     1.0, 0.0, 0.0,    //D
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        
        //DCGH
        0.5, 0.5, 0.5,      1.0, 0.0, 1.0,    //C
        0.5, 0.5, -0.5,     1.0, 0.0, 1.0,    //G
        0.5, -0.5, 0.5,     1.0, 0.0, 1.0,    //D
        0.5, -0.5, -0.5,    1.0, 0.0, 1.0,    //H

        //ABFE
        -0.5, -0.5, 0.5,    1.0, 1.0, 0.0,    //A
        -0.5, -0.5, -0.5,   1.0, 1.0, 0.0,    //E
        -0.5, 0.5, 0.5,     1.0, 1.0, 0.0,    //B
        -0.5, 0.5, -0.5,    1.0, 1.0, 0.0,    //F

        //EFGH
        -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,    //E
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    //H
        0.5, -0.5, -0.5,    0.0, 1.0, 1.0,    //H
        -0.5, -0.5, -0.5,   0.0, 1.0, 1.0,    //E

      ];

      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programCube, 'vPosition');
      var vColor = gl.getAttribLocation(programCube, 'vColor');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        6 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.uniform3fv(thetaLocCube, thetaCube);

    }

    function triangle(){
      gl.useProgram(program);

      // Definisi vertex and buffer
      var triangleVertices = [
        //x,y         r,g,b
        -0.2,-0.5,    1.0,1.0,0.0,
        0.0,0.5,      0.0,0.0,0.0,
        0.2,-0.5,     0.1,1.0,0.6,

        -0.2, -0.5,   1.0,1.0,0.0,
        -0.15, -0.7,  1.0,1.0,0.0,
        -0.1, -0.5,    1.0,1.0,0.0,

        -0.24, -0.7,  1.0,1.0,0.0,
        -0.2, -0.5,   1.0,1.0,0.0,
        -0.15, -0.7,  1.0,1.0,0.0,

        0.24, -0.7,   0.1,1.0,0.6,
        0.2, -0.5,    0.1,1.0,0.6,
        0.15, -0.7,   0.1,1.0,0.6,

        0.2, -0.5,    0.1,1.0,0.6,
        0.15, -0.7,   0.1,1.0,0.6,
        0.1, -0.5,    0.1,1.0,0.6,
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );
  
      // gl.enableVertexAttribArray(vPosition);
      // gl.enableVertexAttribArray(vColor);

      thetaT[1] += 0.67;

      gl.uniform3fv(thetaLoc, thetaT);
    }

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      triangle();
      gl.drawArrays(gl.TRIANGLES, 0, 15);

      cube();
      gl.drawArrays(gl.LINES, 0, 24);

      requestAnimationFrame(render);
    }
    
    render();
  }
})();