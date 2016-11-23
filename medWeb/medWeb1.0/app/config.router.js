'use strict';
angular.module('app')
    .run(
        [
            '$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
                // console.log($rootScope);
            }
        ]
    )
    .config(
        [
            '$stateProvider', '$urlRouterProvider',
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider
                    .otherwise('/app/mkdisease');
                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app.knowledgeGraph', {
                        url: '/knowledgeGraph',
                        template:"<network-graph></network-graph>",
                        ncyBreadcrumb: {
                            label: '知识图谱',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/cytoscape/cytoscape.js',
                                            'lib/cytoscape/cytoscape-panzoom/cytoscape-panzoom.css',
                                            'lib/cytoscape/cytoscape-panzoom/cytoscape-panzoom.js',
                                            'lib/cytoscape/cola.js',
                                            'lib/cytoscape/cytoscape-cola.js',
                                            'lib/cytoscape/handlebars.min.js',
                                            'lib/cytoscape/typeahead.bundle.js',
                                            'styles/KGstyle.css',
                                            'app/directives/knowledgeGraph.js',
                                            'app/controllers/graphQueryCtrl.js',
                                            'app/controllers/mainCtrl.js',
                                            'app/controllers/tableTestCtrl.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.patientClinicalPathway', {
                        url: '/patientClinicalPathway',
                        templateUrl:'views/tpl/patientClinicalPathway.html',
                        ncyBreadcrumb: {
                            label: '患者信息展示',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/timeline/myhGraph/css/main.css',
                                            'lib/timeline/myhGraph/css/global.css',
                                            'lib/timeline/myhGraph/HealthGraph.css',
                                            'lib/timeline/js/timeline.css',
                                            'lib/d3/d3.v3.min.js',
                                            'lib/timeline/myhGraph/js/mustache.js',
                                            'lib/timeline/myhGraph/js/hammer.js',
                                            'lib/timeline/myhGraph/HealthGraph.js',
                                            'lib/timeline/myhGraph/js/hGraphMain.js',
                                            'lib/timeline/myhGraph/js/hUsers.js',
                                            'lib/timeline/myhGraph/js/hData.js',
                                            'app/controllers/patientClinicalPathway.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.similarPatientsDia', {
                        url: '/similarPatientsDia',
                        templateUrl:'views/tpl/similarPatientsDia.html',
                        ncyBreadcrumb: {
                            label: '相似患者诊断分析',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/d3/dc/dc.css',
                                            'lib/treeview/integralui.css',
                                            'lib/treeview/integralui.checkbox.css',
                                            'lib/treeview/integralui.treeview.css',
                                            'styles/spSankey.css',
                                            'lib/treeview/angular.integralui.checkbox.min.js',
                                            'lib/treeview/angular.integralui.lists.min.js',
                                            'lib/treeview/angular.integralui.treeview.min.js',
                                            'lib/treeview/theme.selector.min.js',
                                            'lib/d3/d3.v3.min.js',
                                            'lib/d3/crossfilter.js',
                                            'lib/d3/dc/dc.js',
                                            'lib/d3/sankey.js',
                                            'app/controllers/SPDiagnosisController.js',
                                            'app/controllers/similarPatientsDiaStatistics.js',
                                            'app/controllers/sankeyCtrl.js',
                                            'app/controllers/treeView.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.similarPatientsMed', {
                        url: '/similarPatientsMed',
                        templateUrl:'views/tpl/similarPatientsMed.html',
                        ncyBreadcrumb: {
                            label: '相似患者用药分析',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/d3/dc/dc.css',
                                            'lib/treeview/integralui.css',
                                            'lib/treeview/integralui.checkbox.css',
                                            'lib/treeview/integralui.treeview.css',
                                            'styles/spSankey.css',
                                            'lib/treeview/angular.integralui.checkbox.min.js',
                                            'lib/treeview/angular.integralui.lists.min.js',
                                            'lib/treeview/angular.integralui.treeview.min.js',
                                            'lib/treeview/theme.selector.min.js',
                                            'lib/d3/d3.v3.min.js',
                                            'lib/d3/crossfilter.js',
                                            'lib/d3/dc/dc.js',
                                            'lib/d3/sankey.js',
                                            'app/controllers/SPMedicationCtrl.js',
                                            'app/controllers/similarPatientsMedStatistics.js',
                                            'app/controllers/sankeyCtrl_med.js',
                                            'app/controllers/treeView.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.diseaseCause', {
                        url: '/diseaseCause',
                        templateUrl:'views/tpl/diseaseCause.html',
                        ncyBreadcrumb: {
                            label: '疾病风险预测',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load({
                                        serie: true,
                                        files: [
                                            'lib/d3/d3.v3.min.js',
                                            'lib/d3/melt.js',
                                            'lib/d3/queue.v1.min.js',
                                            'lib/d3/tip.js',
                                            'styles/bubble.css',
                                            'app/controllers/diseaseCauseStatistics.js'
                                        ]
                                    });
                                }
                            ]
                        }
                    })
                    .state('app.mkdisease', {
                        url: '/mkdisease',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '疾病',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                            return $ocLazyLoad.load({
                                                    serie: true,
                                                    files: [
                                                        'lib/medicalKnowledge/css/my.css',
                                                        'lib/medicalKnowledge/css/news.css',
                                                        'lib/medicalKnowledge/css/base.css',
                                                        'lib/medicalKnowledge/typeahead/typeahead.css',
                                                        'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                        'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                        'lib/medicalKnowledge/fastclick/fastclick.js',
                                                        'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                        'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                        'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                        'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                        'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                        'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                        'lib/medicalKnowledge/typeahead/typeahead.js',
                                                        'lib/medicalKnowledge/search/store.min.js',
                                                        'app/controllers/mkmyjs.js',
                                                        'app/controllers/mkGrid.js'
                                                    ]
                                                }
                                             );
                                        }
                                ]
                        }
                    })
                    .state('app.mksymptom', {
                        url: '/mksymptom',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '症状',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                    return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'lib/medicalKnowledge/css/my.css',
                                                'lib/medicalKnowledge/css/news.css',
                                                'lib/medicalKnowledge/css/base.css',
                                                'lib/medicalKnowledge/typeahead/typeahead.css',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                'lib/medicalKnowledge/fastclick/fastclick.js',
                                                'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                'lib/medicalKnowledge/typeahead/typeahead.js',
                                                'lib/medicalKnowledge/search/store.min.js',
                                                'app/controllers/mkmyjs.js',
                                                'app/controllers/mkGrid.js'
                                            ]
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.mkmedication', {
                        url: '/mkmedication',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '药品',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                    return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'lib/medicalKnowledge/css/my.css',
                                                'lib/medicalKnowledge/css/news.css',
                                                'lib/medicalKnowledge/css/base.css',
                                                'lib/medicalKnowledge/typeahead/typeahead.css',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                'lib/medicalKnowledge/fastclick/fastclick.js',
                                                'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                'lib/medicalKnowledge/typeahead/typeahead.js',
                                                'lib/medicalKnowledge/search/store.min.js',
                                                'app/controllers/mkmyjs.js',
                                                'app/controllers/mkGrid.js'
                                            ]
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.mklab', {
                        url: '/mklab',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '辅助检查',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                    return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'lib/medicalKnowledge/css/my.css',
                                                'lib/medicalKnowledge/css/news.css',
                                                'lib/medicalKnowledge/css/base.css',
                                                'lib/medicalKnowledge/typeahead/typeahead.css',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                'lib/medicalKnowledge/fastclick/fastclick.js',
                                                'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                'lib/medicalKnowledge/typeahead/typeahead.js',
                                                'lib/medicalKnowledge/search/store.min.js',
                                                'app/controllers/mkmyjs.js',
                                                'app/controllers/mkGrid.js'
                                            ]
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.mkmedicare', {
                        url: '/mkmedicare',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '医保药品',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                    return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'lib/medicalKnowledge/css/my.css',
                                                'lib/medicalKnowledge/css/news.css',
                                                'lib/medicalKnowledge/css/base.css',
                                                'lib/medicalKnowledge/typeahead/typeahead.css',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                'lib/medicalKnowledge/fastclick/fastclick.js',
                                                'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                'lib/medicalKnowledge/typeahead/typeahead.js',
                                                'lib/medicalKnowledge/search/store.min.js',
                                                'app/controllers/mkmyjs.js',
                                                'app/controllers/mkGrid.js'
                                            ]
                                        }
                                    );
                                }
                            ]
                        }
                    })
                    .state('app.mkclinicalpathway', {
                        url: '/mkclinicalpathway',
                        templateUrl:'views/tpl/medicalKnowledge.html',
                        ncyBreadcrumb: {
                            label: '临床路径',
                            description: ''
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    // return $ocLazyLoad.load('medicalKnowledge')
                                    //     .then(
                                    //     function() {
                                    return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'lib/medicalKnowledge/css/my.css',
                                                'lib/medicalKnowledge/css/news.css',
                                                'lib/medicalKnowledge/css/base.css',
                                                'lib/medicalKnowledge/typeahead/typeahead.css',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.css',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.css',
                                                'lib/medicalKnowledge/fastclick/fastclick.js',
                                                'lib/medicalKnowledge/sparkline/jquery.sparkline.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-1.2.2.min.js',
                                                'lib/medicalKnowledge/jvectormap/jquery-jvectormap-world-mill-en.js',
                                                'lib/medicalKnowledge/chartjs/Chart.min.js',
                                                'lib/medicalKnowledge/datatables/jquery.dataTables.min.js',
                                                'lib/medicalKnowledge/datatables/dataTables.bootstrap.min.js',
                                                'lib/medicalKnowledge/typeahead/typeahead.js',
                                                'lib/medicalKnowledge/search/store.min.js',
                                                'app/controllers/mkmyjs.js',
                                                'app/controllers/mkGrid.js'
                                            ]
                                        }
                                    );
                                }
                            ]
                        }
                    })

            }
        ]
    );