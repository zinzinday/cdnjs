if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/color-base/color-base.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/color-base/color-base.js",
    code: []
};
_yuitest_coverage["build/color-base/color-base.js"].code=["YUI.add('color-base', function (Y, NAME) {","","/**","Color provides static methods for color conversion.","","    Y.Color.toRGB('f00'); // rgb(255, 0, 0)","","    Y.Color.toHex('rgb(255, 255, 0)'); // #ffff00","","","@module color","@submodule color-base","@class Base","@namespace Color","@since 3.8.0","**/","","var REGEX_HEX = /^#?([\\da-fA-F]{2})([\\da-fA-F]{2})([\\da-fA-F]{2})/,","    REGEX_HEX3 = /^#?([\\da-fA-F]{1})([\\da-fA-F]{1})([\\da-fA-F]{1})/,","    REGEX_RGB = /rgba?\\(([\\d]{1,3}), ?([\\d]{1,3}), ?([\\d]{1,3}),? ?([.\\d]*)?\\)/,","    TYPES = { 'HEX': 'hex', 'RGB': 'rgb', 'RGBA': 'rgba' },","    CONVERTS = { 'hex': 'toHex', 'rgb': 'toRGB', 'rgba': 'toRGBA' };","","","Y.Color = {","    /**","    @static","    @property KEYWORDS","    @type Object","    @since 3.8.0","    **/","    KEYWORDS: {","        'black': '000', 'silver': 'c0c0c0', 'gray': '808080', 'white': 'fff',","        'maroon': '800000', 'red': 'f00', 'purple': '800080', 'fuchsia': 'f0f',","        'green': '008000', 'lime': '0f0', 'olive': '808000', 'yellow': 'ff0',","        'navy': '000080', 'blue': '00f', 'teal': '008080', 'aqua': '0ff'","    },","","    /**","    @static","    @property REGEX_HEX","    @type RegExp","    @default /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/","    @since 3.8.0","    **/","    REGEX_HEX: REGEX_HEX,","","    /**","    @static","    @property REGEX_HEX3","    @type RegExp","    @default /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})/","    @since 3.8.0","    **/","    REGEX_HEX3: REGEX_HEX3,","","    /**","    @static","    @property REGEX_RGB","    @type RegExp","    @default /rgba?\\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3}),? ?([.0-9]{1,3})?\\)/","    @since 3.8.0","    **/","    REGEX_RGB: REGEX_RGB,","","    re_RGB: REGEX_RGB,","","    re_hex: REGEX_HEX,","","    re_hex3: REGEX_HEX3,","","    /**","    @static","    @property STR_HEX","    @type String","    @default #{*}{*}{*}","    @since 3.8.0","    **/","    STR_HEX: '#{*}{*}{*}',","","    /**","    @static","    @property STR_RGB","    @type String","    @default rgb({*}, {*}, {*})","    @since 3.8.0","    **/","    STR_RGB: 'rgb({*}, {*}, {*})',","","    /**","    @static","    @property STR_RGBA","    @type String","    @default rgba({*}, {*}, {*}, {*})","    @since 3.8.0","    **/","    STR_RGBA: 'rgba({*}, {*}, {*}, {*})',","","    /**","    @static","    @property TYPES","    @type Object","    @default {'rgb':'rgb', 'rgba':'rgba'}","    @since 3.8.0","    **/","    TYPES: TYPES,","","    /**","    @static","    @property CONVERTS","    @type Object","    @default {}","    @since 3.8.0","    **/","    CONVERTS: CONVERTS,","","    /**","    @public","    @method convert","    @param {String} str","    @param {String} to","    @return {String}","    @since 3.8.0","    **/","    convert: function (str, to) {","        // check for a toXXX conversion method first","        // if it doesn't exist, use the toXxx conversion method","        var convert = Y.Color.CONVERTS[to],","            clr = Y.Color[convert](str);","","        return clr.toLowerCase();","    },","","    /**","    Converts provided color value to a hex value string","    @public","    @method toHex","    @param {String} str Hex or RGB value string","    @return {String} returns array of values or CSS string if options.css is true","    @since 3.8.0","    **/","    toHex: function (str) {","        var clr = Y.Color._convertTo(str, 'hex');","        return clr.toLowerCase();","    },","","    /**","    Converts provided color value to an RGB value string","    @public","    @method toRGB","    @param {String} str Hex or RGB value string","    @return {String}","    @since 3.8.0","    **/","    toRGB: function (str) {","        var clr = Y.Color._convertTo(str, 'rgb');","        return clr.toLowerCase();","    },","","    /**","    Converts provided color value to an RGB value string","    @public","    @method toRGBA","    @param {String} str Hex or RGB value string","    @return {String}","    @since 3.8.0","    **/","    toRGBA: function (str) {","        var clr = Y.Color._convertTo(str, 'rgba' );","        return clr.toLowerCase();","    },","","    /**","    Converts the provided color string to an array of values. Will","        return an empty array if the provided string is not able","        to be parsed.","    @public","    @method toArray","    @param {String} str","    @return {Array}","    @since 3.8.0","    **/","    toArray: function(str) {","        // parse with regex and return \"matches\" array","        var type = Y.Color.findType(str).toUpperCase(),","            regex,","            arr;","","        if (type === 'HEX' && str.length < 5) {","            type = 'HEX3';","        }","","        if (type[type.length - 1] === 'A') {","            type = type.slice(0, -1);","        }","        regex = Y.Color['REGEX_' + type];","        if (regex) {","            arr = regex.exec(str) || [];","","            if (arr.length) {","                arr.shift();","","                if (typeof arr[arr.length - 1] === 'undefined') {","                    arr[arr.length - 1] = 1;","                }","            }","        }","","        return arr;","","    },","","    /**","    Converts the array of values to a string based on the provided template.","    @public","    @method fromArray","    @param {Array} arr","    @param {String} template","    @return {String}","    @since 3.8.0","    **/","    fromArray: function(arr, template) {","        arr = arr.concat();","","        if (typeof template === 'undefined') {","            return arr.join(', ');","        }","","        var replace = '{*}';","","        template = Y.Color['STR_' + template.toUpperCase()];","","        if (arr.length === 3 && template.match(/\\{\\*\\}/g).length === 4) {","            arr.push(1);","        }","","        while ( template.indexOf(replace) >= 0 && arr.length > 0) {","            template = template.replace(replace, arr.shift());","        }","","        return template;","    },","","    /**","    Finds the value type based on the str value provided.","    @public","    @method findType","    @param {String} str","    @return {String}","    @since 3.8.0","    **/","    findType: function (str) {","        if (Y.Color.KEYWORDS[str]) {","            return 'keyword';","        }","","        var index = str.indexOf('('),","            key;","","        if (index > 0) {","            key = str.substr(0, index);","        }","","        if (key && Y.Color.TYPES[key.toUpperCase()]) {","            return Y.Color.TYPES[key.toUpperCase()];","        }","","        return 'hex';","","    }, // return 'keyword', 'hex', 'rgb'","","    /**","    Retrives the alpha channel from the provided string. If no alpha","        channel is present, `1` will be returned.","    @protected","    @method _getAlpha","    @param {String} clr","    @return {Number}","    @since 3.8.0","    **/","    _getAlpha: function (clr) {","        var alpha,","            arr = Y.Color.toArray(clr);","","        if (arr.length > 3) {","            alpha = arr.pop();","        }","","        return +alpha || 1;","    },","","    /**","    Returns the hex value string if found in the KEYWORDS object","    @protected","    @method _keywordToHex","    @param {String} clr","    @return {String}","    @since 3.8.0","    **/","    _keywordToHex: function (clr) {","        var keyword = Y.Color.KEYWORDS[clr];","","        if (keyword) {","            return keyword;","        }","    },","","    /**","    Converts the provided color string to the value type provided as `to`","    @protected","    @method _convertTo","    @param {String} clr","    @param {String} to","    @return {String}","    @since 3.8.0","    **/","    _convertTo: function(clr, to) {","        var from = Y.Color.findType(clr),","            originalTo = to,","            needsAlpha,","            alpha,","            method,","            ucTo;","","        if (from === 'keyword') {","            clr = Y.Color._keywordToHex(clr);","            from = 'hex';","        }","","        if (from === 'hex' && clr.length < 5) {","            if (clr[0] === '#') {","                clr = clr.substr(1);","            }","","            clr = '#' + clr[0] + clr[0] + clr[1] + clr[1] + clr[2] + clr[2];","        }","","        if (from === to) {","            return clr;","        }","","        if (from[from.length - 1] === 'a') {","            from = from.slice(0, -1);","        }","","        needsAlpha = (to[to.length - 1] === 'a');","        if (needsAlpha) {","            to = to.slice(0, -1);","            alpha = Y.Color._getAlpha(clr);","        }","","        ucTo = to[0].toUpperCase() + to.substr(1).toLowerCase();","        method = Y.Color['_' + from + 'To' + ucTo ];","","        // check to see if need conversion to rgb first","        // check to see if there is a direct conversion method","        // convertions are: hex <-> rgb <-> hsl","        if (!method) {","            if (from !== 'rgb' && to !== 'rgb') {","                clr = Y.Color['_' + from + 'ToRgb'](clr);","                from = 'rgb';","                method = Y.Color['_' + from + 'To' + ucTo ];","            }","        }","","        if (method) {","            clr = ((method)(clr, needsAlpha));","        }","","        // process clr from arrays to strings after conversions if alpha is needed","        if (needsAlpha) {","            if (!Y.Lang.isArray(clr)) {","                clr = Y.Color.toArray(clr);","            }","            clr.push(alpha);","            clr = Y.Color.fromArray(clr, originalTo.toUpperCase());","        }","","        return clr;","    },","","    /**","    Processes the hex string into r, g, b values. Will return values as","        an array, or as an rgb string.","    @protected","    @method _hexToRgb","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _hexToRgb: function (str, toArray) {","        var r, g, b;","","        /*jshint bitwise:false*/","        if (str.charAt(0) === '#') {","            str = str.substr(1);","        }","","        str = parseInt(str, 16);","","        r = str >> 16;","        g = str >> 8 & 0xFF;","        b = str & 0xFF;","","        if (toArray) {","            return [r, g, b];","        }","","        return 'rgb(' + r + ', ' + g + ', ' + b + ')';","    },","","    /**","    Processes the rgb string into r, g, b values. Will return values as","        an array, or as a hex string.","    @protected","    @method _rgbToHex","    @param {String} str","    @param {Boolean} [toArray]","    @return {String|Array}","    @since 3.8.0","    **/","    _rgbToHex: function (str) {","        /*jshint bitwise:false*/","        var rgb = Y.Color.toArray(str),","            hex = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);","","        hex = (+hex).toString(16);","","        while (hex.length < 6) {","            hex = '0' + hex;","        }","","        return '#' + hex;","    }","","};","","","","}, '@VERSION@', {\"requires\": [\"yui-base\"]});"];
_yuitest_coverage["build/color-base/color-base.js"].lines = {"1":0,"18":0,"25":0,"128":0,"131":0,"143":0,"144":0,"156":0,"157":0,"169":0,"170":0,"185":0,"189":0,"190":0,"193":0,"194":0,"196":0,"197":0,"198":0,"200":0,"201":0,"203":0,"204":0,"209":0,"223":0,"225":0,"226":0,"229":0,"231":0,"233":0,"234":0,"237":0,"238":0,"241":0,"253":0,"254":0,"257":0,"260":0,"261":0,"264":0,"265":0,"268":0,"282":0,"285":0,"286":0,"289":0,"301":0,"303":0,"304":0,"318":0,"325":0,"326":0,"327":0,"330":0,"331":0,"332":0,"335":0,"338":0,"339":0,"342":0,"343":0,"346":0,"347":0,"348":0,"349":0,"352":0,"353":0,"358":0,"359":0,"360":0,"361":0,"362":0,"366":0,"367":0,"371":0,"372":0,"373":0,"375":0,"376":0,"379":0,"393":0,"396":0,"397":0,"400":0,"402":0,"403":0,"404":0,"406":0,"407":0,"410":0,"425":0,"428":0,"430":0,"431":0,"434":0};
_yuitest_coverage["build/color-base/color-base.js"].functions = {"convert:125":0,"toHex:142":0,"toRGB:155":0,"toRGBA:168":0,"toArray:183":0,"fromArray:222":0,"findType:252":0,"_getAlpha:281":0,"_keywordToHex:300":0,"_convertTo:317":0,"_hexToRgb:392":0,"_rgbToHex:423":0,"(anonymous 1):1":0};
_yuitest_coverage["build/color-base/color-base.js"].coveredLines = 95;
_yuitest_coverage["build/color-base/color-base.js"].coveredFunctions = 13;
_yuitest_coverline("build/color-base/color-base.js", 1);
YUI.add('color-base', function (Y, NAME) {

/**
Color provides static methods for color conversion.

    Y.Color.toRGB('f00'); // rgb(255, 0, 0)

    Y.Color.toHex('rgb(255, 255, 0)'); // #ffff00


@module color
@submodule color-base
@class Base
@namespace Color
@since 3.8.0
**/

_yuitest_coverfunc("build/color-base/color-base.js", "(anonymous 1)", 1);
_yuitest_coverline("build/color-base/color-base.js", 18);
var REGEX_HEX = /^#?([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/,
    REGEX_HEX3 = /^#?([\da-fA-F]{1})([\da-fA-F]{1})([\da-fA-F]{1})/,
    REGEX_RGB = /rgba?\(([\d]{1,3}), ?([\d]{1,3}), ?([\d]{1,3}),? ?([.\d]*)?\)/,
    TYPES = { 'HEX': 'hex', 'RGB': 'rgb', 'RGBA': 'rgba' },
    CONVERTS = { 'hex': 'toHex', 'rgb': 'toRGB', 'rgba': 'toRGBA' };


_yuitest_coverline("build/color-base/color-base.js", 25);
Y.Color = {
    /**
    @static
    @property KEYWORDS
    @type Object
    @since 3.8.0
    **/
    KEYWORDS: {
        'black': '000', 'silver': 'c0c0c0', 'gray': '808080', 'white': 'fff',
        'maroon': '800000', 'red': 'f00', 'purple': '800080', 'fuchsia': 'f0f',
        'green': '008000', 'lime': '0f0', 'olive': '808000', 'yellow': 'ff0',
        'navy': '000080', 'blue': '00f', 'teal': '008080', 'aqua': '0ff'
    },

    /**
    @static
    @property REGEX_HEX
    @type RegExp
    @default /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/
    @since 3.8.0
    **/
    REGEX_HEX: REGEX_HEX,

    /**
    @static
    @property REGEX_HEX3
    @type RegExp
    @default /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})/
    @since 3.8.0
    **/
    REGEX_HEX3: REGEX_HEX3,

    /**
    @static
    @property REGEX_RGB
    @type RegExp
    @default /rgba?\(([0-9]{1,3}), ?([0-9]{1,3}), ?([0-9]{1,3}),? ?([.0-9]{1,3})?\)/
    @since 3.8.0
    **/
    REGEX_RGB: REGEX_RGB,

    re_RGB: REGEX_RGB,

    re_hex: REGEX_HEX,

    re_hex3: REGEX_HEX3,

    /**
    @static
    @property STR_HEX
    @type String
    @default #{*}{*}{*}
    @since 3.8.0
    **/
    STR_HEX: '#{*}{*}{*}',

    /**
    @static
    @property STR_RGB
    @type String
    @default rgb({*}, {*}, {*})
    @since 3.8.0
    **/
    STR_RGB: 'rgb({*}, {*}, {*})',

    /**
    @static
    @property STR_RGBA
    @type String
    @default rgba({*}, {*}, {*}, {*})
    @since 3.8.0
    **/
    STR_RGBA: 'rgba({*}, {*}, {*}, {*})',

    /**
    @static
    @property TYPES
    @type Object
    @default {'rgb':'rgb', 'rgba':'rgba'}
    @since 3.8.0
    **/
    TYPES: TYPES,

    /**
    @static
    @property CONVERTS
    @type Object
    @default {}
    @since 3.8.0
    **/
    CONVERTS: CONVERTS,

    /**
    @public
    @method convert
    @param {String} str
    @param {String} to
    @return {String}
    @since 3.8.0
    **/
    convert: function (str, to) {
        // check for a toXXX conversion method first
        // if it doesn't exist, use the toXxx conversion method
        _yuitest_coverfunc("build/color-base/color-base.js", "convert", 125);
_yuitest_coverline("build/color-base/color-base.js", 128);
var convert = Y.Color.CONVERTS[to],
            clr = Y.Color[convert](str);

        _yuitest_coverline("build/color-base/color-base.js", 131);
return clr.toLowerCase();
    },

    /**
    Converts provided color value to a hex value string
    @public
    @method toHex
    @param {String} str Hex or RGB value string
    @return {String} returns array of values or CSS string if options.css is true
    @since 3.8.0
    **/
    toHex: function (str) {
        _yuitest_coverfunc("build/color-base/color-base.js", "toHex", 142);
_yuitest_coverline("build/color-base/color-base.js", 143);
var clr = Y.Color._convertTo(str, 'hex');
        _yuitest_coverline("build/color-base/color-base.js", 144);
return clr.toLowerCase();
    },

    /**
    Converts provided color value to an RGB value string
    @public
    @method toRGB
    @param {String} str Hex or RGB value string
    @return {String}
    @since 3.8.0
    **/
    toRGB: function (str) {
        _yuitest_coverfunc("build/color-base/color-base.js", "toRGB", 155);
_yuitest_coverline("build/color-base/color-base.js", 156);
var clr = Y.Color._convertTo(str, 'rgb');
        _yuitest_coverline("build/color-base/color-base.js", 157);
return clr.toLowerCase();
    },

    /**
    Converts provided color value to an RGB value string
    @public
    @method toRGBA
    @param {String} str Hex or RGB value string
    @return {String}
    @since 3.8.0
    **/
    toRGBA: function (str) {
        _yuitest_coverfunc("build/color-base/color-base.js", "toRGBA", 168);
_yuitest_coverline("build/color-base/color-base.js", 169);
var clr = Y.Color._convertTo(str, 'rgba' );
        _yuitest_coverline("build/color-base/color-base.js", 170);
return clr.toLowerCase();
    },

    /**
    Converts the provided color string to an array of values. Will
        return an empty array if the provided string is not able
        to be parsed.
    @public
    @method toArray
    @param {String} str
    @return {Array}
    @since 3.8.0
    **/
    toArray: function(str) {
        // parse with regex and return "matches" array
        _yuitest_coverfunc("build/color-base/color-base.js", "toArray", 183);
_yuitest_coverline("build/color-base/color-base.js", 185);
var type = Y.Color.findType(str).toUpperCase(),
            regex,
            arr;

        _yuitest_coverline("build/color-base/color-base.js", 189);
if (type === 'HEX' && str.length < 5) {
            _yuitest_coverline("build/color-base/color-base.js", 190);
type = 'HEX3';
        }

        _yuitest_coverline("build/color-base/color-base.js", 193);
if (type[type.length - 1] === 'A') {
            _yuitest_coverline("build/color-base/color-base.js", 194);
type = type.slice(0, -1);
        }
        _yuitest_coverline("build/color-base/color-base.js", 196);
regex = Y.Color['REGEX_' + type];
        _yuitest_coverline("build/color-base/color-base.js", 197);
if (regex) {
            _yuitest_coverline("build/color-base/color-base.js", 198);
arr = regex.exec(str) || [];

            _yuitest_coverline("build/color-base/color-base.js", 200);
if (arr.length) {
                _yuitest_coverline("build/color-base/color-base.js", 201);
arr.shift();

                _yuitest_coverline("build/color-base/color-base.js", 203);
if (typeof arr[arr.length - 1] === 'undefined') {
                    _yuitest_coverline("build/color-base/color-base.js", 204);
arr[arr.length - 1] = 1;
                }
            }
        }

        _yuitest_coverline("build/color-base/color-base.js", 209);
return arr;

    },

    /**
    Converts the array of values to a string based on the provided template.
    @public
    @method fromArray
    @param {Array} arr
    @param {String} template
    @return {String}
    @since 3.8.0
    **/
    fromArray: function(arr, template) {
        _yuitest_coverfunc("build/color-base/color-base.js", "fromArray", 222);
_yuitest_coverline("build/color-base/color-base.js", 223);
arr = arr.concat();

        _yuitest_coverline("build/color-base/color-base.js", 225);
if (typeof template === 'undefined') {
            _yuitest_coverline("build/color-base/color-base.js", 226);
return arr.join(', ');
        }

        _yuitest_coverline("build/color-base/color-base.js", 229);
var replace = '{*}';

        _yuitest_coverline("build/color-base/color-base.js", 231);
template = Y.Color['STR_' + template.toUpperCase()];

        _yuitest_coverline("build/color-base/color-base.js", 233);
if (arr.length === 3 && template.match(/\{\*\}/g).length === 4) {
            _yuitest_coverline("build/color-base/color-base.js", 234);
arr.push(1);
        }

        _yuitest_coverline("build/color-base/color-base.js", 237);
while ( template.indexOf(replace) >= 0 && arr.length > 0) {
            _yuitest_coverline("build/color-base/color-base.js", 238);
template = template.replace(replace, arr.shift());
        }

        _yuitest_coverline("build/color-base/color-base.js", 241);
return template;
    },

    /**
    Finds the value type based on the str value provided.
    @public
    @method findType
    @param {String} str
    @return {String}
    @since 3.8.0
    **/
    findType: function (str) {
        _yuitest_coverfunc("build/color-base/color-base.js", "findType", 252);
_yuitest_coverline("build/color-base/color-base.js", 253);
if (Y.Color.KEYWORDS[str]) {
            _yuitest_coverline("build/color-base/color-base.js", 254);
return 'keyword';
        }

        _yuitest_coverline("build/color-base/color-base.js", 257);
var index = str.indexOf('('),
            key;

        _yuitest_coverline("build/color-base/color-base.js", 260);
if (index > 0) {
            _yuitest_coverline("build/color-base/color-base.js", 261);
key = str.substr(0, index);
        }

        _yuitest_coverline("build/color-base/color-base.js", 264);
if (key && Y.Color.TYPES[key.toUpperCase()]) {
            _yuitest_coverline("build/color-base/color-base.js", 265);
return Y.Color.TYPES[key.toUpperCase()];
        }

        _yuitest_coverline("build/color-base/color-base.js", 268);
return 'hex';

    }, // return 'keyword', 'hex', 'rgb'

    /**
    Retrives the alpha channel from the provided string. If no alpha
        channel is present, `1` will be returned.
    @protected
    @method _getAlpha
    @param {String} clr
    @return {Number}
    @since 3.8.0
    **/
    _getAlpha: function (clr) {
        _yuitest_coverfunc("build/color-base/color-base.js", "_getAlpha", 281);
_yuitest_coverline("build/color-base/color-base.js", 282);
var alpha,
            arr = Y.Color.toArray(clr);

        _yuitest_coverline("build/color-base/color-base.js", 285);
if (arr.length > 3) {
            _yuitest_coverline("build/color-base/color-base.js", 286);
alpha = arr.pop();
        }

        _yuitest_coverline("build/color-base/color-base.js", 289);
return +alpha || 1;
    },

    /**
    Returns the hex value string if found in the KEYWORDS object
    @protected
    @method _keywordToHex
    @param {String} clr
    @return {String}
    @since 3.8.0
    **/
    _keywordToHex: function (clr) {
        _yuitest_coverfunc("build/color-base/color-base.js", "_keywordToHex", 300);
_yuitest_coverline("build/color-base/color-base.js", 301);
var keyword = Y.Color.KEYWORDS[clr];

        _yuitest_coverline("build/color-base/color-base.js", 303);
if (keyword) {
            _yuitest_coverline("build/color-base/color-base.js", 304);
return keyword;
        }
    },

    /**
    Converts the provided color string to the value type provided as `to`
    @protected
    @method _convertTo
    @param {String} clr
    @param {String} to
    @return {String}
    @since 3.8.0
    **/
    _convertTo: function(clr, to) {
        _yuitest_coverfunc("build/color-base/color-base.js", "_convertTo", 317);
_yuitest_coverline("build/color-base/color-base.js", 318);
var from = Y.Color.findType(clr),
            originalTo = to,
            needsAlpha,
            alpha,
            method,
            ucTo;

        _yuitest_coverline("build/color-base/color-base.js", 325);
if (from === 'keyword') {
            _yuitest_coverline("build/color-base/color-base.js", 326);
clr = Y.Color._keywordToHex(clr);
            _yuitest_coverline("build/color-base/color-base.js", 327);
from = 'hex';
        }

        _yuitest_coverline("build/color-base/color-base.js", 330);
if (from === 'hex' && clr.length < 5) {
            _yuitest_coverline("build/color-base/color-base.js", 331);
if (clr[0] === '#') {
                _yuitest_coverline("build/color-base/color-base.js", 332);
clr = clr.substr(1);
            }

            _yuitest_coverline("build/color-base/color-base.js", 335);
clr = '#' + clr[0] + clr[0] + clr[1] + clr[1] + clr[2] + clr[2];
        }

        _yuitest_coverline("build/color-base/color-base.js", 338);
if (from === to) {
            _yuitest_coverline("build/color-base/color-base.js", 339);
return clr;
        }

        _yuitest_coverline("build/color-base/color-base.js", 342);
if (from[from.length - 1] === 'a') {
            _yuitest_coverline("build/color-base/color-base.js", 343);
from = from.slice(0, -1);
        }

        _yuitest_coverline("build/color-base/color-base.js", 346);
needsAlpha = (to[to.length - 1] === 'a');
        _yuitest_coverline("build/color-base/color-base.js", 347);
if (needsAlpha) {
            _yuitest_coverline("build/color-base/color-base.js", 348);
to = to.slice(0, -1);
            _yuitest_coverline("build/color-base/color-base.js", 349);
alpha = Y.Color._getAlpha(clr);
        }

        _yuitest_coverline("build/color-base/color-base.js", 352);
ucTo = to[0].toUpperCase() + to.substr(1).toLowerCase();
        _yuitest_coverline("build/color-base/color-base.js", 353);
method = Y.Color['_' + from + 'To' + ucTo ];

        // check to see if need conversion to rgb first
        // check to see if there is a direct conversion method
        // convertions are: hex <-> rgb <-> hsl
        _yuitest_coverline("build/color-base/color-base.js", 358);
if (!method) {
            _yuitest_coverline("build/color-base/color-base.js", 359);
if (from !== 'rgb' && to !== 'rgb') {
                _yuitest_coverline("build/color-base/color-base.js", 360);
clr = Y.Color['_' + from + 'ToRgb'](clr);
                _yuitest_coverline("build/color-base/color-base.js", 361);
from = 'rgb';
                _yuitest_coverline("build/color-base/color-base.js", 362);
method = Y.Color['_' + from + 'To' + ucTo ];
            }
        }

        _yuitest_coverline("build/color-base/color-base.js", 366);
if (method) {
            _yuitest_coverline("build/color-base/color-base.js", 367);
clr = ((method)(clr, needsAlpha));
        }

        // process clr from arrays to strings after conversions if alpha is needed
        _yuitest_coverline("build/color-base/color-base.js", 371);
if (needsAlpha) {
            _yuitest_coverline("build/color-base/color-base.js", 372);
if (!Y.Lang.isArray(clr)) {
                _yuitest_coverline("build/color-base/color-base.js", 373);
clr = Y.Color.toArray(clr);
            }
            _yuitest_coverline("build/color-base/color-base.js", 375);
clr.push(alpha);
            _yuitest_coverline("build/color-base/color-base.js", 376);
clr = Y.Color.fromArray(clr, originalTo.toUpperCase());
        }

        _yuitest_coverline("build/color-base/color-base.js", 379);
return clr;
    },

    /**
    Processes the hex string into r, g, b values. Will return values as
        an array, or as an rgb string.
    @protected
    @method _hexToRgb
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _hexToRgb: function (str, toArray) {
        _yuitest_coverfunc("build/color-base/color-base.js", "_hexToRgb", 392);
_yuitest_coverline("build/color-base/color-base.js", 393);
var r, g, b;

        /*jshint bitwise:false*/
        _yuitest_coverline("build/color-base/color-base.js", 396);
if (str.charAt(0) === '#') {
            _yuitest_coverline("build/color-base/color-base.js", 397);
str = str.substr(1);
        }

        _yuitest_coverline("build/color-base/color-base.js", 400);
str = parseInt(str, 16);

        _yuitest_coverline("build/color-base/color-base.js", 402);
r = str >> 16;
        _yuitest_coverline("build/color-base/color-base.js", 403);
g = str >> 8 & 0xFF;
        _yuitest_coverline("build/color-base/color-base.js", 404);
b = str & 0xFF;

        _yuitest_coverline("build/color-base/color-base.js", 406);
if (toArray) {
            _yuitest_coverline("build/color-base/color-base.js", 407);
return [r, g, b];
        }

        _yuitest_coverline("build/color-base/color-base.js", 410);
return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    },

    /**
    Processes the rgb string into r, g, b values. Will return values as
        an array, or as a hex string.
    @protected
    @method _rgbToHex
    @param {String} str
    @param {Boolean} [toArray]
    @return {String|Array}
    @since 3.8.0
    **/
    _rgbToHex: function (str) {
        /*jshint bitwise:false*/
        _yuitest_coverfunc("build/color-base/color-base.js", "_rgbToHex", 423);
_yuitest_coverline("build/color-base/color-base.js", 425);
var rgb = Y.Color.toArray(str),
            hex = rgb[2] | (rgb[1] << 8) | (rgb[0] << 16);

        _yuitest_coverline("build/color-base/color-base.js", 428);
hex = (+hex).toString(16);

        _yuitest_coverline("build/color-base/color-base.js", 430);
while (hex.length < 6) {
            _yuitest_coverline("build/color-base/color-base.js", 431);
hex = '0' + hex;
        }

        _yuitest_coverline("build/color-base/color-base.js", 434);
return '#' + hex;
    }

};



}, '@VERSION@', {"requires": ["yui-base"]});
