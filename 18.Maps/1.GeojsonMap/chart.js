async function drawChart(container) {
    // Define chart parameters
    const WIDTH = 600
    const HEIGHT = 600

    // Append the SVG object to the body of the page
    const svg = d3.select("#chart")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)
        .style('border', "1px solid black")

    // Create a map projection 
    // This projects the spherical geo coordinates of the earth onto the screen
    // https://d3js.org/d3-geo/projection
    const projection = d3.geoMercator()
        // Set the scale
        .scale(100)                         // world scale
        //.scale(2000)                      // uk scale

        // Set the map centre
        .center([0,20])                     // somewhere in Mali
        //.center([-1.898575, 52.489471])   // Birmingham
        //.center([-2.5209, 53.9450])       // Dunsop Bridge
        //.center([-2.5, 54.8])             // GB midpoint

        .translate([WIDTH / 2, HEIGHT / 2]);    

    // Create path generator
    // This generates SVG path "d" attributes from geojson data, using the given projection
    // https://d3js.org/d3-geo/path
    const mapPathGenerator = d3.geoPath().projection(projection);

    // Load the geojson data
    let geoData = await d3.json("world.geojson")
    //let geoData = await d3.json("uk4.json")
    //let geoData = await d3.json("gb_0.1.json")

    // Filter data
    geoData.features = geoData.features.filter(function(d){
        ["France","Italy"].includes(d.properties.name)})

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(geoData.features) 
        .enter()
        .append("path")
        .attr("d", mapPathGenerator)
        .style("fill", "none")
        .style("stroke", "black")
        .style("opacity", 0.8);

}