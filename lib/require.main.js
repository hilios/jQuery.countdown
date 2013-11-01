requirejs.config({
    // http://requirejs.org/docs/api.html#config-baseUrl
    baseUrl: "../lib",
    // http://requirejs.org/docs/jquery.html#noconflictmap
    map: {
        "*": { "jquery": "jquery.private" },
        "jquery.private": { "jquery": "jquery" }
    }
});