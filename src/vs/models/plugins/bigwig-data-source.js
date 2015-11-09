/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 10/29/2015
 * Time: 3:51 PM
 */

goog.provide('vs.models.plugins.BigwigDataSource');

goog.require('vs.models');

// Because vs.models.DataSource is defined in another library (vis.js), there is no way for the Google Closure compiler
// to know the names of the private variables of that class. Therefore, when overriding this class, we need to declare
// private variables in a private scope (closure), using Symbols (ES6), so we don't accidentally replace existing
// private members.

/**
 * TODO: Add option to load additional col metadata (metadata about each file/track),
 * TODO: and also more metadata about rows (each snip for example)
 * TODO: And labels for values (pval, etc)
 * @param {Array.<string>} bigwigURIs
 * @param {{initialQuery: (vs.models.Query|Array.<vs.models.Query>|undefined), proxyURI: (string|undefined), valsLabel: (string|undefined)}} options
 * @constructor
 * @extends {vs.models.DataSource}
 */
vs.models.plugins.BigwigDataSource = (function() {

  var _isReady = Symbol('_isReady');
  var _proxyURI = Symbol('_proxyURI');
  var _ready = Symbol('_ready');
  var _maxItems = Symbol('_maxItems');

  /**
   * @param {Array.<string>} bigwigURIs
   * @param {{initialQuery: (vs.models.Query|Array.<vs.models.Query>|undefined), proxyURI: (string|undefined), valsLabel: (string|undefined)}} options
   * @constructor
   * @extends {vs.models.DataSource}
   */
  var BigwigDataSource = function(bigwigURIs, options) {
    vs.models.DataSource.apply(this, arguments);

    /**
     * @type {boolean}
     * @private
     */
    this[_isReady] = false;

    /**
     * @type {Array.<vs.models.Query>}
     * @private
     */
    this['query'] = options['initialQuery'] ? (Array.isArray(options['initialQuery']) ? options['initialQuery'] : [options['initialQuery']]) : [];

    /**
     * @type {string|undefined}
     * @private
     */
    this[_proxyURI] = options['proxyURI'];

    /**
     * @type {number}
     * @private
     */
    this['nrows'] = null;

    /**
     * @type {number}
     * @private
     */
    this['ncols'] = null;

    /**
     * @type {Array.<vs.models.DataArray>}
     * @private
     */
    this['rows'] = null;

    /**
     * @type {Array.<vs.models.DataArray>}
     * @private
     */
    this['cols'] = null;

    /**
     * @type {Array.<vs.models.DataArray>}
     * @private
     */
    this['vals'] = null;

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
      var ncols = bigwigURIs.length;
      var cols = {
        label: bigwigURIs.map(function(uri) { return uri.substr(Math.max(uri.lastIndexOf('/'), 0)).replace('.bigwig', '').replace('.bw', ''); })
      };

      var range = vs.models.GenomicRangeQuery.extract(self['query']);

      var bwFiles = bigwigURIs.map(function(uri) { return new bigwig.BigwigFile(uri, self[_proxyURI], 256); });


      var rows = {};
      var v = new Array(bwFiles.length);

      u.async.each(bwFiles,
        /**
         * @param {bigwig.BigwigFile} bwFile
         * @param {number} i
         */
        function(bwFile, i) {
          return new Promise(function(resolve, reject) {
            bwFile.query(/** @type {{chr: (string|number), start: number, end: number}} */ (range), {maxItems: self[_maxItems]})
              .then(/** @param {Array.<bigwig.DataRecord>} records */ function(records) {
                if (!rows.chr) {
                  rows.chr = records.map(function(r) { return r.chrName; });
                  rows.start = records.map(function(r) { return r.start; });
                  rows.end = records.map(function(r) { return r.end; });
                }
                if (rows.chr.length < records.length) {
                  records = records.slice(0, rows.chr.length);
                }
                if (records.length < rows.chr.length) {
                  rows.chr = rows.chr.slice(0, records.length);
                  rows.start = rows.start.slice(0, records.length);
                  rows.end = rows.end.slice(0, records.length);
                }
                v[i] = records.map(function(r) { return r.value(bigwig.DataRecord.Aggregate.MAX); });
                resolve();
              });
          });
        }).then(function() {
          var nrows = rows.chr.length;
          var vals = v.reduce(function(v1, v2) { return v1.concat(v2); });

          self['ncols'] = ncols;
          self['nrows'] = nrows;
          self['cols'] = u.map(cols, function(val, key) { return new vs.models.DataArray(val, key); });
          self['rows'] = u.map(rows, function(val, key) { return new vs.models.DataArray(val, key); });
          self['vals'] = [new vs.models.DataArray(vals, options['valsLabel'] || 'v0')];
          self[_isReady] = true;
          resolve(self);
        });
    });
  };

  goog.inherits(BigwigDataSource, vs.models.DataSource);

  Object.defineProperties(BigwigDataSource.prototype, {
    ready: {
      get: /** @type {function (this:BigwigDataSource)} */ (function() { return this[_ready]; })
    },
    isReady: { get: /** @type {function (this:BigwigDataSource)} */ (function() { return this[_isReady]; })}
  });

  return BigwigDataSource;
})();
