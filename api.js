

// wait for page to load
$(document).ready(function(){
    var numRecords = $("#num-records");
    var searchTerm = $("#search-term");
    var startYear =  $("#start-year");
    var endYear = $("#end-year");
    var showArticles = $(".articles");
    var articleCounter = 0;
    
    var begin;
    begin = "0101";
    var end;
    end = "1231";
    
    // On click event for search button
    $(".btn-search").on("click", function(){
        var searchData = searchTerm.val();
        var numRecordsData = numRecords.val();
        var startYearData = startYear.val()+begin;
        var endYearData = endYear.val()+end;
        getArticles(searchData, startYearData, endYearData, numRecordsData);
    });
 

    function createArticles(result, numWanted){
        for(var i = 0; i < numWanted; i ++){
            articleCounter++;
            var articleDiv = $("<div>");
            var articleTitle = $("<h4>");
            articleTitle.text(articleCounter + " "+ result.response.docs[i].headline.main);
            var author = $("<p>");
            author.text(result.response.docs[i].byline.original);
            var pubDate = $("<p>");
            pubDate.text(result.response.docs[i].pub_date);
            var url = $("<p>");
            url.text(result.response.docs[i].web_url);
            articleDiv.append(articleTitle);
            articleDiv.append(author);
            articleDiv.append(pubDate);
            articleDiv.append(url);
            showArticles.append(articleDiv);
        }
    }

    function getArticles(searchKeyword, begin_date, end_date, num_articles){
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        var numWanted;
        var remainder;
        if(num_articles > 10){
            numWanted = 10;
            remainder = num_articles - 10;
        }
        else{
            numWanted = num_articles;
        }
        console.log(num_articles);
        console.log(remainder);
        
        url += '?' + $.param({
            'api-key': "381fc0b99273425eaf1ebec4cb39ec8c",
            'q': searchKeyword,
            'begin_date': begin_date,
            'end_date': end_date,
            'page': 0,
        });
        $.ajax({
            url: url,
            method: 'GET',
        }).then(function(result) {
            // console.log(result);
            createArticles(result, numWanted);
        })

        if(remainder > 0){
            url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
                'api-key': "381fc0b99273425eaf1ebec4cb39ec8c",
                'q': searchKeyword,
                'begin_date': begin_date,
                'end_date': end_date,
                'page': 1,
            });
            $.ajax({
                url: url,
                method: 'GET',
            }).then(function(result) {
                // console.log(result);
                createArticles(result,remainder);
            })
        }
    }

     // On click event for clear button
     $(".btn-clear").on("click", function(){
        // calling reset function
        reset();
    });

    function reset(){
        // user text = null
        numRecords.val(5);
        searchTerm.val("");
        startYear.val("");
        endYear.val("");
        articleCounter = 0;
        $(".articles").empty("");
    
    }

});
