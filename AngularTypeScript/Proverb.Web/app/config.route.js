﻿(function () {
    "use strict";

    var app = angular.module("app");

    // Collect the routes
    app.constant("routes", getRoutes());

    // Define the routes
    function getRoutes() {
        return [
            {
                url: "/",
                config: {
                    templateUrl: "app/dashboard/dashboard.html",
                    title: "dashboard",
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            }, {
                url: "/sages",
                config: {
                    title: "sages",
                    templateUrl: "app/sages/sages.html",
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-users"></i> Sages'
                    }
                }
            }, {
                url: "/sages/detail/:id",
                config: {
                    title: "sage details",
                    templateUrl: "app/sages/sageDetail.html",
                    settings: {}
                }
            }, {
                url: "/sages/edit/:id",
                config: {
                    title: "sage edit",
                    templateUrl: "app/sages/sageEdit.html",
                    settings: {}
                }
            }, {
                url: "/sayings/",
                config: {
                    title: "sayings",
                    templateUrl: "app/sayings/sayings.html",
                    reloadOnSearch: false,
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-comment"></i> Sayings'
                    }
                }
            }
        ];
    }
})();
//# sourceMappingURL=config.route.js.map
