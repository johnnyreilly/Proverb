var controllers;
(function (controllers) {
    "use strict";

    var Dashboard = (function () {
        function Dashboard(common, datacontext) {
            this.common = common;
            this.datacontext = datacontext;
            this.news = {
                title: "Proverb",
                description: "The Wisdom of Socrates Aruldas (and The Team)"
            };
            this.messageCount = 0;
            this.sages = [];
            this.title = "Dashboard";

            this.log = common.logger.getLogFn(controllerId);

            this.activate();
        }
        // Prototype methods
        Dashboard.prototype.activate = function () {
            var _this = this;
            var promises = [this.getSages()];
            this.common.activateController(promises, controllerId).then(function () {
                return _this.log("Activated Dashboard View");
            });
        };

        Dashboard.prototype.getSages = function () {
            var _this = this;
            return this.datacontext.sage.getAll().then(function (data) {
                return _this.sages = data;
            });
        };
        Dashboard.$inject = ["common", "datacontext"];
        return Dashboard;
    })();

    var controllerId = "dashboard";
    angular.module("app").controller(controllerId, Dashboard);
})(controllers || (controllers = {}));
//# sourceMappingURL=dashboard.js.map
