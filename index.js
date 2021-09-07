import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const readFile = util.promisify(fs.readFile);

const parse = async (filePath, cache) => {
    let source = await readFile(filePath, 'utf8');

    cache.set(filePath, source);

    const includes = [];
    const warnings = [];
    const watchFiles = new Set();
    const importPattern = /#include "([.\/\w_-]+)"/gi;
    let match = importPattern.exec(source);

    while (match != null) {
        const pragma = match[0];
        const filename = match[1];
        const file = path.join(path.dirname(filePath), filename);

        try {
            let contents = cache.get(file);

            if (!contents) {
                const inner = await parse(file, cache);

                inner.warnings.forEach((w) => warnings.push(w));
                inner.watchFiles.forEach((w) => watchFiles.add(w));

                contents = inner.source;
                cache.set(file, inner.source);
            }

            includes.push({
                file,
                contents,
                target: pragma,
            });

            watchFiles.add(file);

            match = importPattern.exec(source);
        } catch (err) {
            const lines = source.split(/\r|\n|\r\n/g);
            const lineIndex = lines.indexOf(match[0]);
            const lineText = lines[lineIndex];

            warnings.push({
                text: `File from <${match[0]}> not found`,
                location: {
                    file: filename,
                    line: lineIndex + 1,
                    length: filename.length,
                    column: lineText.indexOf(filename),
                    lineText,
                },
            });

            includes.push({
                file,
                contents: '',
                target: match[0],
            });

            match = importPattern.exec(source);
        }
    }

    for (let index = 0; index < includes.length; index++) {
        const include = includes[index];

        source = source.replace(include.target, include.contents);
    }

    return { source, warnings, watchFiles };
};

const glsl = () => ({
    name: 'glsl-include',
    setup(build) {

        async function onLoad(args) {
            const cache = new Map();

            const { source, warnings, watchFiles } = await parse(args.path, cache);

            return {
                contents: source,
                warnings,
                watchFiles: [...watchFiles],
                loader: 'text',
            };
        }

        build.onLoad({ filter: /\.(?:frag|vert|glsl|fs|vs)$/ }, onLoad);
    },
});

export { glsl as default, glsl };
