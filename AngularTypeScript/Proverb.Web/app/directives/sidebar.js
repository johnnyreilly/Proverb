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

        function link(scope, element, attrs) {
            var $sidebarInner = element.find(".sidebar-inner");
            var $dropdownElement = element.find(".sidebar-dropdown a");
            var sideBarIsVisible = false;
            var sideBarIsVisibleClass = "sideBarIsVisible";

            element.addClass("sidebar");
            $dropdownElement.click(dropdown);

            // collapse sidebar when route change starts (only affects mobile)
            scope.$on("$routeChangeStart", function (event, next, current) {
                hideSidebar();
            });

            function dropdown(e) {
                e.preventDefault();
                showOrHideSidebar();
            }

            function showOrHideSidebar() {
                if (sideBarIsVisible) {
                    hideSidebar();
                } else {
                    showSidebar();
                }
            }

            function hideSidebar() {
                // using direct attribute as the following don't work:
                // $sidebarInner.css("display") comes back "block" always
                // $sidebarInner.is(":visible") comes back true always
                if ($sidebarInner[0].style.display !== "none") {
                    $sidebarInner.slideUp(350);
                }
                $dropdownElement.removeClass(sideBarIsVisibleClass);
                sideBarIsVisible = false;
            }

            function showSidebar() {
                hideSidebar();

                $sidebarInner.slideDown(350);
                $dropdownElement.addClass(sideBarIsVisibleClass);
                sideBarIsVisible = true;
            }
        }
    });
})();
//# sourceMappingURL=sidebar.js.map
