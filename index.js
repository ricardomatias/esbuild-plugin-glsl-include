import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';

const glsl = () => ({
    name: 'glsl-include',
    setup(build) {
        const readFile = util.promisify(fs.readFile);
        const cache = new Map();

        async function onLoad(args) {
            const includes = [];
            const warnings = [];
            const watchFiles = new Set();
            let source = await readFile(args.path, 'utf8');

            cache.set(args.path, source);

            const importPattern = /#include "([.\/\w_-]+)"/gi;
            let match = importPattern.exec(source);

            while (match != null) {
                const pragma = match[0];
                const filename = match[1];
                const file = path.join(path.dirname(args.path), filename);
                
                try {
                    let contents = cache.get(file);

                    if (!contents) {
                        contents = fs.readFileSync(file, 'utf8');
                        cache.set(file, contents);
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
                        }
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
            
            return {
                contents: source,
                warnings,
                // watchFiles: [...watchFiles],
                loader: 'text',
            };
        }

        build.onLoad({ filter: /\.(?:frag|vert|glsl|fs|vs)$/ }, onLoad);
    },
});

export { glsl as default, glsl };
