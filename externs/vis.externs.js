/**
 * @license vis.js
 * Copyright (c) 2015 Florin Chelaru
 * License: MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
 * Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
 * WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/** @suppress {duplicate} */
var vs = {
  async: {},
  directives: {},
  models: {},
  ui: {
    canvas: {},
    decorators: {},
    svg: {}
  }
};

/**
 * @param {number} [x]
 * @param {number} [y]
 * @constructor
 */
vs.models.Point = function(x, y) {};

/**
 * @type {number}
 * @name vs.models.Point#x
 */
vs.models.Point.prototype.x;

/**
 * @type {number}
 * @name vs.models.Point#y
 */
vs.models.Point.prototype.y;

/**
 * @param {function((vs.models.Point|{x: (number|undefined), y: (number|undefined)})): vs.models.Point} transformation
 * @constructor
 */
vs.models.Transformer = function(transformation) {};

/**
 * @param {vs.models.Point|{x: (number|undefined), y: (number|undefined)}} point
 * @returns {vs.models.Point}
 */
vs.models.Transformer.prototype.calc = function(point) {};

/**
 * @param {vs.models.Point|{x: (number|undefined), y: (number|undefined)}} point
 * @returns {Array.<number>}
 */
vs.models.Transformer.prototype.calcArr = function(point) {};

/**
 * @param {number} x
 * @returns {number}
 */
vs.models.Transformer.prototype.calcX = function(x) {};

/**
 * @param {number} y
 * @returns {number}
 */
vs.models.Transformer.prototype.calcY = function(y) {};

/**
 * @param {vs.models.Transformer|function((vs.models.Point|{x: (number|undefined), y: (number|undefined)})): vs.models.Point} transformer
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.prototype.combine = function(transformer) {};

/**
 * @param {vs.models.Point|{x: (number|undefined), y: (number|undefined)}} offset
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.prototype.translate = function(offset) {};

/**
 * @param {function(number):number} xScale
 * @param {function(number):number} yScale
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.prototype.scale = function(xScale, yScale) {};

/**
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.prototype.intCoords = function() {};

/**
 * @param {vs.models.Point|{x: (number|undefined), y: (number|undefined)}} offset
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.translate = function(offset) {};

/**
 * @param {function(number):number} xScale
 * @param {function(number):number} yScale
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.scale = function(xScale, yScale) {};

/**
 * @returns {vs.models.Transformer}
 */
vs.models.Transformer.intCoords = function() {};

/**
 * @param {function():Promise} func
 * @param {Object} [thisArg]
 * @constructor
 */
vs.async.Task = function(func, thisArg) {};

/**
 * @type {number}
 * @name vs.async.Task#id
 */
vs.async.Task.prototype.id;

/**
 * @type {Object|undefined}
 * @name vs.async.Task#thisArg
 */
vs.async.Task.prototype.thisArg;

/**
 * @type {function():Promise}
 * @name vs.async.Task#func
 */
vs.async.Task.prototype.func;

/**
 * @type {vs.async.Task}
 * @name vs.async.Task#prev
 */
vs.async.Task.prototype.prev;

/**
 * @type {vs.async.Task}
 * @name vs.async.Task#next
 */
vs.async.Task.prototype.next;

/**
 * @type {vs.async.Task}
 * @name vs.async.Task#first
 */
vs.async.Task.prototype.first;

/**
 * @type {vs.async.Task}
 * @name vs.async.Task#last
 */
vs.async.Task.prototype.last;

/**
 * @returns {number}
 */
vs.async.Task.nextId = function() {};

/**
 * @param {function(Function, number)} $timeout Angular timeout service
 * @constructor
 */
vs.async.TaskService = function($timeout) {};

/**
 * @param {function():Promise} func
 * @param {Object} [thisArg]
 */
vs.async.TaskService.prototype.createTask = function(func, thisArg) {};

/**
 * @param {vs.async.Task|function():Promise} t1
 * @param {vs.async.Task|function():Promise} t2
 * @returns {vs.async.Task}
 */
vs.async.TaskService.prototype.chain = function(t1, t2) {};

/**
 * TODO: test!
 * @param {vs.async.Task} task
 * @param {boolean} [sequential] If true, the tasks will run sequentially
 * @returns {Promise}
 */
vs.async.TaskService.prototype.runChain = function(task, sequential) {};

/**
 * @param {number} [min]
 * @param {number} [max]
 * @constructor
 */
