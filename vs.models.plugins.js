/**
* @license vs.ui.plugins.js
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


/**
 * @fileoverview
 * @suppress {globalThis}
 */

if (COMPILED) {
  goog.provide('vs.models');
}

// Extend the namespaces defined here with the ones in the base vis.js package
(function() {
  u.extend(vs, this['vs']);
  u.extend(vs.models, this['vs']['models']);
}).call(this);


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
  var _bigwigURIs = Symbol('_bigwigURIs');
  var _bwFiles = Symbol('_bwFiles');
  var _colsFileMap = Symbol('_colsFileMap');
  var _valsLabel = Symbol('_valsLabel');

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
     * @type {string|undefined}
     * @private
     */
    this[_valsLabel] = options['valsLabel'];

    /**
     * @type {Array.<string>}
     * @private
     */
    this[_bigwigURIs] = bigwigURIs;

    /**
     * @type {Array.<bigwig.BigwigFile>}
     * @private
     */
    this[_bwFiles] = null;

    /**
     * @type {Object.<string, bigwig.BigwigFile>}
     */
    this[_colsFileMap] = {};

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

      var fileNames = bigwigURIs.map(function(uri) { return uri.substr(Math.max(uri.lastIndexOf('/'), 0)).replace('.bigwig', '').replace('.bw', ''); });
      var cols = [new vs.models.DataArray(fileNames, 'bwFiles')];

      var range = vs.models.GenomicRangeQuery.extract(self['query']);

      self[_bwFiles] = bigwigURIs.map(function(uri) { return new bigwig.BigwigFile(uri, self[_proxyURI], 256); });

      bigwigURIs.forEach(function(uri, i) {
        self[_colsFileMap][fileNames[i]] = self[_bwFiles][i];
      });

      var rows = {};
      var v = new Array(self[_bwFiles].length);

      u.async.each(self[_bwFiles],
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
          self['cols'] = cols;
          self['rows'] = u.map(rows, function(val, key) { return new vs.models.DataArray(val, key); });
          self['vals'] = [new vs.models.DataArray(vals, options['valsLabel'] || 'v0')];
          self[_isReady] = true;
          self['changed'].fire(self);
          resolve(self);
        });
    });

    this['changing'].fire(this);
  };

  goog.inherits(BigwigDataSource, vs.models.DataSource);

  Object.defineProperties(BigwigDataSource.prototype, {
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
    return self[_ready].then(function() {
      self[_isReady] = false;
      self[_ready] = /** @type {Promise.<vs.models.DataSource>} */ (vs.models.DataSource.prototype.applyQuery.apply(this, arguments)
        .then(/** @param {vs.models.DataSource} tmp */ function(tmp) {
          queries = /** @type {Array.<vs.models.Query>} */ ((queries instanceof vs.models.Query) ? [queries] : queries);
          var range = vs.models.GenomicRangeQuery.extract(queries);

          /** @type {Array.<bigwig.BigwigFile>} */
          var bwFiles = self['cols'][0].d.map(function(fileName, i) { return self[_colsFileMap][fileName]; });

          var rows = {};
          var v = new Array(bwFiles.length);

          return u.async.each(bwFiles,
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
              self['query'] = queries;
              self['nrows'] = nrows;
              self['rows'] = u.map(rows, function(val, key) { return new vs.models.DataArray(val, key); });
              self['vals'] = [new vs.models.DataArray(vals, self[_valsLabel] || 'v0')];
              self['changed'].fire(self);
              self[_isReady] = true;
              return Promise.resolve(self);
            });
        }));
      self['changing'].fire(self);
      return self[_ready];
    });
  };

  return BigwigDataSource;
})();


goog.provide('vs.models.plugins');

goog.require('vs.models.plugins.BigwigDataSource');
