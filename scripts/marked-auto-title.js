'use strict';

const marked = require('marked');
const moment = require('moment');

function filterPost(log, data) {
    const tokens = marked.lexer(data.content);

    let title;
    tokens.forEach((token) => {
        if (token.type === 'heading' && token.depth === 1) {
            if (title) {
                throw new Error(`title already exists (level 1 header is only one per document) in ${data.source}`)
            }
            title = token.text;
        }
    });
    data.title = title;
    if (data.published_at) {
        data.date = moment(new Date(data.published_at));
    }

    if (data.updated_at) {
        data.updated = moment(new Date(data.updated_at));
    }
}

hexo.extend.filter.register('before_post_render', function (data) {
    if (data.layout === 'post') {
        filterPost(this.log, data);
    }
    return data;
});

hexo.extend.filter.register('marked:renderer', function (renderer) {
    const heading = renderer.heading;
    renderer.heading = function (text, level) {
        if (level === 1) {
            return '';
        }
        return heading.apply(renderer, arguments);
    }
})