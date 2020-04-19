const remark = require('remark');
const frontmatter = require('remark-frontmatter');
const fs = require('fs');
const yaml = require('yaml');
const extract = require('remark-extract-frontmatter');
const glob = require('glob');
const config = yaml.parse(fs.readFileSync('_config.yml').toString());
const path = require('path');

function filterChildren(opts) {
    return (tree) => {
        return Object.assign({}, tree, {
            children: tree.children.filter(opts.filter)
        })
    }
}

glob(`./${config.source_dir}/_posts/**/*.md`, (err, filepaths) => {
    if (err) {
        throw err;
    }
    filepaths.forEach((filepath) => {
        splitMeta(filepath);
    })
});

function splitMeta(filepath) {
    const doc = fs.readFileSync(filepath);
    const metapath = path.join(path.dirname(filepath), path.basename(filepath, '.md') + '.meta.json');

    remark()
        .use(frontmatter, ['yaml', 'toml'])
        .use(extract, { yaml: yaml.parse })
        .use(filterChildren, { filter: c => c.type !== 'yaml' && c.type !== 'toml' })
        .process(doc, function (err, file) {
            fs.writeFileSync(filepath, file.toString());
            fs.writeFileSync(metapath, JSON.stringify(file.data, null, 2));
        });
}

