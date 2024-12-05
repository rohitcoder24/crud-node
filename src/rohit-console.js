const clc = require("cli-color");
// color chart numbers
// https://user-images.githubusercontent.com/122434/177136739-64a4bdd1-a1f5-453e-a7a0-55107bbd7922.png
// https://github.com/medikoo/cli-color

function log(str, details) {
    let msg = clc.xterm(0).bgXterm(7);
    console.log(msg('\n = = = = = LOG = = = = = = = = = = = =\n '));
    if (details) {
        console.count(str);
        console.log();
    }
    console.log(str);
    console.log(msg(' - - - - //LOG - - - - - - - - - - - - '));
}

function info(str, details) {
    let msg = clc.xterm(0).bgXterm(117);
    console.log(msg('\n = = = = = INFO = = = = = = = = = = = =\n '));
    if (details) {
        console.count(str);
        console.log();
    }
    console.log(str);
    console.log(msg(' - - - - //INFO - - - - - - - - - - - - '));
}

function warn(str, details) {
    let msg = clc.xterm(0).bgXterm(214);
    console.log(msg('\n = = = = = WARN = = = = = = = = = = = =\n '));
    if (details) {
        console.count(str);
        console.log();
    }
    console.log(str);
    console.log(msg(' - - - - //WARN - - - - - - - - - - - - '));
}

function err(str, details) {
    let msg = clc.xterm(0).bgXterm(9);
    console.log(msg('\n = = = = = ERROR = = = = = = = = = = = =\n '));
    if (details) {
        console.count(str);
        console.log();
    }
    console.log(str);
    console.log(msg(' - - - - //ERROR - - - - - - - - - - - - '));
}

function success(str, details) {
    let msg = clc.xterm(0).bgXterm(154);
    console.log(msg('\n = = = = = SUCCESS = = = = = = = = = = = =\n '));
    if (details) {
        console.count(str);
        console.log();
    }
    console.log(str);
    console.log(msg(' - - - - //SUCCESS - - - - - - - - - - - - '));
}

module.exports = {log, info, warn, err, success};