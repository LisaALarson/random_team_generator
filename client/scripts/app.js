var people = [];
var numOfTeams = 0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;

}

function animation(){
    var delay = 500;
    $('li').each(function(){
        $(this).fadeIn(delay += 500);
    });
}

function appendPeople(array){

    while(array.length > 0) {
        for(var i=0; i<numOfTeams; i++){

            if(array.length>0) {
                $("div[data-index=" + (i + 1) + "]").append("<li>" + array.shift() + "</li>");
                $("div[data-index=" + (i + 1) + "] li").last().hide().delay(200 * i).fadeIn(1000);
            }
        }
    }
    animation();
}

$(document).ready(function (){

    for(var i = 2; i<=11; i++){
        var $button = $('<button class="numberButton" data-index=' + i + '>' + i  + '</button>');
        //$button.data('index', i);
        console.log($button);
        $('.buttons').append($button);
        //$('.buttons').last().data('index', i);
    }

    $('.buttons').append('<br><button class="assignButton">Assign Groups</button>');
    //
    //$('body .buttons button').on('click', function(){
    //    var myIndex = $(this).index() + 2;
    //    console.log($(this).index());
    //});

    $("body").on('click', '.numberButton', function(){
        numOfTeams = $(this).data('index');
        console.log(numOfTeams);
        return numOfTeams;
       //console.log($(this).data('index'));
    });

    $('body').on('click', '.assignButton', function(){
        //var random = Math.floor(Math.random()* people.length);
        var numPerTeam = parseInt(people.length / numOfTeams);
        console.log(numPerTeam);

        for(var i = 1; i<=numOfTeams; i++){
            $('.teams').append('<div class="group col-md-3" data-index=' + i + '>' +'<h2>Group ' + i + '</h2></div>');
            //$('.group').append(numPerTeam);
        }

        //shuffle(people);
        shuffle(people);
        console.log(people);
        appendPeople(people);
    });

    $.ajax({
        url: "/data",
        success: function(data){
            console.log(data);
            console.log("Hello! Success!");

            $.each(data, function(){
                people.push(this.name);

            }); // end each function
            console.log(people);
        }//end success function
    });//end ajax call

});//end document ready