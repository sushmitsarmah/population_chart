(async (win) => {
    const constants = win.chart.constants;
    const utils = win.chart.utils;
    const mapUtils = win.chart.mapUtils;

    const root = constants.root;
    const margins = constants.margins;
    const yearFormat = d3.timeFormat('%Y');

    const worldMap = await d3.json(constants.mapLink);
    const data = await d3.csv(constants.datasetLink, utils.parsePopData);

    console.log(data);
    console.log(worldMap);

    // subscribe to year selected event stream
    const subscription = utils.eventStream.subscribe(
        (x) => { console.log('Selected Year: ' + x); },
        (err) => { console.log('Error: ' + err); },
        () => { console.log('Completed') }
    );    

    // initially create the chart
    const initChart = () => {
        const svg = d3.select(root)
            .append('svg')
            .attr('width', constants.width)
            .attr('height', constants.height)
            .append('g')
                .attr('transform', `translate(${margins.left}, ${margins.top})`);

        return svg;
    };

    const svg = initChart();
    utils.createYearSlider(svg);
    mapUtils.drawMap(svg, worldMap);

})(window);