interface repositories {
    /**
     * Get named Repository (by injection)
     */
    getRepo: (repoName: string) => any;
}

interface saveResponse<TEntity> {
    success: boolean;
    entity?: TEntity;
    errors?: { [ key: string]: string[] };
}

(function () {
    "use strict";

    var serviceId = "repositories";
    angular.module("app").factory(serviceId, ["$injector", repositories]);

    function repositories($injector: ng.auto.IInjectorService) {
        var service: repositories = {
            getRepo: getRepo,
        };

        return service;

        // Get named Repository Ctor (by injection), new it, and initialize it
        function getRepo(repoName) {
            var fullRepoName = "repository." + repoName.toLowerCase();
            var repo = $injector.get(fullRepoName);
            return repo;
            //var Repo = $injector.get(fullRepoName);
            //return new Repo(manager);
        }
    }
})();