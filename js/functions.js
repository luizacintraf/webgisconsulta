
const selectButton = (event, oid) => {
    var likes = Number(document.getElementById("number_likes").innerHTML);

    likes = likes + 1;

    let idsLiked = localStorage.getItem("likes") ? JSON.parse(localStorage.getItem("likes")) : [];
    idsLiked.push(oid);
    localStorage.setItem("likes", JSON.stringify(idsLiked));

    featureLayer.queryFeatures({
        objectIds: [oid],
        outFields: ["*"],
        returnGeometry: true
    }).then(f => {
        f.features.forEach(element => {

            element.attributes.support = likes

            console.log(element)


        });

        featureLayer.applyEdits({
            updateFeatures: f.features
        }).then((edits) => console.log(edits));

        $("#btn_like").prop("disabled", true)


    })
    // console.log({globalId:id,  OBJECTID :oid, support: likes})

    document.getElementById("number_likes").innerHTML = likes
}