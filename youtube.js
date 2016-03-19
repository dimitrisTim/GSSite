var channelName = ['Y0UUP', 'TheManolopoulos', 'KoniloTV'];
var lvideos = ['http://www.tralala.gr/wp-content/uploads/2013/06/youup-2-e1370206113958.jpg?19bed6', 'https://yt3.ggpht.com/-3JEOQf18nro/AAAAAAAAAAI/AAAAAAAAAAA/DDf_LqRMreA/s900-c-k-no/photo.jpg', 'https://i.ytimg.com/vi/h7fXbmHsATc/maxresdefault.jpg'];
var differences = [];
var tagArray = []; //pinakas gia ti seira pou ftiaxnontai telika ta tags
var channelPrinted = []; //pinakas gia ti seira pou elegxontai ta channelName
var finished = 0;
var vidMaxResult = 1; // Maximum can be 50
var key = 'AIzaSyDIxvl42rMJ5Uo1EYi8fjIkACPT0Q7js40';
var i = 0;
var c = 0; //counter gia na ksero posa i exoun perasei

run();

function run() {
    for (; i < channelName.length; i++) {
        (function (i) {
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
                function getVideos(pid) {
                    $.get("https://www.googleapis.com/youtube/v3/playlistItems", {
                        part: 'snippet',
                        maxResults: vidMaxResult,
                        playlistId: pid,
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

                       $.each(data.items, function (k, item) {
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
                           differences.push(difference);
                           


                           var divCon = [];
                           var divIma = [];
                           var divDet = [];
                           var h3 = [];
                           var p = [];


                           divCon[i] = document.createElement('div'); //container
                           divIma[i] = document.createElement('div'); //image
                           divDet[i] = document.createElement('div'); //video-details
                           h3[i] = document.createElement('h3');
                           p[i] = document.createElement('p');
                           divCon[i].className = 'con';
                           divCon[i].id = 'con' + i;
                           divIma[i].className = 'img';
                           divIma[i].id = 'img' + i;
                           divDet[i].className = 'text';
                           divDet[i].id = 'text' + i;
                           h3[i].id = 'channelName-header' + i;
                           p[i].id = 'details' + i;

                           document.getElementById("lvideo-grid").appendChild(divCon[i]);
                           document.getElementById("con" + i).appendChild(divIma[i]);
                           document.getElementById("con" + i).appendChild(divDet[i]);
                           document.getElementById("text" + i).appendChild(h3[i]);
                           document.getElementById("text" + i).appendChild(p[i]);

                           c++;
                           tagArray.push(i);
                           channelPrinted.push(channelName[i]);

                           if (c == channelName.length)
                               finished = 1;                //mpainei sto telos gia na exoun ftiaxtei ola ta tags


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
            function calculateDateDiff(today, videoDate) {
                var timeDiff = Math.abs(today.getTime() - videoDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                return diffDays;
            }
        })(i)
    }
    var timeout = setInterval(function ()
    { if (checkIfFinished()) { clearInterval(timeout); isFinished = true; sortDifferences(); } }, 100); //otan termatistei i pano sinartisi kaloume tin sortDifferences, elegxoume ana 100 ms
}

function checkIfFinished() {
    return(Boolean(finished));
}

function sortDifferences() {
        var min;
        var max;
        for (i = 0; i < channelName.length; i++) {
            min =Math.min.apply(Math,differences); 
            max = Math.max.apply(Math, differences);
            var index = differences.indexOf(min);
            var newIndex = channelName.indexOf(channelPrinted[index]);
            printVideos(min, newIndex, tagArray[i]);
            differences[index] = max + 1;
        }
    }

    function printVideos(difference, index, i) {

        if (difference == 0) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο: ' + "Σήμερα!" + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else
            if (difference < 7) {
                document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
                document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
                document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο: ' + difference + ' μέρες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';

            }
        if (difference >= 7 && difference < 14) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  1 εβδομάδα πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';

        }
        else if (difference >= 14 && difference < 21) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  2 εβδομάδες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 21 && difference < 28) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  3 εβδομάδες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 28 && difference <= 30) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  4 εβδομάδες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 31 && difference <= 60) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  1 μήνα πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 61 && difference <= 90) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  2 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 91 && difference <= 120) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  3 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 121 && difference <= 150) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  4 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 151 && difference <= 180) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  5 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 181 && difference <= 210) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  6 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 211 && difference <= 240) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  7 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 241 && difference <= 270) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  8 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 271 && difference <= 300) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  9 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 301 && difference <= 330) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  10 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference >= 331 && difference <= 365) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο:  11 μήνες πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
        else if (difference > 365) {
            document.getElementById("img" + i).innerHTML = document.getElementById("img" + i).innerHTML + '<img src="' + lvideos[index] + '">';
            document.getElementById('channelName-header' + i).innerHTML = document.getElementById('channelName-header' + i).innerHTML + channelName[index].bold();
            document.getElementById('details' + i).innerHTML = document.getElementById('details' + i).innerHTML + ' Τελευταίο βίντεο πάνω από έναν χρόνο πριν.' + '<a href="https://www.youtube.com/user/' + channelName[index] + '/videos' + '"> Δες το!</a></br>';
        }
    }



