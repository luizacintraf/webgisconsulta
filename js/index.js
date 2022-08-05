var editor, view, webmap, featureLayer;

require([
  "esri/WebMap",
  "esri/views/MapView",
  "esri/widgets/Expand",
  "esri/widgets/Search",
  "esri/widgets/Legend",
  "esri/widgets/Editor",
  "esri/popup/content/CustomContent",
  "esri/PopupTemplate",
  "esri/widgets/FeatureForm",
  "esri/form/FormTemplate"
], function (
  WebMap,
  MapView,
  Expand,
  Search,
  Legend,
  Editor,
  CustomContent,
  PopupTemplate,
  FeatureForm,
  FormTemplate
) {
  // Create a map from the referenced webmap item id
  webmap = new WebMap({
    portalItem: {
      id: "2c4bfaf6b251459b9107376566970978",
    },
  });

    view = new MapView({
    container: "viewDiv",
    map: webmap,
  });

  view.popup.defaultPopupTemplateEnabled = true;

  view.ui.empty("top-left");

  webmap.when(() => {
    orderLayers(webmap);

    //get contribution layer
    featureLayer = webmap.allLayers.items.filter(
      (a) => a.title == "Contribuição"
    )[0];

    //create custom content to popup
    const contentWidget = new CustomContent({
      outFields: ["*"],
      creator: (event) => {
        let oid = event.graphic.attributes.OBJECTID;
        let support =
          event.graphic.attributes.support == null
            ? 0
            : event.graphic.attributes.support;

        let bt = document.createElement("div");

        let idsLiked = localStorage.getItem("likes")
          ? JSON.parse(localStorage.getItem("likes"))
          : [];

        let isDisabled = idsLiked.find((el) => el == oid) ? "disabled" : "";

        bt.innerHTML = `<div class="support-button" id="like"><button onclick=selectButton(${oid}) class="like" id="btn_like" ${isDisabled}><i class="fa fa-thumbs-o-up" style="font-size:24px"></i></button><div id="number_likes">${support}</div>`;

        return bt;
      },
    });

    //create popupTemplate for contribution layer
    const template = new PopupTemplate({
      outFields: ["*"],
      content: [
        {
          type: "fields",
          fieldInfos: [
            {
              fieldName: "Categoria",
              label: "Categoria",
            },
//            {
//              fieldName: "Tipodeintervencao",
//              label: "Tipo de intervenção",
 //           },
            {
              fieldName: "Pessoa",
              label: "Pessoa",
            },
            {
              fieldName: "Comentario",
              label: "Comentário",
            },
          ],
        },
        contentWidget,
      ],
    });


      const formTemplate = new FormTemplate({
        title: "Damage assessments",
        description: "Provide information for insurance",
        elements: [{ // Autocasts to new GroupElement
          type: "group",
          label: "Inspector Information",
          description: "Field inspector information",
          elements: [              {
            type: "field",
            fieldName: "Categoria",
            label: "Categoria",
          },
          {
            type: "field",
            fieldName: "Tipodeintervencao",
            label: "Tipo de intervenção",
          },
          {
            type: "field",
            fieldName: "Pessoa",
            label: "Pessoa",
          },
          {
            type: "field",
            fieldName: "Comentario",
            label: "Comentário",
          }]
        }]
      });

    var editorTemplate = {
        layer: featureLayer, // pass in the feature layer,
        formTemplate:  { // autocastable to FormTemplate
          elements: [
              {
                  type: "field",
                  fieldName: "Categoria",
                  label: "Categoria",
                },
//                {
 //                 type: "field",
 //                 fieldName: "Tipodeintervencao",
 //                 label: "Tipo de intervenção",
 //               },
                {
                  type: "field",
                  fieldName: "Pessoa",
                  label: "Pessoa",
                },
                {
                  type: "field",
                  fieldName: "Comentario",
                  label: "Comentário",
                }
          ]
        },
        enabled: true, // default is true, set to false to disable editing functionality
        addEnabled: true, // default is true, set to false to disable the ability to add a new feature
        updateEnabled: false, // default is true, set to false to disable the ability to edit an existing feature
        deleteEnabled: false // default is true, set to false to disable the ability to delete features
      }

    featureLayer.popupTemplate = template;

    view.when(function () {
      // create editor widget
      editor = new Editor({
        view: view,
        container: document.getElementById("editorDiv"),
        allowedWorkflows: ["create"],
        layerInfos: [editorTemplate]
      });


      editor.when(() => {
        editor.messages.addFeature = "Adicionar Evento";
        editor.messages.widgetLabel = "Contribua com sua participação";
        editor.messages.selectTemplate = "Selecione o tipo de evento";
        editor.messages.clickToAddPoint =
          "Click no mapa para adicionar o ponto";
        editor.messages.placeFeature = "Adicionar ponto";

        //document.querySelectorAll(".esri-feature-form__label")[4].hidden=true
      });

      if (window.matchMedia("(min-width: 830px)").matches) {

        document.getElementById("editorDiv").hidden = false;

        view.ui.add(document.getElementById("editorDiv"), "top-right");
      }
    });
  });



  if (window.matchMedia("(max-width: 820px)").matches) {
    document.getElementById("sidebar").hidden = true;

    var legend = new Legend({
      view: view,
      layout: "auto",
      container: document.getElementById("legend"),
    });
  } else {
    var legend = new Legend({
      view: view,
      layout: "auto",
      container: document.createElement("div"),
    });

    let expand = new Expand({
      view: view,
      content: legend.container,
      expandTooltip: "Legenda",
      expanded: true,
      group: "top-left",
      expandIconClass: "esri-icon-handle-vertical",
    });

    view.ui.add(expand, "bottom-left");

    document.getElementById("navbar_mobile").hidden = true;
  }

  document.getElementById("openLegend").addEventListener("click", () => {
    if (document.getElementById("legend").hidden) {
      document.getElementById("editorDiv").hidden = true;
      document.getElementById("legend").hidden = false;
      document.getElementById("sidebar").hidden = true;
    } else {
      document.getElementById("legend").hidden = true;
    }
  });

  document.getElementById("plus").addEventListener("click", () => {
    if (document.getElementById("editorDiv").hidden) {
      document.getElementById("editorDiv").hidden = false;
      document.getElementById("legend").hidden = true;
      document.getElementById("sidebar").hidden = true;
    } else {
      document.getElementById("editorDiv").hidden = true;
    }
  });

  document.getElementById("openNav").addEventListener("click", () => {
    if (document.getElementById("sidebar").hidden) {
      document.getElementById("editorDiv").hidden = true;
      document.getElementById("legend").hidden = true;
      document.getElementById("sidebar").hidden = false;
    } else {
      document.getElementById("sidebar").hidden = true;
    }
  });
});
