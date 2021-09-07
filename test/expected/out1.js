// test/src/test.glsl
var test_default = "#ifdef GL_ES\nprecision mediump float;\n#endif\n\nuniform vec2 u_resolution;\nuniform float u_time;\n\n#ifndef FNC_BLUE\n#define FNC_BLUE\n\nvec3 blue() {\n    return vec3(0.0, 0.0, 1.0);\n}\n\n#endif\n\n#ifndef FNC_RED\n#define FNC_RED\n\nvec3 red() {\n    return vec3(1.0, 0.0, 0.0);\n}\n\n#endif\n\n#ifndef FNC_GREEN\n#define FNC_GREEN\n\nvec3 green() {\n    return vec3(0.0, 1.0, 0.0);\n}\n\n#endif\n\n\nvoid main(void) {\n    gl_FragColor = vec4(vec3(0.0), 1.0);\n}\n";

// test/src/test1.js
console.log(test_default);
