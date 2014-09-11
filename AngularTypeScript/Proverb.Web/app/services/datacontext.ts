interface datacontext {
    [index: string]: any; // Because of this issue: https://typescript.codeplex.com/discussions/535628
    saying: repositorySaying;
    sage: repositorySage;
}

(function () {
    "use strict";

    var serviceId = "datacontext";
    angular.module("app").factory(serviceId, ["$http", "common", "repositories", datacontext]);

    function datacontext($http: ng.IHttpService, common: common, repositories: repositories) {

        var $q = common.$q;
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(serviceId);
        var logError = getLogFn(serviceId, "error");
        var logSuccess = getLogFn(serviceId, "success");

        var service: datacontext = {
            // Undefined members will be replaced with properties in defineLazyLoadedRepos
            saying: undefined,
            sage: undefined
        };

        defineLazyLoadedRepos();

        return service;


        /**
         * Replace undefined members on service with ES5 properties for each repo
         */
        function defineLazyLoadedRepos() {

            var repoNames: string[] = [];
            for (var key in service) {
                if (service.hasOwnProperty(key) && (service[key] === undefined)) {
                    repoNames.push(key);
                }
            }

            repoNames.forEach(function (name) {
                Object.defineProperty(service, name, {
                    configurable: true, // will redefine this property once
                    get: function () {
                        // The 1st time the repo is request via this property, 
                        // we ask the repositories for it (which will inject it).
                        var repo = repositories.getRepo(name);
                        // Rewrite this property to always return this repo;
                        // no longer redefinable
                        Object.defineProperty(service, name, {
                            value: repo,
                            configurable: false,
                            enumerable: true
                        });
                        return repo;
                    }
                });
            });
        }

        /*
        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }
        */
    }
})();