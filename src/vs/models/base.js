/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 11/8/2015
 * Time: 1:23 AM
 */

/**
 * @fileoverview
 * @suppress {globalThis}
 */

goog.provide('vs.models');

// Extend the namespaces defined here with the ones in the base vis.js package
(function() {
  u.extend(vs, this['vs']);
  u.extend(vs.models, this['vs']['models']);
}).call(this);
