angularApp.start({
    thirdPartyLibs: {
        toastr: window.toastr,
        underscore: window._
    },
    appConfig: {
        inDebug: true,
        remoteServiceRoot: "/api/",
        version: "Testing"
    }
});
