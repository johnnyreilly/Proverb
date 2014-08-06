﻿(function () {
    "use strict";

    var app = angular.module("app");

    // Thanks @Basarat! http://stackoverflow.com/a/24863256/761388
    function safeWatch<T extends Function>(expression: T) {
        return () => {
            try {
                return expression();
            }
            catch (e) {
                return null;
            }
        };
    }

    // Plant a validation message to the right of the element when it is declared invalid by the server
    app.directive("serverError", [function () {

        // Usage:
        // <input class="col-xs-12 col-sm-9" name="sage.name" ng-model="vm.sage.name" server-error="vm.errors" />

        var directive = {
            link: link,
            restrict: "A",
            require: "ngModel", // Make Angular supply the ngModel controller as the 4th parameter in the link function
            scope: { // Pass in name and serverError to the scope
                name: "@",
                serverError: "="
            }
        };
        return directive;

        function link(scope: serverErrorScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) {

            // Bootstrap alert template for error
            var template = '<div class="alert alert-danger col-xs-9 col-xs-offset-2" role="alert"><i class="glyphicon glyphicon-warning-sign larger"></i> %error%</div>';

            // Create an element to hold the validation message
            var decorator = angular.element('<div></div>');
            element.after(decorator);

            // Watch ngModelController.$error.server & show/hide validation accordingly
            scope.$watch(safeWatch(() => ngModelController.$error.server), showHideValidation);

            function showHideValidation(serverError: boolean) {

                // Display an error if serverError is true otherwise clear the element
                var errorHtml = "";
                if (serverError) {
                    // Aliasing serverError and name to make it more obvious what their purpose is
                    var errorDictionary = scope.serverError;
                    var errorKey = scope.name;
                    errorHtml = template.replace(/%error%/, errorDictionary[errorKey] || "Unknown error occurred...");
                }
                decorator.html(errorHtml);
            }

            // wipe the server error message upon keyup or change events so can revalidate with server 
            element.on("keyup change", (event) => {
                scope.$apply(() => { ngModelController.$setValidity("server", true); });
            });
        }
    }]);

    // upon keyup / change events set validity to true - to be used alongside tooltip
    app.directive("serverErrorTooltip", ["$compile", function ($compile: ng.ICompileService) {

        // Usage:
        // <input class="col-xs-12 col-sm-9" name="sage.name" ng-model="vm.sage.name"
        //        server-error-tooltip tooltip="{{vm.errors['sage.name']}}" />

        var directive = {
            link: link,
            restrict: "A",
            require: "ngModel", // Make Angular supply the ngModel controller as the 4th parameter in the link function
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) {

            // wipe the server error message upon keyup or change events so can revalidate with server 
            element.on("keyup change", (event) => {
                scope.$apply(() => { ngModelController.$setValidity("server", true); });
            });
        }

    }]);

})(); 