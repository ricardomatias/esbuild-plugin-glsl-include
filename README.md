# esbuild-plugin-glsl-include

A plugin for [esbuild](https://esbuild.github.io/) to import local shader fragments via `#include` pragma from GLSL files with `.glsl, .vert, .frag, .vs, .fs` extensions.

## Installation

```sh
npm install -D esbuild-plugin-glsl-include
```

## Usage

```js
import { build } from 'esbuild';
import { glsl } from 'esbuild-plugin-glsl-include';

build({
	entryPoints: ['src/app.js'],
	outfile: 'build/index.js',
	bundle: true,
	plugins: [
    glsl()
  ]
}).catch(() => process.exit(1));
```

## Example GLSL

```glsl
precision mediump float;

uniform sampler2D tex0;
uniform float uTime;

varying vec2 v_texCoord0;

#include "checkers.glsl"
#include "noise/classic/3d.glsl"
#include "easings/cubic-in-out.glsl"

void main() {
    vec2 uv = v_texCoord0;
    float n = perlin(vec3(uv * 2.5 + uTime * 0.01, uTime * 0.2)) * 0.5 + 0.5;

    float patt = checker(uv * easing(n), 6.0);

    vec3 col = mix(vec3(0.173, 0.216, 0.278),vec3(0.792, 0.282, 0.478), vec3(patt)) * (n + 0.1);

    gl_FragColor = vec4(col, 1.0);
}
```

