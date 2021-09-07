import test from 'ava';
import esbuild from 'esbuild';
import * as fs from 'fs';
import * as util from 'util';
import { glsl } from '../index.js';

const EOL = /(?:\\r\\n|\\r|\\n)/g;
const readFile = util.promisify(fs.readFile);

test('can import files', (t) => {
    return esbuild.build({
        entryPoints: ['test/src/test1.js'],
        outfile: 'test/build/out1.js',
        platform: 'node',
        format: 'esm',
        bundle: true,
        plugins: [glsl()],
    }).then(async () => {
        const actual = await readFile('test/build/out1.js', 'utf8');
        const expected = await readFile('test/expected/out1.js', 'utf8');

        t.is(actual.replace(EOL, ''), expected.replace(EOL, ''));
    });
});


test('can import deep', (t) => {
    return esbuild
        .build({
            entryPoints: ['test/src/test3.js'],
            outfile: 'test/build/out3.js',
            platform: 'node',
            format: 'esm',
            bundle: true,
            plugins: [glsl()],
        })
        .then(async () => {
            const actual = await readFile('test/build/out3.js', 'utf8');
            const expected = await readFile('test/expected/out3.js', 'utf8');

            t.is(actual.replace(EOL, ''), expected.replace(EOL, ''));
        });
});

test('print warnings about missing imports', (t) => {
    return esbuild
        .build({
            entryPoints: ['test/src/test2.js'],
            outfile: 'test/build/out2.js',
            platform: 'node',
            format: 'esm',
            bundle: true,
            plugins: [glsl()],
        })
        .then(async () => {
            const actual = await readFile('test/build/out2.js', 'utf8');
            const expected = await readFile('test/expected/out2.js', 'utf8');

            t.is(actual.replace(EOL, ''), expected.replace(EOL, ''));
        });
});
