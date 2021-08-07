'use strict';

// see https://github.com/markdown-it/markdown-it#readme
// Live demo: https://markdown-it.github.io/

// full options list (defaults)
const markdown = require('markdown-it')({
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     false,        // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks:       false,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks. Can be
    // useful for external highlighters.
    linkify:      false,        // Autoconvert URL-like text to links
 
    // Enable some language-neutral replacement + quotes beautification
    typographer:  false,
 
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: '“”‘’',
 
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externally.
    // If result starts with <pre... internal wrapper is skipped.
    highlight: function (/*str, lang*/) { return ''; }
});

module.exports = markdown;
