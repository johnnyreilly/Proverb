(function () {
    "use strict";

    var app = angular.module("app");

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

        function link(scope, element, attrs) {
            var $sidebarInner = element.find(".sidebar-inner");
            var $dropdownElement = element.find(".sidebar-dropdown a");
            element.addClass("sidebar");
            $dropdownElement.click(dropdown);

            function dropdown(e) {
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
//# sourceMappingURL=sidebar.js.map