vs.models.Boundaries = function(min, max) {};

/**
 * @type {number}
 * @name vs.models.Boundaries#min
 */
vs.models.Boundaries.prototype.min;

/**
 * @type {number}
 * @name vs.models.Boundaries#max
 */
vs.models.Boundaries.prototype.max;

/**
 * @param {number} top
 * @param {number} left
 * @param {number} bottom
 * @param {number} right
 * @constructor
 */
vs.models.Margins = function(top, left, bottom, right) {};

/**
 * @type {number}
 * @name vs.models.Margins#top
 */
vs.models.Margins.prototype.top;

/**
 * @type {number}
 * @name vs.models.Margins#left
 */
vs.models.Margins.prototype.left;

/**
 * @type {number}
 * @name vs.models.Margins#bottom
 */
vs.models.Margins.prototype.bottom;

/**
 * @type {number}
 * @name vs.models.Margins#right
 */
vs.models.Margins.prototype.right;

/**
 * @type {Array.<number>}
 * @name vs.models.Margins#x
 */
vs.models.Margins.prototype.x;

/**
 * @type {Array.<number>}
 * @name vs.models.Margins#y
 */
vs.models.Margins.prototype.y;

/**
 * @param {vs.models.Margins|{top: number, left: number, bottom: number, right: number}} offset
 */
vs.models.Margins.prototype.add = function(offset) {};

/**
 * @param {*} other
 * @returns {boolean}
 */
vs.models.Margins.prototype.equals = function(other) {};

/**
 * @param {Array} d
 * @param {string} [label]
 * @param {vs.models.Boundaries} [boundaries]
 * @constructor
 */
vs.models.DataArray = function(d, label, boundaries) {};

/**
 * @type {string|undefined}
 * @name vs.models.DataArray#label
 */
vs.models.DataArray.prototype.label;

/**
 * @type {Array}
 * @name vs.models.DataArray#d
 */
vs.models.DataArray.prototype.d;

/**
 * @type {vs.models.Boundaries|undefined}
 * @name vs.models.DataArray#boundaries
 */
vs.models.DataArray.prototype.boundaries;

/**
 * @param {({target: (vs.models.Query.Target|string), targetLabel: string, test: (vs.models.Query.Test|string), testArgs: *, negate: (boolean|undefined)}|vs.models.Query)} opts
 * @constructor
 */
vs.models.Query = function(opts) {};

/**
 * @type {vs.models.Query.Target}
 * @name vs.models.Query#target
 */
vs.models.Query.prototype.target;

/**
 * @type {string}
 * @name vs.models.Query#targetLabel
 */
vs.models.Query.prototype.targetLabel;

/**
 * @type {vs.models.Query.Test}
 * @name vs.models.Query#test
 */
vs.models.Query.prototype.test;

/**
 * @type {*}
 * @name vs.models.Query#testArgs
 */
vs.models.Query.prototype.testArgs;

/**
 * @type {boolean}
 * @name vs.models.Query#negate
 */
vs.models.Query.prototype.negate;

/**
 * @returns {string}
 */
vs.models.Query.prototype.toString = function() {};

/**
 * @param {({target: (vs.models.Query.Target|string), targetLabel: string, test: (vs.models.Query.Test|string), testArgs: *, negate: (boolean|undefined)}|vs.models.Query)} [other]
 * @returns {boolean}
 */
vs.models.Query.prototype.equals = function(other) {};

/**
 * @enum {string}
 */
vs.models.Query.Target = {
  'ROWS': 'rows',
  'COLS': 'cols',
  'VALS': 'vals'
};

/**
 * @enum {string}
 */
vs.models.Query.Test = {
  'EQUALS': '==',
  'GREATER_THAN': '>',
  'LESS_THAN': '<',
  'GREATER_OR_EQUALS': '>=',
  'LESS_OR_EQUALS': '<=',
  'CONTAINS': 'contains',
  'IN': 'in'
};

/**
 * @constructor
 */
vs.models.DataSource = function() {};

/**
 * @type {Array.<vs.models.Query>}
 * @name vs.models.DataSource#query
 */
vs.models.DataSource.prototype.query;

/**
 * @type {number}
 * @name vs.models.DataSource#nrows
 */
vs.models.DataSource.prototype.nrows;

/**
 * @type {number}
 * @name vs.models.DataSource#ncols
 */
vs.models.DataSource.prototype.ncols;

/**
 * @type {Array.<vs.models.DataArray>}
 * @name vs.models.DataSource#rows
 */
