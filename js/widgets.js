var layerList, links;

require([
  "esri/widgets/BasemapGallery",
  "esri/widgets/Search",
  "esri/widgets/Home",
  "esri/widgets/Fullscreen",
  "esri/widgets/ScaleBar",
  "esri/widgets/LayerList",
  "esri/widgets/Zoom",
], function (
  BasemapGallery,
  Search,
  Home,
  Fullscreen,
  ScaleBar,
  LayerList,
  Zoom
) {
  
  //get the urls for downloads
  fetch("content/layers.json")
    .then((res) => res.json())
    .then((res) => (links = res));

  var searchWidget = new Search({
    view: view,
    container: document.createElement("div"),
  });

  view.ui.add(searchWidget, {
    position: "top-left",
    index: 0,
  });

  layerList = new LayerList({
    view: view,
    container: document.getElementById("layerlistdiv"),
    listItemCreatedFunction: defineActions,
  });

  layerList.selectionEnabled = true;

  function defineActions(event) {
    /**
     * Define actions to Layer List
     * @date 2022-06-18
     * @param {event} event
     */

    var item = event.item;

    item.actionsSections = [
      [
        {
          title: "Go to full extent",
          className: "esri-icon-zoom-out-fixed",
          id: "full-extent"
        },
        {
          title: "Baixar camada",
          className: "esri-icon-download",
          id: "download"
        },
      ],
      [
        {
          title: "Increase opacity",
          className: "esri-icon-up",
          id: "increase-opacity",
        },
        {
          title: "Decrease opacity",
          className: "esri-icon-down",
          id: "decrease-opacity",
        },
      ],
    ];
  }

  layerList.on("trigger-action", function (event) {
    // The layer visible in the view at the time of the trigger.
    var visibleLayer = event.item.layer;

    // Capture the action id.
    var id = event.action.id;

    if (id === "full-extent") {

      view.extent = visibleLayer.fullExtent;

    } else if (id === "increase-opacity") {
      // If the increase-opacity action is triggered, then
      // increase the opacity of the GroupLayer by 0.25.

      if (visibleLayer.opacity < 1) {
        visibleLayer.opacity += 0.1;
      }

    } else if (id === "decrease-opacity") {
      // If the decrease-opacity action is triggered, then
      // decrease the opacity of the GroupLayer by 0.25.

      if (visibleLayer.opacity > 0) {
        visibleLayer.opacity -= 0.1;
      }

    } else if (id == "download") {

      //get the url from the visible layer
      var url = links.find((el) => el.titulo == visibleLayer.title).link;
      window.open(url);
    }
  });

  
  new BasemapGallery({
    view: view,
    container: document.getElementById("basemapdiv"),
  });


  new Home({
    view: view,
    container: document.getElementById("home"),
  });
  
  new Fullscreen({
    view: view,
    container: document.getElementById("expand"),
  });
  new Zoom({
    view: view,
    container: document.getElementById("zoom"),
  });

  new ScaleBar({
    view: view,
    style: "ruler",
    container: document.getElementById("scale"),
  });


  view.ui.add(document.getElementById("left-widgets"), "bottom-right");


});



