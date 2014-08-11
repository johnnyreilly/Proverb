var controllers;
(function (controllers) {
    "use strict";

    var controllerId = "topnav";

    var TopNav = (function () {
        function TopNav() {
            this.activate();
        }
        // Prototype methods
        TopNav.prototype.activate = function () {
            this.isCollapsed = true;
        };

        TopNav.prototype.toggleCollapsed = function () {
            return this.isCollapsed = !this.isCollapsed;
        };
        TopNav.$inject = [];
        return TopNav;
    })();

    angular.module("app").controller(controllerId, TopNav);
})(controllers || (controllers = {}));
//# sourceMappingURL=topnav.js.map
