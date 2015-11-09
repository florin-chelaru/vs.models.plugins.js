/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/6/2015
 * Time: 12:03 PM
 */

// Generated with http://www.dotnetwise.com/Code/Externs/
// Load: https://rawgit.com/florin-chelaru/utils.js/master/utils.min.js
// Load: https://code.angularjs.org/1.4.4/angular.min.js
// Load: https://rawgit.com/florin-chelaru/vis.js/master/vis.min.js

/** @suppress {duplicate} */
var vs = {
  "async": {
    "TaskService": function () {},
    "Task": function () {},
    "ThreadPoolService": function () {}
  },
  "Configuration": function () {},
  "directives": {
    "Axis": function () {},
    "DataContext": function () {},
    "Directive": function () {},
    "GraphicDecorator": function () {},
    "Grid": function () {},
    "Movable": function () {},
    "Resizable": function () {},
    "Visualization": function () {},
    "Window": function () {}
  },
  "models": {
    "Boundaries": function () {},
    "DataArray": function () {},
    "DataRow": function () {},

    /**
     * @constructor
     */
    "DataSource": function () {},

    /**
     * @constructor
     */
    "GenomicRangeQuery": function () {},

    /**
     * @constructor
     */
    "Margins": function () {},
    "ModelsException": function () {},
    "Point": function () {},
    "Query": function () {},

    /**
     * @constructor
     */
    "Transformer": function () {}
  },
  "ui": {
    "canvas": {
      "CanvasAxis": function () {},
      "CanvasGrid": function () {},

      /**
       * @constructor
       * @extends {vs.ui.VisHandler}
       */
      "CanvasVis": function () {}
    },
    "DataHandler": function () {},
    "Decorator": function () {},
    "decorators": {
      "Axis": function () {},
      "Grid": function () {}
    },

    /**
     * @constructor
     */
    "Setting": function (args) {},
    "svg": {
      "SvgAxis": function () {},
      "SvgGrid": function () {},
      /**
       * @constructor
       * @extends {vs.ui.VisHandler}
       */
      "SvgVis": function () {}
    },

    /**
     * @constructor
     */
    "VisHandler": function () {},
    "VisualContext": function () {},
    "VisualizationFactory": function () {}
  }
};

vs.ui.Setting.PredefinedSettings = {};
/** @enum {string} */
vs.ui.Setting.Type = {};
vs.ui.Setting.rowBoundaries = function() {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.VisHandler.Settings;

/** @type {vs.models.DataSource} */
vs.ui.VisHandler.prototype.data = null;
/** @type {jQuery} */
vs.ui.VisHandler.prototype.$element = null;


vs.ui.VisHandler.prototype.optionValue = function(opt) {};
vs.ui.VisHandler.prototype.beginDraw = function() {};
vs.ui.VisHandler.prototype.endDraw = function() {};
vs.ui.VisHandler.prototype.draw = function() {};

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.SvgVis.Settings;

/**
 * @type {Object.<string, vs.ui.Setting>}
 */
vs.ui.CanvasVis.Settings;
vs.ui.CanvasVis.prototype.pendingCanvas = null;
vs.ui.CanvasVis.prototype.activeCanvas = null;
vs.ui.CanvasVis.circle = function(context, cx, cy, r, fill, stroke) {};

vs.models.DataSource.prototype.isReady = null;
vs.models.DataSource.prototype.nrows = 0;
vs.models.DataSource.prototype.ncols = 0;
vs.models.DataSource.prototype.rows = null;
vs.models.DataSource.prototype.cols = null;
vs.models.DataSource.prototype.vals = null;
vs.models.DataSource.prototype.query = null;
vs.models.DataSource.prototype.changed = null;

vs.models.Transformer.prototype.calc = function() {};
vs.models.Transformer.prototype.calcX = function() {};
vs.models.Transformer.prototype.calcY = function() {};
vs.models.Transformer.prototype.calcArr = function() {};
vs.models.Transformer.prototype.combine = function() {};
vs.models.Transformer.prototype.translate = function(offset) {};
vs.models.Transformer.prototype.scale = function(xScale, yScale) {};
vs.models.Transformer.prototype.intCoords = function() {};

vs.models.Transformer.translate = function(offset) {};
vs.models.Transformer.scale = function(xScale, yScale) {};
vs.models.Transformer.intCoords = function() {};

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

vs.models.GenomicRangeQuery.extract = function() {};
