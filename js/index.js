var editor,view,webmap


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
    "esri/widgets/Editor"
], function(
    WebMap,
    MapView,
    GeoJSONLayer, Expand, BasemapGallery, Search, BasemapToggle, Home, Fullscreen, ScaleBar, Legend, CoordinateConversion, Locate, DistanceMeasurement2D, AreaMeasurement2D, Print, Track, LayerList, Editor
) {
    // Create a map from the referenced webmap item id
    webmap = new WebMap({
        portalItem: {
            id: "b0558e318b7c4034998cda65847a0f91"
        }
    });

    function orderLayers(group){
        for(let l of group.layers.items){
            if(l.geometryType=="polygon"){
                group.reorder(l,(group.layers.items.length-1))
            }else if(l.geometryType=="point"){
                group.reorder(l,0)
            }
        }
    }

    webmap.when(()=>{
        orderLayers(webmap)
    })
    


    view = new MapView({
        container: "viewDiv",
        map: webmap
    });
    view.popup.defaultPopupTemplateEnabled=true
    view.ui.empty("top-left");

    view.when(function() {
        view.popup.autoOpenEnabled = false; //disable popups

        // Create the Editor
        editor = new Editor({
            view: view,
            allowedWorkflows: ["create"]
        });
        editor.when(() => {
            editor.messages.addFeature = "Adicionar Evento"
            editor.messages.widgetLabel = "Contribua com sua participação"
            editor.messages.selectTemplate = "Selecione o tipo de evento"
            editor.messages.clickToAddPoint = "Click no mapa para adicionar o ponto"
            editor.messages.placeFeature = "Adicionar ponto"

        })




        // Add widget to top-right of the view
        view.ui.add(editor, "top-right");
    });



    // //basemap toggle
    // var basemapToggle = new BasemapToggle({
    //     view: view,
    //     nextBasemap: "osm"
    // });

    // view.ui.add(basemapToggle, {
    //     position: "top-right",
    //     index: 0
    // });

    //search widget
    var searchWidget = new Search({
        view: view,
        container: document.createElement("div")
    });

    view.ui.add(searchWidget, {
        position: "top-left",
        index: 0
    });

    //legend widget
    var legend = new Legend({
        view: view,
        layout: "auto",
        container: document.createElement("div")
    });

    view.ui.add(new Expand({
        view: view,
        content: legend.container,
        expandTooltip: "Legenda",
        expanded: true,
        group: "top-left",
        expandIconClass: "esri-icon-handle-vertical"
    }), "bottom-left");







    // //coordinate conversion widget
    // view.ui.add(
    //     new CoordinateConversion({
    //         view
    //     }),
    //     "bottom-right"
    // );


    // // Locate widget
    // view.ui.add(
    //     new Locate({
    //         view
    //     }),
    //     "top-left"
    // );

    // // Track widget
    // var track = new Track({
    //     view
    // });
    // view.ui.add(track, "top-left");


    // // Print widget
    // view.ui.add(
    //     new Expand({
    //         view,
    //         expandTooltip: "Imprima sua visualização",
    //         group: "top-right",
    //         content: new Print({
    //             view,
    //             printServiceUrl: "https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task"
    //         })
    //     }),
    //     "top-right"
    // );

    // // Measurement widget
    // view.ui.add(
    //     new Expand({
    //         view,
    //         group: "bottom-right",
    //         expandTooltip: "Medir distâncias",
    //         content: new DistanceMeasurement2D({
    //             view
    //         })
    //     }),
    //     "top-right"
    // );
    // view.ui.add(
    //     new Expand({
    //         view,
    //         group: "bottom-right",
    //         expandTooltip: "Medir áreas",
    //         content: new AreaMeasurement2D({
    //             view
    //         })
    //     }),
    //     "top-right"
    // );




});

