(function () {
    "use strict";

    var serviceId = "repository.sage";
    angular.module("app").factory(serviceId, ["$http", "common", "config", repositorySage]);

    function repositorySage($http, common, config) {
        var log = common.logger.getLogFn(serviceId);
        var rootUrl = config.remoteServiceRoot + "sage";
        var cache = {};

        var service = {
            getAll: getAll,
            getById: getById,
            remove: remove,
            save: save
        };

        return service;

        function getAll() {
            return $http.get(rootUrl).then(function (response) {
                var sages = response.data;
                log(sages.length + " Sages loaded");
                return sages;
            });
        }

        function getById(id, forceRemote) {
            var sage;
            if (!forceRemote) {
                sage = cache[id];
                if (sage) {
                    log("Sage " + sage.name + " [" + sage.id + "] loaded from cache");
                    return common.$q.when(sage);
                }
            }

            return $http.get(rootUrl + "/" + id).then(function (response) {
                sage = response.data;
                cache[sage.id] = sage;
                log("Sage " + sage.name + " [" + sage.id + "] loaded");
                return sage;
            });
        }

        function remove(id) {
            return $http.delete(rootUrl + "/" + id).then(function (response) {
                var saveResponse = response.data;
                if (saveResponse.success) {
                    log("Sage [" + id + "] removed");
                }
                return saveResponse;
            });
        }

        function save(sage) {
            return $http.post(rootUrl, sage).then(function (response) {
                var saveResponse = response.data;
                if (saveResponse.success) {
                    log("Sage " + saveResponse.entity.name + " [" + saveResponse.entity.id + "] saved");
                }

                return saveResponse;
            });
        }
    }
})();
//# sourceMappingURL=repository.sage.js.map
