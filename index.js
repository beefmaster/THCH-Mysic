
function makefeed(posts){
    let root = document.getElementById("root");

    let main = document.createElement("main");
    main.setAttribute("class", "main");
    main.setAttribute("id", "main");
    root.appendChild(main);

    let post;
    for (post in posts){
        makepost(posts[post]);
    }
}

//if location found -> get country to find events in this case
//as corona has shut most of them down
function LocationFound(geolocation) {
    console.log(geolocation.coords.latitude);
    console.log(geolocation.coords.longitude)
    var ObjList = [];
    //should be modified to find country from geolocation
    $.ajax({
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?size=10&countryCode=AU&apikey=faxAg8pOt9SAAoEkAz3mk53h67rADGAP',
        dataTyp: 'JSON',
        type: 'GET',
        async: false,
        cache: false,
        sucess: function(data){
            console.log(data);
            console.log('ajax query sucess');
            data = JSON.parse(data);
            
            //this issue is with the json parsing
            //the json parsing is broken up into many lists and nest dictionaries
            //need to be able to find each unqiue event to find the artist name
            //and the venue
            for(each in data){
                var goodData =({location: each.venues, artist: each.name}); 
                ObjList.push(goodData);
            }   
        },
        error: function(xhr, status, error){
            console.log("ajax query failed")
            alert(status);
        }
    });
    makepost(ObjList)
    console.log("location finder finished")
}

function failedLocation(){
    console.log('could not find location')
}

//data = {'location': latlng, 'artist': name}
function makepost(data){
    console.log("make post starting");
    console.log(data)
    let feed = document.getElementById("root");

    let newpost = document.createElement("li");
    newpost.setAttribute("class", "post");
    newpost.innerHTML = data.artist;

    feed.appendChild(newpost);

    let postimage = document.createElement("img");
    postimage.src = "harrystyle.jpg";
    
    newpost.appendChild(postimage);
    
}

navigator.geolocation.getCurrentPosition(LocationFound, failedLocation);

//#endregionmakefeed(["somedata", "data2", "bruh", "somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh","somedata", "data2", "bruh",])
