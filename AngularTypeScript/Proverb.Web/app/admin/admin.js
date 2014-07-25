﻿(function () {
    "use strict";
    var controllerId = "admin";
    angular.module("app").controller(controllerId, ["common", admin]);

    function admin(common) {
        var log = common.logger.getLogFn(controllerId);

        var vm = this;
        vm.title = "Admin";

        activate();

        function activate() {
            common.activateController([], controllerId).then(function () {
                log("Activated Admin View");
            });
        }
    }
})();
//# sourceMappingURL=admin.js.map
