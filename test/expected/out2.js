// test/src/test2.glsl
var test2_default = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform float u_time;\n\n#ifndef FNC_BLUE\n#define FNC_BLUE\n\nvec3 blue() {\n    return vec3(0.0, 0.0, 1.0);\n}\n\n#endif\n\n\n#ifndef FNC_GREEN\n#define FNC_GREEN\n\nvec3 green() {\n    return vec3(0.0, 1.0, 0.0);\n}\n\n#endif\n\n\nvoid main(void) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n}\n";

// test/src/test2.js
console.log(test2_default);
