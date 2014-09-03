
# mocha-structured-reporter

Mocha reporter for generating log message in the mozlog results
format an dumping them to the console. The generated logs are intended to
be processed by mozlog. This use case expresses the current relationship
between the gaia build tests and mozharness, but may be useful to others.

[![Build
Status](https://travis-ci.org/chmanchester/mocha-structured-reporter.png?branch=master)](https://travis-ci.org/chmanchester/mocha-structured-reporter)

## Usage

You can use the mocha structured reporter to report your mocha test results!
To do so, give mocha the `--reporter mocha-structured-reporter` option.

## License

Copyright (c) 2014 Mozilla Foundation

Contributors:
    Gareth Aye <gaye@mozilla.com>
    Andrew Halberstadt <ahalberstadt@mozilla.com>
    Chris Manchester <cmanchester@mozilla.com>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
