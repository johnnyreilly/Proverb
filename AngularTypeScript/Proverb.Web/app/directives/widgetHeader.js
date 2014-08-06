﻿(function () {
    "use strict";

    var app = angular.module("app");

    app.directive("widgetHeader", function () {
        //Usage:
        //<div widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                "title": "@",
                "subtitle": "@",
                "rightText": "@",
                "allowCollapse": "@"
            },
            templateUrl: "/app/directives/widgetHeader.html",
            restrict: "A"
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$set("class", "widget-head");
        }
    });
})();
//# sourceMappingURL=widgetHeader.js.map
