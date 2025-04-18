async function prepareData() {
    // Get some data)
      const api_url = "uk.geojson";
      const response = await fetch(api_url);
      var data = await response.json();

    let features = data.features
    let numFeatures = features.length
    console.log("Num Features:", numFeatures)

    console.log(features[0])

    console.log(Object.keys(features[0]))
    console.log(Object.keys(features[0].properties))
    console.log(Object.keys(features[0].geometry))
    console.log(features[0].geometry.coordinates)

    data.features = features.slice(1,2)

    console.log(data)

    download(data, 'data.geojson'); 
}

  // Download the result of a manipulation as a new file
  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], {
      type: 'text/plain'
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  
