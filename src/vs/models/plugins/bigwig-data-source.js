/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 10/29/2015
 * Time: 3:51 PM
 */

goog.provide('vs.models.plugins.BigwigDataSource');

goog.require('vs.models');

/**
 * @constructor
 */
vs.models.plugins.BigwigDataSource = function() {};

/**
 * TODO: Add option to load additional col metadata (metadata about each file/track),
 * TODO: and also more metadata about rows (each snip for example)
 * TODO: And labels for values (pval, etc)
 * @param {Array.<string>} bigwigURIs
 * @param {{initialQuery: (vs.models.Query|Array.<vs.models.Query>|undefined), proxyURI: (string|undefined), valsLabel: (string|undefined)}} options
 * @returns {vs.models.DataSource}
 */
vs.models.plugins.BigwigDataSource.createNew = function(bigwigURIs, options) {
  var ret = u.reflection.wrap({
    /** @type {boolean} */
    'isReady': false,

    /** @type {Array.<vs.models.Query>} */
    'query': /** @type {Array.<vs.models.Query>} */ (options['initialQuery'] ? (Array.isArray(options['initialQuery']) ? options['initialQuery'] : [options['initialQuery']]) : []),

    /** @type {?number} */
    'nrows': null,

    /** @type {?number} */
    'ncols': null,

    /** @type {Array.<vs.models.DataArray>} */
    'rows': null,

    /** @type {Array.<vs.models.DataArray>} */
    'cols': null,

    /** @type {Array.<vs.models.DataArray>} */
    'vals': null,

    /** @type {Promise.<vs.models.DataSource>} */
    'ready': null
  }, vs.models.DataSource);



  /**
   * @type {string|undefined}
   * @private
   */
  var proxyURI = options['proxyURI'];

  /**
   * @type {number}
   * @private
   */
  var maxItems = 5000;

  /**
   * @type {Promise}
   * @private
   */
  ret['ready'] = new Promise(function(resolve, reject) {
    var ncols = bigwigURIs.length;
    var cols = {
      label: bigwigURIs.map(function(uri) { return uri.substr(Math.max(uri.lastIndexOf('/'), 0)).replace('.bigwig', '').replace('.bw', ''); })
    };

    var range = vs.models.GenomicRangeQuery.extract(ret['query']);

    var bwFiles = bigwigURIs.map(function(uri) { return new bigwig.BigwigFile(uri, proxyURI, 256); });


    var rows = {};
    var v = new Array(bwFiles.length);

    u.async.each(bwFiles,
      /**
       * @param {bigwig.BigwigFile} bwFile
       * @param {number} i
       */
      function(bwFile, i) {
        return new Promise(function(resolve, reject) {
          bwFile.query(/** @type {{chr: (string|number), start: number, end: number}} */ (range), {maxItems: maxItems})
            .then(/** @param {Array.<bigwig.DataRecord>} records */ function(records) {
              if (!rows['chr']) {
                rows['chr'] = records.map(function(r) { return r.chrName; });
                rows['start'] = records.map(function(r) { return r.start; });
                rows['end'] = records.map(function(r) { return r.end; });
              }
              if (rows['chr'].length < records.length) {
                records = records.slice(0, rows['chr'].length);
              }
              if (records.length < rows['chr'].length) {
                rows['chr'] = rows['chr'].slice(0, records.length);
                rows['start'] = rows['start'].slice(0, records.length);
                rows['end'] = rows['end'].slice(0, records.length);
              }
              v[i] = records.map(function(r) { return r.value(bigwig.DataRecord.Aggregate.MAX); });
              resolve();
            });
        });
      }).then(function() {
        var nrows = rows['chr'].length;
        var vals = v.reduce(function(v1, v2) { return v1.concat(v2); });

        ret['ncols'] = ncols;
        ret['nrows'] = nrows;
        ret['cols'] = u.map(cols, function(val, key) { return new vs.models.DataArray(val, key); });
        ret['rows'] = u.map(rows, function(val, key) { return new vs.models.DataArray(val, key); });
        ret['vals'] = [new vs.models.DataArray(vals, options['valsLabel'] || 'v0')];
        ret['isReady'] = true;
        resolve(ret);
      });
  });

  return ret;
};
