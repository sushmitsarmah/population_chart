((win) => {
    const constants = {
        mapLink: 'data/world_map.json',
        datasetLink: 'data/population_data.csv',
        root: '#chart',
        width: 1360,
        height: 700,
        margins: {
            top: 20,
            bottom: 20,
            right: 20,
            left: 20
        },
        startYear: 1960,
        endYear: 2017
    };

    constants.years = _.range(constants.startYear, constants.endYear + 1);

    win.chart = {};
    win.chart.constants = constants;

})(window);