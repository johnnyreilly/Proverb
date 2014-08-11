interface saying {
    id: number;
    sageId: number;
    sage?: sage;
    text: string;
}

interface repositorySaying {
    getAll: () => ng.IPromise<saying[]>;
}

(function () {
    "use strict";

    var serviceId = "repository.saying";
    angular.module("app").factory(serviceId, ["$http", "common", "config", repositorySaying]);

    function repositorySaying($http: ng.IHttpService, common: common, config: config) {

        var log = common.logger.getLogFn(serviceId);
        var rootUrl = config.remoteServiceRoot;

        var service: repositorySaying = {
            getAll: getAll
        };

        return service;

        function getAll() {
            return $http.get<saying[]>(rootUrl + "saying").then(response => {
                var sayings = response.data;
                log(sayings.length + " Sayings loaded");
                return sayings;
            });
        }
    }
})();