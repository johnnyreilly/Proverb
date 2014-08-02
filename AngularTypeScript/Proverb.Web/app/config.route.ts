interface configRoute {
    url: string;
    config: configRouteConfig;
}

interface configRouteConfig extends ng.route.IRoute {
    title: string;
    settings: {
        nav?: number;
        content?: string;
    };
}

(function () {
    "use strict";

    var app = angular.module("app");

    // Collect the routes
    app.constant("routes", getRoutes());

    // Define the routes 
    function getRoutes(): configRoute[] {
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
                url: "/sayings",
                config: {
                    title: "sayings",
                    templateUrl: "app/sayings/sayings.html",
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-comment"></i> Sayings'
                    }
                }
            }, {
                url: "/admin",
                config: {
                    title: "admin",
                    templateUrl: "app/admin/admin.html",
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            }
        ];
    }
})();