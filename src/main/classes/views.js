const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const VIEWS = {
    'authorize': __dirname + "/../views/partials/authorize.hbs",
    'not_ready': __dirname + "/../views/partials/notReady.hbs",
};

class Views {
    constructor() {
        this.compiled = {};
    }

    getView(name, data) {
        if (!Object.keys(this.compiled).includes(name))
            throw new Error(`Requested view ${name} does NOT exist.`);

        let template = this._getCompiledTemplate(name);
        return template(data);
    }

    _getCompiledTemplate(tmplName) {
        if (Object.keys(this.compiled).includes(tmplName))
            return this.compiled[tmplName];

        let _path = VIEWS[tmplName];
        let source = fs.readFileSync(path.resolve(_path)).toString();
        let template = handlebars.compile(source);

        return this.compiled[tmplName] = template;
    }
}

module.exports = Views;