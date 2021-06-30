
var layerList
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

    layerList = new LayerList({
        view: view,
        container: document.getElementById("layerlistdiv"),
        listItemCreatedFunction: defineActions
    });

    layerList.selectionEnabled = true

    

function defineActions(event) {


  var item = event.item;


    item.actionsSections = [
      [
        {
          title: "Go to full extent",
          className: "esri-icon-zoom-out-fixed",
          id: "full-extent"
        }
      ],
      [
        {
          title: "Increase opacity",
          className: "esri-icon-up",
          id: "increase-opacity"
        },
        {
          title: "Decrease opacity",
          className: "esri-icon-down",
          id: "decrease-opacity"
        }
      ]
    ];
}
 
 
layerList.on("trigger-action", function(event) {
  // The layer visible in the view at the time of the trigger.
  
  var visibleLayer = event.item.layer

  // Capture the action id.
  var id = event.action.id;

  if (id === "full-extent") {
    view.extent= visibleLayer.fullExtent;
  } else if (id === "increase-opacity") {
    // If the increase-opacity action is triggered, then
    // increase the opacity of the GroupLayer by 0.25.

    if (visibleLayer.opacity < 1) {
        visibleLayer.opacity += 0.10;
    }
  } else if (id === "decrease-opacity") {
    // If the decrease-opacity action is triggered, then
    // decrease the opacity of the GroupLayer by 0.25.

    if (visibleLayer.opacity > 0) {
        visibleLayer.opacity -= 0.10;
    }
  }
});

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
function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    console.log(input)
    filter = input.value.toUpperCase();
    ul = layerList.container.querySelector('ul')
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        
        txtValue =li[i].querySelector('.esri-layer-list__item-title').title;
        // console.log(a)
        // txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}