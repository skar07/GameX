import { drawScene } from "./draw_scene.js"
import { initBuffers } from "./init_buffer.js";

export class WebGLRenderer {
  ctx: WebGLRenderingContext | null;
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("webgl");
  }
  main() {
    // Set line width
    if (this.ctx === null) {
        alert(
          "Unable to initialize WebGL. Your browser or machine may not support it.",
        );
        return;
      }
    
      // Set clear color to black, fully opaque
      this.ctx.clearColor(0.0, 0.0, 0.0, 1.0);
      // Clear the color buffer with specified clear color
      this.ctx.clear(this.ctx.COLOR_BUFFER_BIT);

      const vsSource = `
        attribute vec4 aVertexPosition;
        uniform mat4 uModelViewMatrix;
        uniform mat4 uProjectionMatrix;
        void main() {
          gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        }
      `;
      const fsSource = `
        void main(){
          gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
        }
      `
      const shaderProgram = this.initShaderProgram(this.ctx, vsSource, fsSource)
      if(shaderProgram === null || shaderProgram === undefined){
        console.log(`Failed to create shaderProgram`);
        return;
      }
      const programInfo = {
        program: shaderProgram,
        attribLocations: {
          vertexPosition: this.ctx.getAttribLocation(shaderProgram, "aVertexPosition")
        },
        uniformLocations: {
          projectionMatrix: this.ctx.getUniformLocation(shaderProgram, "uProjectionMatrix"),
          modelViewMatrix: this.ctx.getUniformLocation(shaderProgram, "uModelViewMatrix")
        }
      }

      const buffers = initBuffers(this.ctx);
      console.log(`Rendering`)
      drawScene(this.ctx, programInfo, buffers);
  }
  loadShader(gl: WebGLRenderingContext, type: GLenum, source: string){
    const shader = gl.createShader(type);
    if(shader === null){
      console.log("Failed to create shader");
      return;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      alert(
          `An error occured compiling the shaders: ${gl.getShaderInfoLog(shader)}`
      );
      gl.deleteShader(shader)
      return null;
    }
    return shader;
  }
  initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string){
    const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const shaderProgram = gl.createProgram();
    if(vertexShader === null || fragmentShader === null || vertexShader === undefined || fragmentShader === undefined){
      console.log(`Failed to create vertexShader or fragmentShader (or) either is undefined`);
      return;
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if(!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){
      alert(
        `Unable to initialize the shader program: ${gl.getProgramInfoLog(
          shaderProgram
        )}`
      );
      return null;
    }
    return shaderProgram;
  }
  
}