vs.models.DataSource.prototype.rows;

/**
 * @type {Array.<vs.models.DataArray>}
 * @name vs.models.DataSource#cols
 */
vs.models.DataSource.prototype.cols;

/**
 * @type {Array.<vs.models.DataArray>}
 * @name vs.models.DataSource#vals
 */
vs.models.DataSource.prototype.vals;

/**
 * @type {Promise}
 * @name vs.models.DataSource#ready
 */
vs.models.DataSource.prototype.ready;

/**
 * @type {boolean}
 * @name vs.models.DataSource#isReady
 */
vs.models.DataSource.prototype.isReady;

/**
 * @type {u.Event.<vs.models.DataSource>}
 * @name vs.models.DataSource#changed
 */
vs.models.DataSource.prototype.changed;

/**
 * @param {vs.models.Query|Array.<vs.models.Query>} queries
 * @param {boolean} [copy] True if the result should be a copy instead of changing the current instance
 * @returns {Promise.<vs.models.DataSource>}
 */
vs.models.DataSource.prototype.applyQuery = function(queries, copy) {};

/**
 * For a static data source (that does not change over time), this does the exact same thing as applyQuery; for dynamic
 * data sources this simply filters out data already loaded in memory, without making any external calls.
 * @param {vs.models.Query|Array.<vs.models.Query>} queries
 * @returns {Promise.<vs.models.DataSource>}
 */
vs.models.DataSource.prototype.filter = function(queries) {};

/**
 * @param {vs.models.DataSource} data
 * @param {vs.models.Query} q
 * @returns {Promise.<vs.models.DataSource>}
 */
vs.models.DataSource.singleQuery = function(data, q) {};

/**
 * @param {string} label
 * @returns {vs.models.DataArray}
 */
vs.models.DataSource.prototype.getVals = function(label) {};

/**
 * @param {string} label
 * @returns {vs.models.DataArray}
 */
vs.models.DataSource.prototype.getRow = function(label) {};

/**
 * @param {string} label
 * @returns {vs.models.DataArray}
 */
vs.models.DataSource.prototype.getCol = function(label) {};

/**
 * @param {string} label
 * @returns {number}
 */
vs.models.DataSource.prototype.valsIndex = function(label) {};

/**
 * @param {string} label
 * @returns {number}
 */
vs.models.DataSource.prototype.colIndex = function(label) {};

/**
 * @param {string} label
 * @returns {number}
 */
vs.models.DataSource.prototype.rowIndex = function(label) {};

/**
 * @returns {{query: *, nrows: *, ncols: *, rows: *, cols: *, vals: *, isReady: *}}
 */
vs.models.DataSource.prototype.raw = function() {};

/**
 * @returns {Array.<vs.models.DataRow>}
 */
vs.models.DataSource.prototype.asDataRowArray = function() {};

/**
 * @param {number} i
 * @returns {string}
 */
vs.models.DataSource.prototype.key = function(i) {};

/**
 * @param {vs.models.DataRow} d
 * @param {number} [i]
 * @returns {string}
 */
vs.models.DataSource.key = function(d, i) {};

/**
 * @param {{
 *  key: string,
 *  type: (vs.ui.Setting.Type|string),
 *  defaultValue: (function(Object.<string, *>, *, vs.models.DataSource, Object.<string, vs.ui.Setting>)|*),
 *  label: (string|undefined),
 *  template: (string|undefined),
 *  hidden: (boolean|undefined),
 *  possibleValues: (Array|function(Object.<string, *>, *, vs.models.DataSource, Object.<string, vs.ui.Setting>)|undefined)
 * }} args
 * @constructor
 */
vs.ui.Setting = function(args) {};

/**
 * @type {string}
 * @name vs.ui.Setting#key
 */
vs.ui.Setting.prototype.key;

/**
 * @type {vs.ui.Setting.Type|string}
 * @name vs.ui.Setting#type
 */
vs.ui.Setting.prototype.type;

/**
 * @type {function(Object.<string, *>, *, vs.models.DataSource, Object.<string, vs.ui.Setting>)|*}
 * @name vs.ui.Setting#defaultValue
 */
vs.ui.Setting.prototype.defaultValue;

/**
 * @type {string}
 * @name vs.ui.Setting#label
 */
vs.ui.Setting.prototype.label;

/**
 * @type {string}
 * @name vs.ui.Setting#template
 */
