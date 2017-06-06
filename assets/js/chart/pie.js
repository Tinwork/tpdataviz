const d3Pie = (() => {

    var pieC = {
        w: 200,
        h: 200,
        r: Math.min(200, 200) / 2
    };

    var drawPie = function () {
        var color = d3.scaleOrdinal().range(["#98abc5", "#8a89a6", "#7b6888"]);

        var arc = d3.arc().outerRadius(pieC.r - 10).innerRadius(0);

        var labelArc = d3.arc().outerRadius(pieC.r - 40).innerRadius(pieC.r - 40);

        var pie = d3.pie().sort(null).value(function (d) {
            return d.data;
        });

        var svg = d3
            .select("#pie-d3")
            .append("svg")
            .attr("width", pieC.w)
            .attr("height", pieC.h)
            .append("g")
            .attr("transform", "translate(" + pieC.w / 2 + "," + pieC.h / 2 + ")");

        var g = svg
            .selectAll(".arc")
            .data(pie(pieDataset))
            .enter()
            .append("g")
            .attr("class", "arc");

        g.append("path").attr("d", arc).style("fill", function (d) {
            return color(d.data.data);
        });

        g.append("text")
            .attr("transform", function (d) {
                return "translate(" + labelArc.centroid(d) + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data.name;
            });
    };

    var generatePieDataset = function () {
        var baseData = {
            "user": "12",
            "friends": {
                "female": 5,
                "male": 1
            }
        }
        var pieDataset = [{
                data: baseData.friends.female,
                name: 'female'
            },
            {
                data: baseData.friends.male,
                name: 'male'
            }
        ];
        return pieDataset
    }

    var pieDataset = generatePieDataset()
    

    return {
        draw: drawPie
    }
})();