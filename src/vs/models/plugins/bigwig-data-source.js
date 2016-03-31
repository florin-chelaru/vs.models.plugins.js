/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 10/29/2015
 * Time: 3:51 PM
 */

goog.provide('vs.models.plugins.BigwigDataSource');

if (COMPILED) {
  goog.require('vs.models');
}

// Because vs.models.DataSource is defined in another library (vis.js), there is no way for the Google Closure compiler
// to know the names of the private variables of that class. Therefore, when overriding this class, we need to declare
// private variables in a private scope (closure), using Symbols (ES6), so we don't accidentally replace existing
// private members.

/**
 * TODO: Add option to load additional col metadata (metadata about each file/track),
 * TODO: and also more metadata about rows (each snip for example)
 * TODO: And labels for values (pval, etc)
 * @param {string} bigwigURL
 * @param {{initialQuery: (vs.models.Query|Array.<vs.models.Query>|undefined), proxyURL: (string|undefined), id: (string|undefined), label: (string|undefined)}} options
 * @constructor
 * @extends {vs.models.DataSource}
 */
vs.models.plugins.BigwigDataSource = (function() {

  var _id = Symbol('_id');
  var _isReady = Symbol('_isReady');
  var _proxyURL = Symbol('_proxyURL');
  var _ready = Symbol('_ready');
  var _maxItems = Symbol('_maxItems');
  var _bigwigURL = Symbol('_bigwigURL');
  var _bwFile = Symbol('_bwFile');

  /**
   * @param {string} bigwigURL
   * @param {{initialQuery: (vs.models.Query|Array.<vs.models.Query>|undefined), proxyURL: (string|undefined), valsLabel: (string|undefined)}} options
   * @constructor
   * @extends {vs.models.DataSource}
   */
  var BigwigDataSource = function(bigwigURL, options) {
    vs.models.DataSource.apply(this, arguments);

    /**
     * @type {boolean}
     * @private
     */
    this[_isReady] = false;

    /**
     * @type {string}
     * @private
     */
    this[_bigwigURL] = bigwigURL;

    /**
     * @type {string|undefined}
     * @private
     */
    this[_proxyURL] = options['proxyURL'];

    /**
     * @type {bigwig.BigwigFile}
     * @private
     */
    this[_bwFile] = new bigwig.BigwigFile(bigwigURL, this[_proxyURL], 256);

    var query = options['initialQuery'] ? (Array.isArray(options['initialQuery']) ? options['initialQuery'] : [options['initialQuery']]) : [];

    /**
     * @type {Array.<vs.models.Query>}
     * @private
     */
    this['query'] = query;

    var fileName = bigwigURL.substr(Math.max(bigwigURL.lastIndexOf('/'), 0)).replace('.bigwig', '').replace('.bw', '');

    var id = options['id'] || u.generatePseudoGUID(8);

    /**
     * @type {string}
     */
    this[_id] = id;

    /**
     * @type {string}
     */
    this['label'] = options['label'] || fileName;

    /**
     * @type {string}
     */
    this['state'] = u.generatePseudoGUID(6);

    this['rowMetadata'] = [
      {
        'label': 'chrName',
        'type': 'string'
      },
      {
        'label': 'chr',
        'type': 'string'
      },
      {
        'label': 'start',
        'type': 'number'
      },
      {
        'label': 'end',
        'type': 'number'
      }
    ];

    this['d'] = null;

    /**
     * @type {number}
     * @private
     */
    this[_maxItems] = 5000;

    var self = this;
    /**
     * @type {Promise}
     * @private
     */
    this[_ready] = new Promise(function(resolve, reject) {
      var range = vs.models.GenomicRangeQuery.extract(query);
      self[_bwFile].query(/** @type {{chr: (string|number), start: number, end: number}} */ (range), {'maxItems': self[_maxItems]})
        .then(/** @param {Array.<bigwig.DataRecord>} records */ function(records) {
          var length = records.length;
          for (var i = 0; i < length; ++i) {
            records[i]['__d__'] = id;
          }

          var summary = self[_bwFile].summary;
          self['rowMetadata'] = self['rowMetadata'].concat([
            {
              'label': 'min',
              'type': 'number',
              'boundaries': {
                'min': summary.min,
                'max': summary.max
              }
            },
            {
              'label': 'max',
              'type': 'number',
              'boundaries': {
                'min': summary.min,
                'max': summary.max
              }
            },
            {
              'label': 'sum',
              'type': 'number',
              'boundaries': {
                'min': summary.min,
                'max': summary.sumData
              }
            },
            {
              'label': 'sumsq',
              'type': 'number',
              'boundaries': {
                'min': summary.min * summary.min,
                'max': summary.sumSquares
              }
            },
            {
              'label': 'avg',
              'type': 'number',
              'boundaries': {
                'min': summary.min,
                'max': summary.max
              }
            },
            {
              'label': 'norm',
              'type': 'number',
              'boundaries': summary.min > 0 ? { 'min': summary.min, 'max': summary.max } :
                (summary.max < 0 ? {'min': -summary.max, 'max': -summary.min} : {'min': 0, 'max': Math.max(-summary.min, summary.max) })
            },
            {
              'label': 'cnt',
              'type': 'number'
            }
          ]);

          self['d'] = records;
          self[_isReady] = true;
          self['changed'].fire(self);
          resolve(self);
        });
    });

    this['changing'].fire(this);
  };

  goog.inherits(BigwigDataSource, vs.models.DataSource);

  Object.defineProperties(BigwigDataSource.prototype, {
    'id': {
      get: /** @type {function (this:BigwigDataSource)} */ (function () {
        return this[_id];
      })
    },
    'ready': {
      get: /** @type {function (this:BigwigDataSource)} */ (function() { return this[_ready]; })
    },
    'isReady': { get: /** @type {function (this:BigwigDataSource)} */ (function() { return this[_isReady]; })}
  });

  /**
   * @param {vs.models.Query|Array.<vs.models.Query>} queries
   * @param {boolean} [copy] True if the result should be a copy instead of changing the current instance
   * @returns {Promise.<vs.models.DataSource>}
   * @override
   */
  BigwigDataSource.prototype.applyQuery = function(queries, copy) {
    var self = this;

    var ready = self[_ready];

    self[_ready] = new Promise(function(resolve, reject) {
      ready.then(function() {
        self[_isReady] = false;
        self['changing'].fire(self);

        queries = /** @type {Array.<vs.models.Query>} */ ((queries instanceof vs.models.Query) ? [queries] : queries);
        var range = vs.models.GenomicRangeQuery.extract(queries);

        self[_bwFile].query(/** @type {{chr: (string|number), start: number, end: number}} */ (range), {'maxItems': self[_maxItems]})
          .then(/** @param {Array.<bigwig.DataRecord>} records */ function(records) {
            var length = records.length;
            for (var i = 0; i < length; ++i) {
              records[i]['__d__'] = self[_id];
            }

            self['query'] = queries;
            self['d'] = records;
            self[_isReady] = true;
            self['changed'].fire(self);
            resolve(self);
          });
      });
    });

    return self[_ready];
  };

  return BigwigDataSource;
})();