vs.ui.Setting.prototype.template;

/**
 * @type {boolean}
 * @name vs.ui.Setting#hidden
 */
vs.ui.Setting.prototype.hidden;

/**
 * Extracts value from a set of raw options and element attributes
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.prototype.getValue = function(options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.prototype.possibleValues = function(options, $attrs, data, settings) {};

/**
 * @enum {string}
 */
vs.ui.Setting.Type = {
  'NUMBER': 'number',
  'STRING': 'string',
  'ARRAY': 'array',
  'BOOLEAN': 'boolean',
  'OBJECT': 'object',
  'CATEGORICAL': 'categorical',
  'DATA_COL_LABEL': 'dataColLbl',
  'DATA_ROW_LABEL': 'dataRowLbl',
  'DATA_VAL_LABEL': 'dataValLbl',
  'FUNCTION': 'function'
};

/**
 * @const {string}
 */
vs.ui.Setting.DEFAULT = 'default';

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.valueBoundaries = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.rowBoundaries = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.firstColsLabel = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.firstRowsLabel = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.firstValsLabel = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.xScale = function (options, $attrs, data, settings) {};

/**
 * @param {Object.<string, *>} options
 * @param $attrs Angular attrs
 * @param {vs.models.DataSource} [data]
 * @param {Object.<string, vs.ui.Setting>} [settings]
 * @returns {*}
 */
vs.ui.Setting.yScale = function (options, $attrs, data, settings) {};

/**
 * @const {Object.<string, vs.ui.Setting>}
 */
vs.ui.Setting.PredefinedSettings = {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService, threadPool: parallel.ThreadPool}} $ng
 * @param {Object.<string, *>} options
 * @param {vs.models.DataSource} data
 * @constructor
 */
