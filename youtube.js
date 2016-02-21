var channelName = ['Y0UUP','TheManolopoulos'];   
var images=['http://content-mcdn.ethnos.gr/filesystem/images/20131216/low/assets_LARGE_t_1661_54286259.JPG','https://yt3.ggpht.com/-3JEOQf18nro/AAAAAAAAAAI/AAAAAAAAAAA/DDf_LqRMreA/s900-c-k-no/photo.jpg'];
var vidMaxResult = 1; // Maximum can be 50
var key='AIzaSyDIxvl42rMJ5Uo1EYi8fjIkACPT0Q7js40';
var i=0;
for (; i <2; i++) {  
(function(i) {
$(document).ready(function () {  
    $.get("https://www.googleapis.com/youtube/v3/channels", {  
        part: 'contentDetails',  
        forUsername: channelName[i],  
        key: key //Browser API Key  
    },  
        function (data) {  
            $.each(data.items, function (i, item) {  
                console.log(item); // See in Browser Console  
                pid = item.contentDetails.relatedPlaylists.uploads;  
                getVideos(pid);  
            })  
        }  
        );  
    function getVideos(pid)  
    {  
        $.get("https://www.googleapis.com/youtube/v3/playlistItems", {  
            part: 'snippet',  
            maxResults: vidMaxResult,  
            playlistId:pid,  
            key: key //Browser API Key  
        },  
       function (data) {  
           var date;
		      $.each(data.items, function (k,item) {  
               date = item.snippet.publishedAt;  
			   document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="'+ images[i]+ '">' + channelName[i].bold() + ' Τελευταίο βίντεο στις: ' + date +  '<a href="https://www.youtube.com/user/'+ channelName[i]+'/videos' + '"> Δες το!</a></br>';
           })    
       }  
       );  
    }  
}); 
})(i)
}