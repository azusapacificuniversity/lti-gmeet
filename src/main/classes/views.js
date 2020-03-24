const handlebars = require('handlebars');

const VIEWS = {
    'authorize': "./../views/partials/authorize.hbs",
    'not_ready': "./../views/partials/notReady.hbs",
};

class Views {
    constructor() {
        this.compiled = {};
    }

    getView(name, data) {
        if (!compiled.keys.includes(tmplName))
            throw new Error(`Requested view ${name} does NOT exist.`);

        let template = this._getCompiledTemplate(name);
        return template(data);
    }

    _getCompiledTemplate(tmplName) {
        if (this.compiled.keys.includes(tmplName))
            return this.compiled[tmplName];

        let _path = VIEWS[tmplName];
        let source = fs.readFileSync(path.resolve(_path)).toString();
        let template = handlebars.compile(source);

        return this.compiled[tmplName] = template;
    }
}

module.exports = Views;
