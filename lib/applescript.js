var spawn = require("child_process").spawn;
var parse = require("./applescript-parser").parse;

// Path to 'osascript'. By default search PATH.
exports.osascript = "osascript";

// Execute a *.applescript file.
exports.execFile = function execFile(file, args, callback) {
  if (!Array.isArray(args)) {
    callback = args;
    args = [];
  }
  return runApplescript(file, args, callback);
}

// Execute a String as AppleScript.
exports.execString = function execString(str, callback) {
  return runApplescript(str, callback);
}



function runApplescript(strOrPath, args, callback) {
  var isString = false;
  if (!Array.isArray(args)) {
    callback = args;
    args = [];
    isString = true;
  }
  
  // args get added in reverse order with 'unshift'
  if (!isString) {
    // The name of the file is the final arg if 'execFile' was called.
    args.unshift(strOrPath);
  }
  args.unshift("-ss"); // To output machine-readable text.
  var interpreter = spawn(exports.osascript, args);
  
  var stdout = "";
  interpreter.stdout.on('data', function (data) {
    stdout += data;
  });

  var stderr = "";
  interpreter.stderr.on('data', function (data) {
    stderr += data;
  });

  interpreter.on('exit', function (code) {
    var result = parse(stdout);
    callback(code, result, stderr);
  });
  
  if (isString) {
    // Write the given applescript String to stdin if 'execString' was called.
    interpreter.stdin.write(strOrPath);
    interpreter.stdin.end();
  }
}