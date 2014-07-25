(function () {
    "use strict";

    var serviceId = "repository.saying";
    angular.module("app").factory(serviceId, ["$http", "common", "config", repositorySaying]);

    function repositorySaying($http, common, config) {
        var log = common.logger.getLogFn(serviceId);
        var rootUrl = config.remoteServiceRoot;

        var service = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http.get(rootUrl + "saying").then(function (response) {
                var sayings = response.data;
                log(sayings.length + " Sayings loaded");
                return sayings;
            });
        }
    }
})();
//# sourceMappingURL=repository.saying.js.map
