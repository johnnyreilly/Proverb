﻿interface ccSpinnerWindowService extends ng.IWindowService {
    Spinner: typeof Spinner;
}

interface ccSpinnerScope extends ng.IScope {
    spinner: Spinner;
}

interface ccSpinnerAttributes extends ng.IAttributes {
    ccSpinner: string;
}

interface serverErrorScope extends ng.IScope {
    form: ng.IFormController;
    errors: { [field: string]: string };
}

(function () {
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

    app.directive("ccImgPerson", ["config", function (config: config) {
        //Usage:
        //<img data-cc-img-person="{{s.speaker.imageSource}}"/>
        var basePath = config.imageSettings.imageBasePath;
        var unknownImage = config.imageSettings.unknownPersonImageSource;
        var directive = {
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            attrs.$observe("ccImgPerson", function(value: string) {
                value = basePath + (value || unknownImage);
                attrs.$set("src", value);
            });
        }
    }]);


    app.directive("ccSidebar", function () {
        // Opens and clsoes the sidebar menu.
        // Usage:
        //  <div data-cc-sidebar>
        // Creates:
        //  <div data-cc-sidebar class="sidebar">
        var directive = {
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            var $sidebarInner = element.find(".sidebar-inner");
            var $dropdownElement = element.find(".sidebar-dropdown a");
            element.addClass("sidebar");
            $dropdownElement.click(dropdown);

            function dropdown(e: Event) {
                var dropClass = "dropy";
                e.preventDefault();
                if (!$dropdownElement.hasClass(dropClass)) {
                    hideAllSidebars();
                    $sidebarInner.slideDown(350);
                    $dropdownElement.addClass(dropClass);
                } else if ($dropdownElement.hasClass(dropClass)) {
                    $dropdownElement.removeClass(dropClass);
                    $sidebarInner.slideUp(350);
                }

                function hideAllSidebars() {
                    $sidebarInner.slideUp(350);
                    $(".sidebar-dropdown a").removeClass(dropClass);
                }
            }
        }
    });


    app.directive("ccWidgetClose", function () {
        // Usage:
        // <a data-cc-widget-close></a>
        // Creates:
        // <a data-cc-widget-close="" href="#" class="wclose">
        //     <i class="fa fa-remove"></i>
        // </a>
        var directive = {
            link: link,
            template: '<i class="fa fa-remove"></i>',
            restrict: "A"
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            attrs.$set("href", "#");
            attrs.$set("wclose", undefined);
            element.click(close);

            function close(e: Event) {
                e.preventDefault();
                element.parent().parent().parent().hide(100);
            }
        }
    });

    app.directive("ccWidgetMinimize", function () {
        // Usage:
        // <a data-cc-widget-minimize></a>
        // Creates:
        // <a data-cc-widget-minimize="" href="#"><i class="fa fa-chevron-up"></i></a>
        var directive = {
            link: link,
            template: '<i class="fa fa-chevron-up"></i>',
            restrict: "A"
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            //$("body").on("click", ".widget .wminimize", minimize);
            attrs.$set("href", "#");
            attrs.$set("wminimize", undefined);
            element.click(minimize);

            function minimize(e: Event) {
                e.preventDefault();
                var $wcontent = element.parent().parent().next(".widget-content");
                var iElement = element.children("i");
                if ($wcontent.is(":visible")) {
                    iElement.removeClass("fa fa-chevron-up");
                    iElement.addClass("fa fa-chevron-down");
                } else {
                    iElement.removeClass("fa fa-chevron-down");
                    iElement.addClass("fa fa-chevron-up");
                }
                $wcontent.toggle(500);
            }
        }
    });

    app.directive("ccSpinner", ["$window", function ($window: ccSpinnerWindowService) {
        // Description:
        //  Creates a new Spinner and sets its options
        // Usage:
        //  <div data-cc-spinner="vm.spinnerOptions"></div>
        var directive = {
            link: link,
            restrict: "A"
        };
        return directive;

        function link(scope: ccSpinnerScope, element: ng.IAugmentedJQuery, attrs: ccSpinnerAttributes) {
            scope.spinner = null;
            scope.$watch(attrs.ccSpinner, function (options) {
                if (scope.spinner) {
                    scope.spinner.stop();
                }
                scope.spinner = new $window.Spinner(options);
                scope.spinner.spin(element[0]);
            }, true);
        }
    }]);

    app.directive("ccWidgetHeader", function() {
        //Usage:
        //<div data-cc-widget-header title="vm.map.title"></div>
        var directive = {
            link: link,
            scope: {
                "title": "@",
                "subtitle": "@",
                "rightText": "@",
                "allowCollapse": "@"
            },
            templateUrl: "/app/layout/widgetheader.html",
            restrict: "A",
        };
        return directive;

        function link(scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) {
            attrs.$set("class", "widget-head");
        }
    });

    // Plant a validation message to the right when one is available
    app.directive("serverError", [function () {
        // Usage:
        //<input class="col-xs-12 col-sm-9" name="sage.name" ng-model="vm.sage.name" server-error />
        var directive = {
            link: link,
            restrict: "A",
            require: "ngModel" // Make Angular supply the ngModel controller as the 4th parameter in the link function
        };
        return directive;

        function link(scope: serverErrorScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModelController: ng.INgModelController) {

            // Get name of element which will be used to extract data from the form on the scope (ng.IFormController)
            // and the errors collection on the scope ({ [field: string]: string })
            var name: string = attrs["name"];

            // Bootstrap alert template for error
            var template = '<div class="alert alert-danger col-xs-9 col-xs-offset-2" role="alert"><i class="glyphicon glyphicon-warning-sign larger"></i> %error%</div>';

            // Create an element to hold the validation message
            var decorator = angular.element('<div></div>');
            element.after(decorator);

            // Watch the scope.form['sage.name'].$error.server value (for example) and show or hide validation message accordingly
            scope.$watch(safeWatch(() => ngModelController.$error.server), showHideValidation);

            function showHideValidation(serverError: boolean) {

                // Display an error if serverError is true otherwise clear the element
                var errorHtml = serverError ? template.replace(/%error%/, scope.errors[name] || "Unknown error occurred...") : "";
                decorator.html(errorHtml);
            }

            // wipe the server error message upon keyup or change events so can revalidate with server 
            // http://codetunes.com/2013/server-form-validation-with-angular/
            element.on("keyup change", (event) => {
                scope.$apply(() => { ngModelController.$setValidity("server", true); });
            });
        }
    }]);

})();