var channelName = ['Y0UUP','TheManolopoulos','KoniloTV'];   
var lvideos = ['http://www.tralala.gr/wp-content/uploads/2013/06/youup-2-e1370206113958.jpg?19bed6', 'https://yt3.ggpht.com/-3JEOQf18nro/AAAAAAAAAAI/AAAAAAAAAAA/DDf_LqRMreA/s900-c-k-no/photo.jpg', 'https://i.ytimg.com/vi/h7fXbmHsATc/maxresdefault.jpg'];
var vidMaxResult = 1; // Maximum can be 50
var key='AIzaSyDIxvl42rMJ5Uo1EYi8fjIkACPT0Q7js40';
var i=0;
for (; i < channelName.length; i++) {
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
           var splittedToday;
           var difference; //Returns the day, needs improvement if we change month for the vid release date
           var today;
         
		      $.each(data.items, function (k,item) {  
		          date = item.snippet.publishedAt;
		          var p = new RegExp(Pattern, ["i"]);
		          var m = p.exec(date);
		          if (m != null) {
		              yyyymmdd1 = m[1];
		          }
		          splittedDate = yyyymmdd1.split("-"); //date of the last video
		          splittedToday = getCurrentDay().split("-");
		          videoDate = new Date(splittedDate[0], splittedDate[1], splittedDate[2]);
		          today = new Date(splittedToday[0], splittedToday[1], splittedToday[2]);
		          difference = calculateDateDiff(today, videoDate);
		         
		          if (difference == 0)
		              document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο : ' + "Σήμερα!" + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		          else {
		              if (difference < 7) {
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">'; +channelName[i].bold() + ' Τελευταίο βίντεο πριν από: ' + difference + ' μέρες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              }
		              if (difference >= 7 && difference < 14) 
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  1 εβδομάδα.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if (difference >= 14 && difference < 21) 
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  2 εβδομάδες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if (difference >= 21 && difference < 28)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  3 εβδομάδες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=28 && difference<=30)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  4 εβδομάδες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=31 && difference<=60)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  1 μήνα.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=61 && difference<=90)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  2 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=91 && difference<=120)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  3 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=121 && difference<=150)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  4 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=151 && difference<=180)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  5 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=181 && difference<=210)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  6 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=211 && difference<=240)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  7 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=241 && difference<=270)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  8 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=271 && difference<=300)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  9 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=301 && difference<=330)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  10 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>=331 && difference<=365)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πριν από:  11 μήνες.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		              else if(difference>365)
		                  document.getElementById("lvideo").innerHTML = document.getElementById("lvideo").innerHTML + '<img src="' + lvideos[i] + '">' + channelName[i].bold() + ' Τελευταίο βίντεο πάνω από έναν χρόνο πριν.' + '<a href="https://www.youtube.com/user/' + channelName[i] + '/videos' + '"> Δες το!</a></br>';
		          }
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
    return today;
}
function calculateDateDiff(today,videoDate) {
    var timeDiff = Math.abs(today.getTime() - videoDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
}
})(i)
}