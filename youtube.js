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
           var Pattern = '((?:(?:[1]{1}\\d{1}\\d{1}\\d{1})|(?:[2]{1}\\d{3}))[-:\\/.](?:[0]?[1-9]|[1][012])[-:\\/.](?:(?:[0-2]?\\d{1})|(?:[3][01]{1})))(?![\\d])';
           var yyyymmdd1;
           var splittedDate;
           var finalDate; //Returns the day, needs improvement if we change month for the vid release date
		      $.each(data.items, function (k,item) {  
		          date = item.snippet.publishedAt;
		          var p = new RegExp(Pattern, ["i"]);
		          var m = p.exec(date);
		          if (m != null) {
		              yyyymmdd1 = m[1];
		          }
		          splittedDate = yyyymmdd1.split("-");
		          finalDate = getCurrentDay() - splittedDate[2];
		          if (finalDate==0) 
		              document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + images[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο : ' + "Σήμερα!" + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
                  else 
		              document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + images[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από: ' + finalDate+ " ημέρες." + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
           })    
       }
       );  
       
    }  
});
function getCurrentDay() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear(); 

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
   return dd //returns the day
}
})(i)
}