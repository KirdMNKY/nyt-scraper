var numRecords = $("#num-records");
var searchTerm = $("#search-term");
var startYear =  $("#start-year");
var endYear = $("#end-year");

// wait for page to load
$(document).ready(function(){

// On click event for search button
    $(".btn-search").on("click", function(){
        var searchData = searchTerm.val();
        var numRecordsData = numRecords.val();
        var startYearData = startYear.val();
        var endYearData = endYear.val();
        for (var i=0; i<= numRecordsData; i++){
        // ajax to get info
        var newArticleDiv = $("<div>");
        var newTitleDiv = $("<div>");
        var url = "";
        var newAuthorDiv = $("<div>");
        var newIdDiv = $("<div>");


        // $(newArticleDiv).html()
        }
        // this is where im appending info
        $("#articles").append(newArticleDiv);

    });

    // On click event for clear button
    $(".btn-clear").on("click", function(){
        // calling reset function
        reset ();
    });

})
// reset function instructions

reset = function (){
    // user text = null
    numRecords.val(5);
    searchTerm.val("");
    startYear.val("");
    endYear.val("");
    $(".articles").empty("");

}