/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/4/2015
 * Time: 7:30 PM
 */

DOMAIN_BASE_PATH = '/vs-models/';
CLOSURE_BASE_PATH = DOMAIN_BASE_PATH + 'bower_components/google-closure-library/closure/goog/';
SRC_BASE_PATH = DOMAIN_BASE_PATH + 'test/';
importScripts(
  CLOSURE_BASE_PATH + 'bootstrap/webworkers.js',
  CLOSURE_BASE_PATH + 'base.js',
  CLOSURE_BASE_PATH + 'deps.js',
  DOMAIN_BASE_PATH + 'bower_components/utils.js/utils.min.js'
);

// optionally add importScripts('deps.js'); for current project dependencies
// add here goog.require(...)

u.log.VERBOSE = 'info';

importScripts(DOMAIN_BASE_PATH + 'deps.js');
// goog.require('vs.models.DataSource'); <-- TODO: This will be a bit tricky - import the original vs.models.DataSource from bower_components
// TODO ^ alternatively, we can import vis.min.js and keep our fingers crossed

importScripts(DOMAIN_BASE_PATH + 'bower_components/threadpool.js/parallel-worker.min.js');

