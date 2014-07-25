module controllers {

    "use strict";

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

    var controllerId = "topnav";
    angular.module("app").controller(controllerId, TopNav);
}
