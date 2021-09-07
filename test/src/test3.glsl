#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

#include "fragments/blue2.glsl"

void main(void) {
    gl_FragColor = vec4(vec3(0.0), 1.0);
}
