module controllers {

    "use strict";

    var controllerId = "topnav";

    class TopNav {

        isCollapsed: boolean;

        static $inject = [];
        constructor() {
            this.activate();
        }

        // Prototype methods

        activate() {
            this.isCollapsed = true;
        }

        toggleCollapsed() {
            return this.isCollapsed = !this.isCollapsed;
        }

        // Instance methods
    }

    angular.module("app").controller(controllerId, TopNav);
}
