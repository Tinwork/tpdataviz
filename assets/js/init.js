(() => {

    /**
     * Make Chart
     */
    const makeChart = () => {
        radial.draw();
        bar.draw();
    };

    document.addEventListener('DOMContentLoaded', makeChart);
})();