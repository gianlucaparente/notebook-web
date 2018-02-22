const grunt = require("grunt");

function defaultTask() {
    grunt.log.writeln("This is default Task.")
}

module.exports = defaultTask;