vs.ui.VisHandler = function($ng, options, data) {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.VisHandler.Settings = {};

/**
 * @type {string}
 * @name vs.ui.VisHandler#render
 */
vs.ui.VisHandler.prototype.render;

/**
 * Gets a list of all settings (option definitions) for this type of visualization
 * @type {Object.<string, vs.ui.Setting>}
 * @name vs.ui.VisHandler#settings
 */
vs.ui.VisHandler.prototype.settings;

/**
 * @type {angular.Scope}
 * @name vs.ui.VisHandler#$scope
 */
vs.ui.VisHandler.prototype.$scope;

/**
 * @type {jQuery}
 * @name vs.ui.VisHandler#$element
 */
vs.ui.VisHandler.prototype.$element;

/**
 * @type {angular.Attributes}
 * @name vs.ui.VisHandler#$attrs
 */
vs.ui.VisHandler.prototype.$attrs;

/**
 * The values for the visualization predefined settings
 * @type {Object.<string, *>}
 * @name vs.ui.VisHandler#options
 */
vs.ui.VisHandler.prototype.options;

/**
 * @type {vs.models.DataSource}
 * @name vs.ui.VisHandler#data
 */
vs.ui.VisHandler.prototype.data;

/**
 * @type {parallel.SharedObject.<vs.models.DataSource>}
 * @name vs.ui.VisHandler#sharedData
 */
vs.ui.VisHandler.prototype.sharedData;

/**
 * @type {parallel.ThreadProxy}
 * @name vs.ui.VisHandler#thread
 */
vs.ui.VisHandler.prototype.thread;

/**
 * @type {vs.async.Task}
 * @name vs.ui.VisHandler#beginDrawTask
 */
vs.ui.VisHandler.prototype.beginDrawTask;

/**
 * @type {vs.async.Task}
 * @name vs.ui.VisHandler#endDrawTask
 */
vs.ui.VisHandler.prototype.endDrawTask;

/**
 * @type {vs.models.Margins}
 * @name vs.ui.VisHandler#margins
 */
vs.ui.VisHandler.prototype.margins;

/**
 * @type {number}
 * @name vs.ui.VisHandler#width
 */
vs.ui.VisHandler.prototype.width;

/**
 * @type {number}
 * @name vs.ui.VisHandler#height
 */
vs.ui.VisHandler.prototype.height;

/**
 * @param {string} optionKey
 * @returns {*}
 */
vs.ui.VisHandler.prototype.optionValue = function(optionKey) {};

/**
 * @returns {Promise}
 */
vs.ui.VisHandler.prototype.beginDraw = function() {};

/**
 * @returns {Promise}
 */
vs.ui.VisHandler.prototype.endDraw = function() {};

/**
 * @returns {Promise}
 */
vs.ui.VisHandler.prototype.draw = function() {};

/**
 */
vs.ui.VisHandler.prototype.scheduleRedraw = function() {};

/**
 * @param {angular.Scope} $scope Angular scope
 * @constructor
 */
vs.directives.Directive = function($scope) {};

/**
 * @type {angular.Scope}
 * @name vs.directives.Directive#$scope
 */
vs.directives.Directive.prototype.$scope;

/**
 * @type {jQuery}
 * @name vs.directives.Directive#$element
 */
vs.directives.Directive.prototype.$element;

/**
 * @type {angular.Attributes}
 * @name vs.directives.Directive#$attrs
 */
vs.directives.Directive.prototype.$attrs;

/**
 * @type {{pre: (undefined|function(angular.Scope, jQuery, angular.Attributes, (*|undefined))), post: (undefined|function(angular.Scope, jQuery, angular.Attributes, (*|undefined)))}|function(angular.Scope, jQuery, angular.Attributes, (*|undefined))}
 */
vs.directives.Directive.prototype.link = {
  'pre': function($scope, $element, $attrs, controller) {},
  'post': function($scope, $element, $attrs, controller) {}
};

/**
 * @param {string} name
 * @param {function(new: vs.directives.Directive)} controllerCtor
 * @param {Array} [args]
 * @param {Object.<string, *>} [options]
 * @returns {{controller: (Array|Function), link: Function, restrict: string, transclude: boolean, replace: boolean}}
 */
vs.directives.Directive.createNew = function(name, controllerCtor, args, options) {};

/**
 * @constructor
 */
vs.Configuration = function() {};

/**
 * @type {Object.<string, *>}
 * @name vs.Configuration#options
 */
vs.Configuration.prototype.options;

/**
 * @param {Object.<string, *>} options
 */
vs.Configuration.prototype.customize = function(options) {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends u.Exception
 */
vs.ui.UiException = function(message, innerException) {};

/**
 * @param {vs.Configuration} config
 * @constructor
 */
vs.async.ThreadPoolService = function(config) {};

/**
 * @type {parallel.ThreadPool}
 * @name vs.async.ThreadPoolService#pool
 */
vs.async.ThreadPoolService.prototype.pool;

/**
 * @param {vs.Configuration} config
 * @param {vs.async.TaskService} taskService
 * @param {Function} $timeout
 * @param {vs.async.ThreadPoolService} threadPool
 * @constructor
 */
vs.ui.VisualizationFactory = function(config, taskService, $timeout, threadPool) {};

/**
 * @param {angular.Scope} $scope
 * @param {jQuery} $element
 * @param {angular.Attributes} $attrs
 * @returns {vs.ui.VisHandler}
 */
vs.ui.VisualizationFactory.prototype.createNew = function($scope, $element, $attrs) {};

/**
 * @param {angular.Scope} $scope
 * @param {vs.ui.VisualizationFactory} visualizationFactory
 * @param {vs.async.TaskService} taskService
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.Visualization = function($scope, visualizationFactory, taskService) {};

/**
 * @type {vs.async.TaskService}
 * @name vs.directives.Visualization#taskService
 */
vs.directives.Visualization.prototype.taskService;

/**
 * @type {vs.ui.VisHandler}
 * @name vs.directives.Visualization#handler
 */
vs.directives.Visualization.prototype.handler;

/**
 * @param {angular.Scope} $scope
 * @param {vs.async.TaskService} taskService
 * @param {angular.$timeout} $timeout
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.LoadingDecorator = function($scope, taskService, $timeout) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 */
vs.ui.Decorator = function($ng, $targetElement, target, options) {};

/**
 * @type {angular.Scope}
 * @name vs.ui.Decorator#$scope
 */
vs.ui.Decorator.prototype.$scope;

/**
 * @type {jQuery}
 * @name vs.ui.Decorator#$element
 */
vs.ui.Decorator.prototype.$element;

/**
 * @type {angular.Attributes}
 * @name vs.ui.Decorator#$attrs
 */
vs.ui.Decorator.prototype.$attrs;

/**
 * @type {jQuery}
 * @name vs.ui.Decorator#$targetElement
 */
vs.ui.Decorator.prototype.$targetElement;

/**
 * @type {vs.models.DataSource}
 * @name vs.ui.Decorator#data
 */
vs.ui.Decorator.prototype.data;

/**
 * @type {vs.ui.VisHandler}
 * @name vs.ui.Decorator#target
 */
vs.ui.Decorator.prototype.target;

/**
 * @type {Object.<string, *>}
 * @name vs.ui.Decorator#options
 */
vs.ui.Decorator.prototype.options;

/**
 * @type {Object.<string, vs.ui.Setting>}
 * @name vs.ui.Decorator#settings
 */
vs.ui.Decorator.prototype.settings;

/**
 * @type {vs.async.Task}
 * @name vs.ui.Decorator#beginDrawTask
 */
vs.ui.Decorator.prototype.beginDrawTask;

/**
 * @type {vs.async.Task}
 * @name vs.ui.Decorator#endDrawTask
 */
vs.ui.Decorator.prototype.endDrawTask;

/**
 * @param {string} optionKey
 * @returns {*}
 */
vs.ui.Decorator.prototype.optionValue = function(optionKey) {};

/**
 * @returns {Promise}
 */
vs.ui.Decorator.prototype.beginDraw = function() {};

/**
 * @returns {Promise}
 */
vs.ui.Decorator.prototype.endDraw = function() {};

/**
 * @param {angular.Scope} $scope
 * @param {vs.async.TaskService} taskService
 * @param {angular.$timeout} $timeout
 * @param {boolean} [overridesVisHandler]
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.GraphicDecorator = function($scope, taskService, $timeout, overridesVisHandler) {};

/**
 * @type {vs.ui.Decorator}
 * @name vs.directives.GraphicDecorator#handler
 */
vs.directives.GraphicDecorator.prototype.handler;

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @returns {vs.ui.Decorator}
 */
vs.directives.GraphicDecorator.prototype.createDecorator = function($ng, $targetElement, target, options) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.Decorator
 */
vs.ui.decorators.Axis = function($ng, $targetElement, target, options) {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.decorators.Axis.Settings = {};

/**
 * @type {{x: string, y: string}}
 */
vs.ui.decorators.Axis.Orientation = {
  'x': 'bottom',
  'y': 'left'
};

/**
 * @type {string}
 * @name vs.ui.decorators.Axis#type
 */
vs.ui.decorators.Axis.prototype.type;

/**
 * @type {number}
 * @name vs.ui.decorators.Axis#ticks
 */
vs.ui.decorators.Axis.prototype.ticks;

/**
 * @type {string}
 * @name vs.ui.decorators.Axis#format
 */
vs.ui.decorators.Axis.prototype.format;

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Axis
 */
vs.ui.canvas.CanvasAxis = function($ng, $targetElement, target, options) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Axis
 */
vs.ui.svg.SvgAxis = function($ng, $targetElement, target, options) {};

/**
 * @constructor
 * @extends {vs.directives.GraphicDecorator}
 */
vs.directives.Axis = function() {};

/**
 * @param {{render: string, type: string}} construct
 * @param {Object.<string, *>} [options]
 * @param {{cls: Array.<string>, elem: Array.<{cls: string, options: Object.<string, *>}>}} [decorators]
 * @constructor
 */
vs.ui.VisualContext = function(construct, options, decorators) {};

/**
 * @type {{render: string, type: string}}
 * @name vs.ui.VisualContext#construct
 */
vs.ui.VisualContext.prototype.construct;

/**
 * @type {Object.<string, *>}
 * @name vs.ui.VisualContext#options
 */
vs.ui.VisualContext.prototype.options;

/**
 * @type {{cls: Array.<string>, elem: Array.<{cls: string, options: Object.<string, *>}>}|Array}
 * @name vs.ui.VisualContext#decorators
 */
vs.ui.VisualContext.prototype.decorators;

/**
 * @param {vs.ui.DataHandler|{data: vs.models.DataSource, visualizations: (Array.<vs.ui.VisualContext>|undefined), children: (Array.<vs.ui.DataHandler>|undefined), name: (string|undefined)}} options
 * @constructor
 */
vs.ui.DataHandler = function(options) {};

/**
 * @type {string}
 * @name vs.ui.DataHandler#name
 */
vs.ui.DataHandler.prototype.name;

/**
 * @type {vs.models.DataSource}
 * @name vs.ui.DataHandler#data
 */
vs.ui.DataHandler.prototype.data;

/**
 * @type {u.Event.<vs.models.DataSource>}
 * @name vs.ui.DataHandler#dataChanged
 */
vs.ui.DataHandler.prototype.dataChanged;

/**
 * @type {Array.<vs.ui.DataHandler>}
 * @name vs.ui.DataHandler#children
 */
vs.ui.DataHandler.prototype.children;

/**
 * @type {Array.<vs.ui.VisualContext>}
 * @name vs.ui.DataHandler#visualizations
 */
vs.ui.DataHandler.prototype.visualizations;

/**
 * @param {vs.models.Query|Array.<vs.models.Query>} queries
 * @returns {Promise.<vs.models.DataSource>}
 */
vs.ui.DataHandler.prototype.query = function(queries) {};

/**
 * @param {angular.Scope} $scope
 * @param {angular.$templateCache} $templateCache
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.DataContext = function($scope, $templateCache) {};

/**
 * @type {vs.ui.DataHandler}
 * @name vs.directives.DataContext#handler
 */
vs.directives.DataContext.prototype.handler;

/**
 * @type {string}
 * @name vs.directives.DataContext#template
 */
vs.directives.DataContext.prototype.template;

/**
 * @param {vs.models.DataSource} data
 * @param {number} index
 * @constructor
 */
vs.models.DataRow = function(data, index) {};

/**
 * @type {number}
 * @name vs.models.DataRow#index
 */
vs.models.DataRow.prototype.index;

/**
 * @type {vs.models.DataSource}
 * @name vs.models.DataRow#data
 */
vs.models.DataRow.prototype.data;

/**
 * @param {string|number} colIndexOrLabel
 * @param {string} [valsLabel]
 * @returns {number}
 */
vs.models.DataRow.prototype.val = function(colIndexOrLabel, valsLabel) {};

/**
 * @param label
 * @returns {*}
 */
vs.models.DataRow.prototype.info = function(label) {};

/**
 * @param {string} message
 * @param {Error} [innerException]
 * @constructor
 * @extends u.Exception
 */
vs.models.ModelsException = function(message, innerException) {};

/**
 * @param {string} chr
 * @param {number} start
 * @param {number} end
 * @constructor
 */
vs.models.GenomicRangeQuery = function(chr, start, end) {};

/**
 * @type {string}
 * @name vs.models.GenomicRangeQuery#chr
 */
vs.models.GenomicRangeQuery.prototype.chr;

/**
 * @type {number}
 * @name vs.models.GenomicRangeQuery#start
 */
vs.models.GenomicRangeQuery.prototype.start;

/**
 * @type {number}
 * @name vs.models.GenomicRangeQuery#end
 */
vs.models.GenomicRangeQuery.prototype.end;

/**
 * @type {Array.<vs.models.Query>}
 * @name vs.models.GenomicRangeQuery#query
 */
vs.models.GenomicRangeQuery.prototype.query;

/**
 * @param {Array.<vs.models.Query>} query
 * @returns {vs.models.GenomicRangeQuery}
 */
vs.models.GenomicRangeQuery.extract = function(query) {};

/**
 * @constructor
 * @extends vs.ui.VisHandler
 */
vs.ui.svg.SvgVis = function () {};

/**
 * @param {vs.ui.VisHandler} source
 * @param {vs.models.DataSource} data
 * @param {vs.models.DataRow} selectedRow
 * @param {vs.ui.BrushingEvent.Action} action
 * @constructor
 */
vs.ui.BrushingEvent = function(source, data, selectedRow, action) {};

/**
 * @enum {string}
 */
vs.ui.BrushingEvent.Action = {
  MOUSEOVER: 'mouseover',
  MOUSEOUT: 'mouseout',
  SELECT: 'select',
  DESELECT: 'deselect'
};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.Decorator
 */
vs.ui.decorators.Brushing = function($ng, $targetElement, target, options) {};

/**
 * @type {u.Event.<vs.ui.BrushingEvent>}
 * @name vs.ui.decorators.Brushing#brushing
 */
vs.ui.decorators.Brushing.prototype.brushing;

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.decorators.Brushing.Settings = {};

/**
 * @param {vs.ui.BrushingEvent} e
 */
vs.ui.decorators.Brushing.prototype.brush = function(e) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Brushing
 */
vs.ui.svg.SvgBrushing = function($ng, $targetElement, target, options) {};

/**
 * @returns {Promise}
 */
vs.ui.svg.SvgBrushing.prototype.beginDraw = function() {};

/**
 * @returns {Promise}
 */
vs.ui.svg.SvgBrushing.prototype.endDraw = function() {};

/**
 * @param {vs.ui.BrushingEvent} e
 */
vs.ui.svg.SvgBrushing.prototype.brush = function(e) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Brushing
 */
vs.ui.canvas.CanvasBrushing = function($ng, $targetElement, target, options) {};

/**
 * @returns {Promise}
 */
vs.ui.canvas.CanvasBrushing.prototype.endDraw = function() {};

/**
 * @param {angular.Scope} $scope
 * @param {vs.async.TaskService} taskService
 * @param {angular.$timeout} $timeout
 * @param $rootScope Angular root scope
 * @constructor
 * @extends {vs.directives.GraphicDecorator}
 */
vs.directives.Brushing = function($scope, taskService, $timeout, $rootScope) {};

/**
 * @type {{pre: (undefined|function(angular.Scope, jQuery, angular.Attributes, (*|undefined))), post: (undefined|function(angular.Scope, jQuery, angular.Attributes, (*|undefined)))}|function(angular.Scope, jQuery, angular.Attributes, (*|undefined))}
 */
vs.directives.Brushing.prototype.link = function($scope, $element, $attrs, controller) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @returns {vs.ui.Decorator}
 * @override
 */
vs.directives.Brushing.prototype.createDecorator = function($ng, $targetElement, target, options) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.Decorator
 */
vs.ui.decorators.Grid = function($ng, $targetElement, target, options) {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.decorators.Grid.Settings = {};

/**
 * @type {string}
 * @name vs.ui.decorators.Grid#type
 */
vs.ui.decorators.Grid.prototype.type;

/**
 * @type {number}
 * @name vs.ui.decorators.Grid#ticks
 */
vs.ui.decorators.Grid.prototype.ticks;

/**
 * @type {string}
 * @name vs.ui.decorators.Grid#format
 */
vs.ui.decorators.Grid.prototype.format;

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Grid
 */
vs.ui.svg.SvgGrid = function($ng, $targetElement, target, options) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @constructor
 * @extends vs.ui.decorators.Grid
 */
vs.ui.canvas.CanvasGrid = function($ng, $targetElement, target, options) {};

/**
 * @param {angular.Scope} $scope
 * @param {vs.async.TaskService} taskService
 * @param {angular.$timeout} $timeout
 * @constructor
 * @extends {vs.directives.GraphicDecorator}
 */
vs.directives.Grid = function($scope, taskService, $timeout) {};

/**
 * @param {{$scope: angular.Scope, $element: jQuery, $attrs: angular.Attributes, $timeout: angular.$timeout, taskService: vs.async.TaskService}} $ng
 * @param {jQuery} $targetElement
 * @param {vs.ui.VisHandler} target
 * @param {Object.<string, *>} options
 * @returns {vs.ui.Decorator}
 * @override
 */
vs.directives.Grid.prototype.createDecorator = function($ng, $targetElement, target, options) {};

/**
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.Window = function() {};

/**
 * @type {jQuery}
 * @name vs.directives.Window#$window
 */
vs.directives.Window.prototype.$window;

/**
 * @param {angular.Scope} $scope
 * @param $document
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.Movable = function($scope, $document) {};

/**
 * @param {angular.Scope} $scope
 * @param $document
 * @constructor
 * @extends {vs.directives.Directive}
 */
vs.directives.Resizable = function($scope, $document) {};

/**
 * @constructor
 * @extends {vs.ui.VisHandler}
 */
vs.ui.canvas.CanvasVis = function () {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.canvas.CanvasVis.Settings = {};

/**
 * @type {jQuery}
 * @name vs.ui.canvas.CanvasVis#pendingCanvas
 */
vs.ui.canvas.CanvasVis.prototype.pendingCanvas;

/**
 * @type {jQuery}
 * @name vs.ui.canvas.CanvasVis#activeCanvas
 */
vs.ui.canvas.CanvasVis.prototype.activeCanvas;

/**
 * @type {boolean}
 * @name vs.ui.canvas.CanvasVis#doubleBuffer
 */
vs.ui.canvas.CanvasVis.prototype.doubleBuffer;

vs.ui.canvas.CanvasVis.prototype.finalizeDraw = function() {};

/**
 * @param {CanvasRenderingContext2D} context
 * @param {number} cx
 * @param {number} cy
 * @param {number} r
 * @param {string} [fill]
 * @param {string} [stroke]
 */
vs.ui.canvas.CanvasVis.circle = function(context, cx, cy, r, fill, stroke) {};
