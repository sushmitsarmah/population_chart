(async (win) => {
    const constants = win.chart.constants;
    const utils = win.chart.utils;

    const mapUtils = {};

    // map projection
    const projection = d3.geoAitoff()
        .translate([ constants.width / 2, constants.height / 2])
            .scale(200);

    // geo path function to create the map
    const path = d3.geoPath(projection);

    // draw the map
    mapUtils.drawMap = (svg, worldMap) => {
        const topoFeatures = topojson.feature(
            worldMap,
            worldMap.objects.ne_110m_admin_0_countries
        ).features;

        const topoMesh = topojson.mesh(
            worldMap,
            worldMap.objects.ne_110m_admin_0_countries,
            (a, b) => (a !== b)
        );        

        // land mass
        svg.append('g')
            .attr('class', 'countries')
            .selectAll('path')
            .data(topoFeatures)
            .enter().append('path')
            .attr('d', path);

        // borders
        svg.append('path')
            .attr('class', 'country-borders')
            .attr('d', path(topoMesh) );
    };

    win.chart.mapUtils = mapUtils;
})(window);