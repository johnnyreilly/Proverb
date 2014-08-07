angularApp.start({
    thirdPartyLibs: {
        toastr: window.toastr
    },
    appConfig: {
        inDebug: true,
        remoteServiceRoot: "/api/",
        version: "Testing"
    }
});
