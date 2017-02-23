// Get data from API

function retrieveDataFromApi (searchTerm, callback){
	
	var settings = {
		
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			
			part: 'snippet',
			key: 'AIzaSyASovBdr9Ul8NmoI2nbudX1sv91kxupWhY', 
			q: searchTerm,
			r: 'json',
			maxResults: 25
			
		},
		
		dataType: 'json',
		type: 'GET',
		success: callback
	};
	
	$.ajax(settings);
}

// Display data on HTML; for this case, YouTube thumbnails with titles, descriptions, etc.

function showYoutubeSearchData(data) {
	
	var resultInElement = '';

	if (!data) {
		resultInElement += '<p> No results </p>';

	} else {
		data.items.forEach(function(item) {

		var vidID = item.id.videoId;
    	var title = item.snippet.title;
    	var description = item.snippet.description;
    	var thumbnail = item.snippet.thumbnails.high.url;
    	var videoDate = item.snippet.publishedAt;
    	var channelTitle = item.snippet.channelTitle;
   		var channelID = item.snippet.channelId;

    	resultInElement += '<div class="col-md-6">' +
                            '<img src="' + thumbnail + '" class="img-responsive thumbnail" >' +
                        '</div>' +
                        '<div class="input-group col-md-6">' +
                            '<h3><a href="http://youtube.com/embed/' + vidID + '?rel=0">' + title + '</a></h3>' +
                            '<small>By <span class="channel">' + channelTitle + '</span> on ' + videoDate + '</small>' + '<p><a href="https://www.youtube.com/channel/' + channelID + '"><button type="button">View Channel</button></a></p>' +
                            '<p>' + description + '</p>' +
                        '</div>' +
                    '<div class="clearfix"></div>';

		});
	}

	$('.js-search-results').html(resultInElement);
}


function watchSubmitBtn() {
	$('.js-search-form').submit(function(event){
		event.preventDefault();
		var query = $(this).find('input').val();
		retrieveDataFromApi(query, showYoutubeSearchData);
	});
}

$(function() {
	watchSubmitBtn();
});









