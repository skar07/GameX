import { WebGLRenderer } from "../webgl/index.js";

export class GameEngine {
  renderer: WebGLRenderer;
  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new WebGLRenderer(canvas);
  }
  start() {
    // Connect to server via WebSocket
    // Start client-side rendering loop
  }
  test() {
    this.renderer.main()
    console.log(`Ping`)
    
  }
}
