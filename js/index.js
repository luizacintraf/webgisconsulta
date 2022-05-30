var editor, view, webmap, featureLayer

require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/widgets/Expand",
    "esri/widgets/Search",
    "esri/widgets/Legend",
    "esri/widgets/Editor",
    "esri/popup/content/CustomContent",
    "esri/PopupTemplate"
], function (
    WebMap,
    MapView,
    Expand, Search, Legend, Editor, CustomContent, PopupTemplate
) {
    // Create a map from the referenced webmap item id
    webmap = new WebMap({
        portalItem: {
            id: "2c4bfaf6b251459b9107376566970978"
        }
    });

    function orderLayers(group) {
        for (let l of group.layers.items) {
            if (l.geometryType == "polygon") {
                group.reorder(l, (group.layers.items.length - 1))
            } else if (l.geometryType == "point") {
                group.reorder(l, 0)
            }
        }
    }



    webmap.when(() => {
        orderLayers(webmap)
        featureLayer = webmap.allLayers.items.filter(a => a.title == "Contribuição")[0]

        const contentWidget = new CustomContent({
            outFields: ["*"],
            creator: (event) => {
                let oid = event.graphic.attributes.OBJECTID
                let support = event.graphic.attributes.support == null ? 0 : event.graphic.attributes.support
                let bt = document.createElement("div");

                let idsLiked = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
                let isDisabled = idsLiked.find(el => el == oid) ? "disabled" : ""

                bt.innerHTML = `<div class="support-button" id="like"><button onclick=selectButton(event,${oid}) class="like" id="btn_like" ${isDisabled}><i class="fa fa-thumbs-o-up" style="font-size:24px"></i></button><div id="number_likes">${support}</div>`
                console.log(JSON.stringify(event.graphic.attributes))

                return bt
            }
        });


        const template = new PopupTemplate({
            outFields: ["*"],
            content: [
                {
                    type: "fields",
                    fieldInfos: [
                        {
                            fieldName: "Categoria",
                            label: "Categoria"
                        },
                        {
                            fieldName: "Tipodeintervencao",
                            label: "Tipo de intervenção"
                        },
                        {
                            fieldName: "Pessoa",
                            label: "Pessoa"
                        },
                        {
                            fieldName: "Comentario",
                            label: "Comentário"
                        }
                    ]
                },
                contentWidget

            ]
        });

        featureLayer.popupTemplate = template;

        view.when(function () {
            //sview.popup.autoOpenEnabled = false; //disable popups

            // Create the Editor
            editor = new Editor(
                {
                    view: view,
                    container: document.getElementById("editorDiv"),
                    allowedWorkflows: ["create"],
                    layerInfos: [{
                        view: view,
                        layer: featureLayer, // pass in the feature layer,
                        formTemplate: { // autocastable to FormTemplate
                            elements: [
                                {
                                    type: "field",
                                    fieldName: "Categoria",
                                    label: "Categoria"
                                },
                                {
                                    type: "field",
                                    fieldName: "Tipodeintervencao",
                                    label: "Tipo de intervenção"
                                },
                                {
                                    type: "field",
                                    fieldName: "Pessoa",
                                    label: "Pessoa"
                                },
                                {
                                    type: "field",
                                    fieldName: "Comentario",
                                    label: "Comentário"
                                }
                            ]
                        },
                        enabled: true, // default is true, set to false to disable editing functionality
                        addEnabled: true, // default is true, set to false to disable the ability to add a new feature
                        updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
                        deleteEnabled: false // default is true, set to false to disable the ability to delete features
                    }]

                });

            editor.when(() => {
                editor.messages.addFeature = "Adicionar Evento"
                editor.messages.widgetLabel = "Contribua com sua participação"
                editor.messages.selectTemplate = "Selecione o tipo de evento"
                editor.messages.clickToAddPoint = "Click no mapa para adicionar o ponto"
                editor.messages.placeFeature = "Adicionar ponto"

            })



            // if(window.matchMedia("(max-width: 767px)").matches){
            //     document.getElementById("editorDiv").append(editor.container)
            // }else{
            // // Add widget to top-right of the view
            // view.ui.add(editor, "top-right");
            // }

        });
    })



    view = new MapView({
        container: "viewDiv",
        map: webmap
    });
    view.popup.defaultPopupTemplateEnabled = true
    view.ui.empty("top-left");

    // view.ui.add(new Expand({
    //     view: view,
    //     expandTooltip: "Mudar Basemap",
    //     content: basemapGallery.container,
    //     expandIconClass: "esri-icon-basemap"
    // }), "top-left");




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





    if (window.matchMedia("(max-width: 600px)").matches) {

        document.getElementById("sidebar").hidden = true

        var legend = new Legend({
            view: view,
            layout: "auto",
            container: document.getElementById("legend")
        });
        
    } else {


        var legend = new Legend({
            view: view,
            layout: "auto",
            container: document.createElement("div")
        });


        let expand = new Expand({
            view: view,
            content: legend.container,
            expandTooltip: "Legenda",
            expanded: true,
            group: "top-left",
            expandIconClass: "esri-icon-handle-vertical"
        });


        view.ui.add(expand, "bottom-left");

    document.getElementById("navbar_mobile").hidden = true




    }


    document.getElementById("openLegend").addEventListener("click", () => {
        if (document.getElementById("legend").hidden) {
            document.getElementById("editorDiv").hidden = true
            document.getElementById("legend").hidden = false
            document.getElementById("sidebar").hidden = true
        } else {
            document.getElementById("legend").hidden = true
        }

    });


    document.getElementById("plus").addEventListener("click", () => {
        if (document.getElementById("editorDiv").hidden) {
            document.getElementById("editorDiv").hidden = false
            document.getElementById("legend").hidden = true
            document.getElementById("sidebar").hidden = true
        } else {
            document.getElementById("editorDiv").hidden = true
        }

    })

    document.getElementById("openNav").addEventListener("click", () => {
        if (document.getElementById("sidebar").hidden) {
            document.getElementById("editorDiv").hidden = true
            document.getElementById("legend").hidden = true
            document.getElementById("sidebar").hidden = false
        } else {
            document.getElementById("sidebar").hidden = true
        }

    })






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

