var keyword = prompt("What do you want to search on NYT?");
var begin = prompt("Start year?");
var end = prompt("End year?");

begin += "0101";
end += "1231";


var numArticles = prompt("how many articles do you want?");

function createArticles(result, numWanted){
    var ourDiv = $("<div>");
    for(var i = 0; i < numWanted; i ++){
        var articleDiv = $("<div>");
        var articleTitle = $("<h4>");
        articleTitle.text(result.response.docs[i].headline.main);
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
        $("#searchResults").append(articleDiv);
    }
}

function getArticles(searchKeyword, begin_date, end_date, num_articles, page_num){
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

    url += '?' + $.param({
        'api-key': "381fc0b99273425eaf1ebec4cb39ec8c",
        'q': searchKeyword,
        'begin_date': begin_date,
        'end_date': end_date,
        'page': page_num,
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
            'page': page_num + 1,
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


getArticles(keyword, begin, end, numArticles, 0);