d3.csv("movies.csv").then(function (data) {
    var movies = data;
    var button = d3.select("#button");
    var form = d3.select("#form");
    button.on("click", runEnter);
    form.on("submit", runEnter);
    function runEnter() {
        d3.select("tbody").html("")
        d3.selectAll("p").classed('noresults', true).html("")
        d3.event.preventDefault();
        var inputElement = d3.select("#search-input");
        var inputValue = inputElement.property("value").toLowerCase().trim();

        if (inputValue.length < 5) {
            d3.select("p").classed('noresults2', true).html("<center><strong>Please try using more than 5 characters to avoid too many results!</strong>")
            inputValue = "Something to give no results"
        }
        var filteredData = movies.filter(movies => (movies.director.toLowerCase().trim().includes(inputValue) || movies.actors.toLowerCase().trim().includes(inputValue) || movies.original_title.toLowerCase().trim().includes(inputValue)));
        if (filteredData.length === 0 && inputValue !== "Something to give no results") {
            d3.select("p").classed('noresults', true).html("<center><strong>No results. Please check your spelling!</strong>")
        }
        output = _.sortBy(filteredData, 'avg_vote').reverse()

        for (var i = 0; i < filteredData.length; i++) {
            d3.select("tbody").insert("tr").html("<td>" + [i + 1] + "</td>" + "<td>" + "<a href=https://www.imdb.com/title/" + output[i]['imdb_title_id'] + " target='_blank'>" + (output[i]['original_title']) + "</a>"
                + "</td>" + "<td>" + (output[i]['avg_vote']) + "</td>" + "<td>" + (output[i]['year']) + "</td>" + "<td>" + (output[i]['director']) + "</td>" +"<td>" + (output[i]['actors']) + "</td>" + "<td>" + (output[i]['description']) + "</td>")
        }
    };
    window.resizeTo(screen.width, screen.height)
});