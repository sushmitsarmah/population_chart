(async (win) => {
    const utils = {};
    const constants = win.chart.constants;
    const margins = constants.margins;
    const yearFormat = d3.timeFormat('%Y');

    utils.eventStream = new rxjs.Subject();

    // parse the population data
    utils.parsePopData = row => {
        const keys = _.keys(row);
        const newObj = {
            country_code: row['Country Code'],
            country_name: row['Country Name']
        };
        constants.years.forEach(year => {
            const key = _.filter(keys, key => key.indexOf(year) !== -1)[0];
            newObj[year] = +row[key];
        });
        return newObj;
    };

    // create the year slider
    utils.createYearSlider = (svg) => {
        const dataTime = constants.years.map(function (d) {
            return new Date(d, 0, 1);
        });

        const sliderTime = d3
            .sliderBottom()
            .min(d3.min(dataTime))
            .max(d3.max(dataTime))
            .step(1000 * 60 * 60 * 24 * 365)
            .width(constants.width - margins.left - margins.right)
            .tickFormat(yearFormat)
            .tickValues(dataTime)
            .default(new Date(1998, 0, 1))
            .on('onchange', val => {
                const yearSelected = +yearFormat(sliderTime.value());
                utils.eventStream.next(yearSelected);
                // subscription.unsubscribe();
            });

        svg.call(sliderTime);
        // console.log(yearFormat(sliderTime.value()));
    }

    win.chart.utils = utils;
})(window);