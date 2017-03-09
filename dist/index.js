"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var inferno_1 = require("inferno");
var h = require("inferno-create-element");
exports.default = h;
function renderer(dom) {
    var _dom = dom;
    return function (node, state, prev, actions) {
        if (node) {
            inferno_1.default.render(node(state, prev, actions), _dom);
        }
    };
}
exports.renderer = renderer;
