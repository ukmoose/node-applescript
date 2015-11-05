forked from @dfernandez79 branch of TooTallNate/node-applescript to fix bug in passing variables to Applescript
in main package but to take advantage of @dfernandez79 parser implementation to support more osascript outputs.



node-applescript
================

A high-level way to execute AppleScript code through NodeJS, and retrieve
the result as a native JavaScript object. Underneath the hood, this
module is just a simple wrapper around the OS X `osascript` command.

### Why?
AppleScripts are the only way to communicate and interact with certain
external OS X processes, for example [iTunes](http://www.itunes.com).

Easy Install
------------

To install this scope

``` bash
~~npm install @ukmoose/applescript~~
```


Requirements
------------

 * Mac (or Hackintosh) running [OS X](http://www.apple.com/macosx) (tested with El Capitan)
 * [NodeJS](http://nodejs.org) (v0.2.0 or newer)

Usage
-----

The `node-applescript` module provides `execString` and `execFile` functions
to easily execute AppleScript commands and buffer the output into a calback.

``` js
var applescript = require("applescript");

// Very basic AppleScript command. Returns the song name of each
// currently selected track in iTunes as an 'Array' of 'String's.
var script = 'tell application "iTunes" to get name of selection';

applescript.execString(script, function(err, rtn) {
  if (err) {
    // Something went wrong!
  }
  if (Array.isArray(rtn)) {
    rtn.forEach(function(songName) {
      console.log(songName);
    });
  }
});
```

`execFile` works the exact same way, except you pass the _path_ of the AppleScript
(`*.applescript`) file as the first argument instead of the command itself, and you
may pass an optional Array of String arguments to send to the applescript file.


The following applescript file shows the format you need to use to recieve the variables passed.
```applescript
on run argv
	set soundvolume to (item 1 of argv) --set sound volume to external volume
tell application "iTunes" to set the sound volume to soundvolume
end run
```





Licence
-------

The `node-applescript` module is licensed under the MIT license, of course!
