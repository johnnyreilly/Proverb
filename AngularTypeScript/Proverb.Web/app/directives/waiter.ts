(function () {
    "use strict";

    var app = angular.module("app");

    app.directive("waiter", ["config", function (config: config) {
        //Usage:
        //<waiter is-waiting="vm.isBusy" spinner-options="vm.spinnerOptions" waitMessage="vm.busyMessage"></waiter>
        var directive = {
            link: link,
            replace: true,
            restrict: "E",
            scope: {
                "isWaiting": "=",
                "spinnerOptions": "=",
                "waitMessage": "="
            },
            templateUrl: config.appRoot + "app/directives/waiter.html" + config.urlCacheBusterSuffix
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            //attrs.$set("class", "widget-head");
        }
    }]);
})(); 