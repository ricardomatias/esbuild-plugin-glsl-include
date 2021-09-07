// test/src/test3.glsl
var test3_default = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform float u_time;\n\n\n\n#ifndef FNC_MAGENTA\n#define FNC_MAGENTA\n\nvec3 magenta() {\n    return vec3(0.0, 1.0, 0.0);\n}\n\n#endif\n\n\n#ifndef FNC_TURQUOISE\n#define FNC_TURQUOISE\n\nvec3 turquoise() {\n    return vec3(0.0, 1.0, 0.0);\n}\n\n#endif\n\n\n#ifndef FNC_BLUE\n#define FNC_BLUE\n\nvec3 blue() {\n    return vec3(0.0, 0.0, 1.0);\n}\n\n#endif\n\n\nvoid main(void) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n}\n";

// test/src/test3.js
console.log(test3_default);
