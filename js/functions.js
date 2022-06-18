const selectButton = (oid) => {
  /**
   * Function to like the given attribute pressed
   * @date 2022-06-18
   * @param {string} oid
   */

  var likes = Number(document.getElementById("number_likes").innerHTML);

  likes = likes + 1;

  let idsLiked = localStorage.getItem("likes")
    ? JSON.parse(localStorage.getItem("likes"))
    : [];
  idsLiked.push(oid);
  localStorage.setItem("likes", JSON.stringify(idsLiked));

  featureLayer
    .queryFeatures({
      objectIds: [oid],
      outFields: ["*"],
      returnGeometry: true,
    })
    .then((f) => {
      f.features.forEach((element) => {
        element.attributes.support = likes;
      });

      featureLayer
        .applyEdits({
          updateFeatures: f.features,
        })
        .then((edits) => console.log(edits));

      $("#btn_like").prop("disabled", true);
    });


  document.getElementById("number_likes").innerHTML = likes;
};

function orderLayers(group) {
  /**
   * These function is used to reorder layers to be in the order: point, line, polygon
   *
   * @param group (array) group of layers
   */

  for (let l of group.layers.items) {
    if (l.geometryType == "polygon") {
      group.reorder(l, group.layers.items.length - 1);
    } else if (l.geometryType == "point") {
      group.reorder(l, 0);
    }
  }
}

function searchLayers() {
  /**
   * Search in the layer list the selected layer
   */
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  console.log(input);
  filter = input.value.toUpperCase();
  ul = layerList.container.querySelector("ul");
  li = ul.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    txtValue = li[i].querySelector(".esri-layer-list__item-title").title;
    // console.log(a)
    // txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
