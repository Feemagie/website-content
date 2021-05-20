/**
 * Homebrew Raycast Platforms
 * 
 * @author Feemagie
 * @description A simple self-made demo of creating shadow platforms with ray-casting.
 *    Created only with WebGL and gl-matrix library for matrix math functions.
 *    Inspired by concepts from the game In My Shadow by PlayBae.
 * 
 * https://feemagie.com/
 */
import { mat4 } from 'gl-matrix';
import CubeObject from './Cube.object';


/**
 * Type interface for object data buffers.
 * 
 * No need for UV mapping for this sandbox example.
 */
interface ObjectBuffer {
    vertexes: WebGLBuffer; // Targets ARRAY_BUFFER
    colors: WebGLBuffer; // Targets ARRAY_BUFFER
    indices: WebGLBuffer; // Targets ELEMENT_ARRAY_BUFFER
}


/**
 * Return a compiled GLSL Shader from a string.
 */
function createShader(gl: WebGLRenderingContext, script: string, type: 'VERTEX_SHADER' | 'FRAGMENT_SHADER'): WebGLShader {

    // Set the shader rendering type based on the string type.
    const glType = type === 'VERTEX_SHADER' ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;

    // Create a new typed shader (vertex or fragment).
    const shader = gl.createShader(glType);
    gl.shaderSource(shader, script);

    // Compile the shader script.
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
        return;
    }

    return shader;
}


/**
 * Initializes the WebGL program with the necessary shaders.
 */
function initProgram(gl: WebGLRenderingContext, shaders: WebGLShader[]): WebGLProgram {
    // Create the GL Program.
    const program = gl.createProgram();

    // Attach and link shaders to the GL Program.
    for (const shader of shaders) {
        gl.attachShader(program, shader);
    }
    gl.linkProgram(program);

    // Use the program.
    gl.useProgram(program);

    return program;
}

/**
 * Returns 3D object information. 
 */
function createObjectBuffer(gl: WebGLRenderingContext): ObjectBuffer {
    const vertexes = gl.createBuffer();
    const colors = gl.createBuffer();
    const indices = gl.createBuffer();

    // TODO

    return { vertexes, colors, indices };
}


/**
 * Create a projection matrix.
 */
function createProjectionMatrix(gl: WebGLRenderingContext, canvas: HTMLCanvasElement): mat4 {
    const ratio = canvas.width / canvas.height;
    return mat4.ortho(mat4.create(), -ratio, ratio, -1.0, 1.0, 1.0, -1.0);
}

const main = (canvasRef) => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const gl = canvas.getContext("webgl") as WebGLRenderingContext;

    const vertexShaderSource = `
        attribute vec4 a_Position;
        attribute vec3 a_Color;

        uniform mat4 u_ProjectionMatrix;
        uniform mat4 u_ViewingMatrix;

        varying medp vec4 v_Color;

        void main() {
            gl_Position = u_ProjectionMatrix * u_ViewingMatrix * a_Position;
            v_Color = vec4(a_Color, 1.0);
        }
    `;

    const fragmentShaderSource = `
        varying medp vec4 v_Color;

        void main() {
            gl_FragColor = v_Color;
        }
    `;

    // Initialize Shaders.
    const vertexShader = createShader(gl, vertexShaderSource, 'VERTEX_SHADER');
    const fragmentShader = createShader(gl, fragmentShaderSource, 'FRAGMENT_SHADER');

    // If either of the shaders fail to be created.
    if (!vertexShader || !fragmentShader) {
        return;
    }

    // Initialize the Program.
    const program = initProgram(gl, [vertexShader, fragmentShader]);

    // Create Orthographic Projection Matrix
    const projectionMatrix = createProjectionMatrix(gl, canvas);

    // Get pointer location of the projection variable in the linked program.
    // Then modify the projection matrix in the program.
    const u_ProjectionMatrix = gl.getUniformLocation(program, "u_pMatrix");
    gl.uniformMatrix4fv(u_ProjectionMatrix, false, projectionMatrix);


}

export default main;

/**
 * const program = initializeProgram(gl, vertexShader, fragmentShader);

    const buffers = initializeBuffer(gl);

    var then = 0;

    // Draw the scene repeatedly
    function render(now) {
        now *= 0.001;  // convert to seconds
        const deltaTime = now - then;
        then = now;

        draw(gl, program, buffers, deltaTime);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
 */