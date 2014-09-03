var Base = require('mocha').reporters.Base;

/**
 * Initialize a new socket reporter.
 * @constructor
 * @param {Runner} runner mocha test runner.
 */
function StructuredReporter(runner) {
  Base.call(this, runner);

  this.onEnd = this.onEnd.bind(this);
  runner.on('end', this.onEnd);
  this.onFail = this.onFail.bind(this);
  runner.on('fail', this.onFail);
  this.onPass = this.onPass.bind(this);
  runner.on('pass', this.onPass);
  this.onPending = this.onPending.bind(this);
  runner.on('pending', this.onPending);
  this.onSuite = this.onSuite.bind(this);
  runner.on('suite', this.onSuite);
  this.onSuiteEnd = this.onSuiteEnd.bind(this);
  runner.on('suite end', this.onSuiteEnd);

  this.status = 'PASS';
}

module.exports = StructuredReporter;


StructuredReporter.prototype = {
  __proto__: Base.prototype,

  _log: function (data) {
    console.log('%s\n', JSON.stringify(data));
  },

  /**
   * Output a summary of the mocha run.
   */
  onEnd: function() {
    this._log({action: 'suite_end'});
  },

  /**
   * @param {Test} test failing test.
   * @param {Error} err failure.
   */
  onFail: function(test, err) {
    this.status = 'FAIL';
    this._log({action: 'test_status',
               test: this.getFile(test),
               status: this.status,
               subtest: this.getTitle(test),
               expected: 'PASS'});
  },

  /**
   * @param {Test} test passing test.
   */
  onPass: function(test) {
    this.status = 'PASS';
    this._log({action: 'test_status',
               test: this.getFile(test),
               subtest: this.getTitle(test),
               status: this.status});
  },

  /**
   * @param {Test} test pending test.
   */
  onPending: function(test) {
    this.status = 'NOTRUN';
    this._log({action: 'test_status',
               test: this.getFile(test),
               subtest: this.getTitle(test),
               status: this.status});
  },

  /**
   * @param {Suite} started test suite.
   */
  onSuite: function(suite) {
    // NOTE: root suites have no attached test, file or manifest,
    // so we treat each test file as a suite
    if (!suite.root) {
      this._log({action: 'test_start',
                 test: this.getFile(suite)});
    }
  },

  /**
   * @param {Suite} finished suite.
   */
  onSuiteEnd: function(suite) {
    if (suite.parent && suite.parent.root) {
      var data = {action: 'test_end',
                  test: this.getFile(suite),
                  status: this.status};
      if (this.status != 'PASS') {
        data.expected = 'PASS';
      }
      this._log(data);
    }
  },

  /**
   * @param {Test} test some test.
   * @return {string} the title of the test.
   */
  getTitle: function(test) {
    return this.sanitize(test.fullTitle());
  },

  getFile: function(test) {
    if ('file' in test) {
      return test.file;
    }
    if ('parent' in test) {
      return this.getFile(test.parent);
    }

    return null;
  },

  /**
   * @param {string} str some string that could potentially have character
   *     sequences that tbpl would understand.
   * @return {string} sanitized string.
   */
  sanitize: function(str) {
    // These are controversial words and we must censor them!
    return str
        .replace(/PROCESS-CRASH/g, '*************')
        .replace(/TEST-END/g, '********')
        .replace(/TEST-KNOWN-FAIL/g, '***************')
        .replace(/TEST-PASS/g, '*********')
        .replace(/TEST-START/g, '***********')
        .replace(/TEST-UNEXPECTED-FAIL/g, '********************');
  }
};
