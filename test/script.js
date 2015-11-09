/**
 * Created by Florin Chelaru ( florin [dot] chelaru [at] gmail [dot] com )
 * Date: 8/27/2015
 * Time: 10:11 AM
 */

goog.require('goog.string.format');

var main = angular.module('main', ['vs']);

main.config(['configurationProvider', function(configuration) {
  configuration.customize({
    // TODO: Here I think, should go the doubleBuffer part; in something called renderOptions: {svg: {...}, canvas: {...}}
    visualizations: {
      scatterplot: {
        canvas: 'vs.ui.plugins.canvas.ScatterPlot',
        svg: 'vs.ui.plugins.svg.ScatterPlot',
        default: 'svg'
      },
      manhattan: {
        svg: 'vs.ui.plugins.svg.ManhattanPlot',
        canvas: 'vs.ui.plugins.canvas.ManhattanPlot',
        default: 'svg'
      }
    },
    parallel: {
      nthreads: 16,
      worker: '/vs-models/test/worker.js'
    }
  })
}]);

main.controller('vs.MainController', ['$scope', '$templateCache', function($scope, $templateCache) {
  this.controller = {
    dataContexts: [
      u.reflection.wrap({
        name: 'Genetic Variants',
        children: [],
        dataChanged: new u.Event(),
        visualizations: [
          {
            construct: {
              render: 'canvas',
              type: 'scatterplot'
            },
            options: {
              doubleBuffer: true,
              axisBoundaries: {},
              x: 10,
              y: 60,
              width: 200,
              height: 200,
              margins: {
                left: 10,
                right: 10,
                bottom: 10,
                top: 10
              },
              cols: [0, 0],
              vals: 'dna methylation'
            },
            decorators: {
              cls: [
                'vs-window',
                'vs-resizable',
                'vs-movable'
              ],
              elem: [
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'y'
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'y'
                  }
                }
              ]
            }
          },
          {
            construct: {
              render: 'svg',
              type: 'scatterplot'
            },
            options: {
              doubleBuffer: false,
              axisBoundaries: {},
              x: 220,
              y: 60,
              width: 200,
              height: 200,
              margins: {
                left: 10,
                right: 10,
                bottom: 10,
                top: 10
              },
              cols: [0, 1],
              vals: 'dna methylation'
            },
            decorators: {
              cls: [
                'vs-window',
                'vs-resizable',
                'vs-movable'
              ],
              elem: [
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'y'
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'y'
                  }
                }
              ]
            }
          },
          {
            construct: {
              render: 'canvas',
              type: 'manhattan'
            },
            options: {
              doubleBuffer: true,
              xBoundries: {min: 1000, max: 100000},
              yBoundaries: {min: 0, max: 0.5},
              x: 430,
              y: 60,
              width: 400,
              height: 200,
              margins: {
                left: 10,
                right: 10,
                bottom: 10,
                top: 10
              },
              cols: [0, 1],
              vals: 'v0',
              rows: ['start', 'end']
            },
            decorators: {
              cls: [
                'vs-window',
                'vs-resizable',
                'vs-movable'
              ],
              elem: [
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'y'
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'y'
                  }
                }
              ]
            }
          },
          {
            construct: {
              render: 'svg',
              type: 'manhattan'
            },
            options: {
              xBoundries: {min: 1000, max: 100000},
              yBoundaries: {min: 0, max: 0.5},
              x: 430,
              y: 290,
              width: 400,
              height: 200,
              margins: {
                left: 10,
                right: 10,
                bottom: 10,
                top: 10
              },
              cols: [0, 1],
              vals: 'v0',
              rows: ['start', 'end']
            },
            decorators: {
              cls: [
                'vs-window',
                'vs-resizable',
                'vs-movable'
              ],
              elem: [
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-axis',
                  options: {
                    type: 'y'
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'x',
                    ticks: 10
                  }
                },
                {
                  cls: 'vs-grid',
                  options: {
                    type: 'y'
                  }
                }
              ]
            }
          }
        ],
        data: vs.models.plugins.BigwigDataSource.createNew(
          [
            'http://localhost/E001-H3K4me1.pval.signal.bigwig',
            'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K4me3.pval.signal.bigwig',
            'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9ac.pval.signal.bigwig',
            'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K9me3.pval.signal.bigwig',
            'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K27me3.pval.signal.bigwig',
            'http://egg2.wustl.edu/roadmap/data/byFileType/signal/consolidated/macs2signal/pval/E001-H3K36me3.pval.signal.bigwig'],
          {
            proxyURI: 'http://localhost/bigwig/test/partial.php',
            initialQuery: [
              new vs.models.Query({target: 'rows', targetLabel: 'chr', test: '==', testArgs: 'chr1'}),
              new vs.models.Query({target: 'rows', targetLabel: 'start', test: '<', testArgs: '100000'}),
              new vs.models.Query({target: 'rows', targetLabel: 'end', test: '>=', testArgs: '1000'})
            ]
          }
        )
      }, vs.ui.DataHandler)
    ]
  };
}]);

main.controller('vs.DataContextController', ['$scope', function($scope) {
  /** @type {vs.ui.DataHandler} */
  var dataHandler = $scope['vsDataContext'].handler.handler;
  var $window = $scope['vsWindow'].handler.$window;
  var data = dataHandler.data;
  var range = vs.models.GenomicRangeQuery.extract(data.query);
  $scope.name = dataHandler.name;
  $scope.location = goog.string.format('%s:%s-%s', range.chr, range.start, range.end);

  var regex = /^\s*([a-zA-Z0-9]+)\s*\:\s*([0-9]+)\s*\-\s*([0-9]+)\s*$/;

  $scope.query = function() {
    var matches = $scope.location.match(regex);
    if (!matches || matches.length < 4) { throw new Error('Invalid location'); }

    var chr = matches[1];
    var start = parseInt(matches[2]);
    var end = parseInt(matches[3]);

    var q = new vs.models.GenomicRangeQuery(chr, start, end);

    data.applyQuery(q.query);

  };

  $scope.mousedown = function(e) {
    $window.trigger(new $.Event('mousedown', {target: $window[0], originalEvent: e, 'pageX': e.pageX, 'pageY': e.pageY}));
  };
}]);
