(function () {
    "use strict";

    var app = angular.module("app");

    app.directive("sidebar", function () {
        // Opens and clsoes the sidebar menu.
        // Usage:
        //  <div sidebar>
        // Creates:
        //  <div sidebar class="sidebar">
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

})(); 