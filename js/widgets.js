
require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/GeoJSONLayer",
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/Search",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Home",
    "esri/widgets/Fullscreen",
    "esri/widgets/ScaleBar",
    "esri/widgets/Legend",
    "esri/widgets/CoordinateConversion",
    "esri/widgets/Locate",
    "esri/widgets/DistanceMeasurement2D",
    "esri/widgets/AreaMeasurement2D",
    "esri/widgets/Print",
    "esri/widgets/Track",
    "esri/widgets/LayerList",
    "esri/widgets/Editor","esri/widgets/Zoom"
], function(
    WebMap,
    MapView,
    GeoJSONLayer, Expand, BasemapGallery, Search, BasemapToggle, Home, Fullscreen, ScaleBar, Legend, CoordinateConversion, Locate, DistanceMeasurement2D, AreaMeasurement2D, Print, Track, LayerList, Editor, Zoom
) {

    var layerList = new LayerList({
        view: view,
        container: document.getElementById("layerlistdiv")
    });

    layerList.selectionEnabled = true

    // view.ui.add(new Expand({
    //     view: view,
    //     content: layerList.container,
    //     expandTooltip: "Camadas",
    //     expanded: false,
    //     group: "top-left",
    //     expandIconClass: "esri-icon-handle-vertical"
    // }), "top-left");

    //basemap gallery
    var basemapGallery = new BasemapGallery({
        view: view,
        container: document.getElementById("basemapdiv")
    });

    // view.ui.add(new Expand({
    //     view: view,
    //     expandTooltip: "Mudar Basemap",
    //     content: basemapGallery.container,
    //     expandIconClass: "esri-icon-basemap"
    // }), "top-left");

        //homewidget widget
        var homeWidget = new Home({
            view: view,
            container:document.getElementById("home")
        });
        // view.ui.add(homeWidget, "top-left");
    
        view.ui.add(document.getElementById("left-widgets"), "bottom-right");
        //fullscreen widget
        var fullscreen = new Fullscreen({
            view: view,
            container:document.getElementById("expand")
        });
    
        // view.ui.add(fullscreen, {
        //     position: "top-left",
        //     index: 4
        // });

        var zoom = new Zoom({
            view: view,
            container:document.getElementById("zoom")
          });

              //scale bar widget
    var scaleBar = new ScaleBar({
        view: view,
        container:document.getElementById("scale")
    });

    // view.ui.add(scaleBar, {
    //     position: "bottom-right",
    //     index: 1
    // });

})