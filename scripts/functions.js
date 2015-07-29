$(document).ready(function(){

  var jumboHeight = $('#jumboContainer').outerHeight();

  function daysInMonth(month,year) {
      return new Date(year, month, 0).getDate();
  }


  //calculate degree progress - 15 terms in total
  function degreeProgress(){
  //  var width = 100/15 * numberOfTerms + "%";
    var date = new Date();
    var yearSinceStart = date.getFullYear() - 2014; //get full years
    var month = date.getMonth() + 1;
    var days = date.getDate();
    var daysPercent = days/daysInMonth(month, date.getFullYear());
    var numberOfTerms = 3 * yearSinceStart + (month + daysPercent)/4 + 1; // account for Fall 2013
    var width = 100/15 * numberOfTerms + "%";

    $('#bar').animate({
      width: width
    }, 4000);

  //  $('#bar').css('width', 100/15 * numberOfTerms + "%");
  }

  function generateCard(imageURL, title, time, skills, id){

    var skillsList = "";

    $.each(skills, function(index,  value){
      skillsList += "<li>" + value + "</li>";
    });

    var media = "<div id='" + id + "' class='workMedia dropshadow flex'>" +
                  "<div class='workMediaImage'>" +
                    "<img src='" + imageURL + "'/>" +
                  "</div>" +
                  "<div class='workMediaContent'>" +
                    "<div class='workMediaHeader'>" + title + "<span>" + time + "</span></div>" +
                    "<div class='workMediaList'>" +
                      "<ul>" + skillsList + "</ul>" +
                    "</div>" +
                  "</div>" +
                  "</div>";

    return media;
  }

  //Generates
  function generateSmallCard(imageURL, title, time, skills){

    var skillsList = "";

    $.each(skills, function(index,  value){
      skillsList += "<li>" + value + "</li>";
    });

    var media = "<div class='workMedia flex dropshadow workMedia-small'>" +
                  "<div class='workMediaImage workMediaImage-small'>" +
                    "<img src='" + imageURL + "'/>" +
                  "</div>" +
                  "<div class='workMediaContent'>" +
                    "<div class='workMediaHeader'>" + title + "<span>" + time + "</span></div>" +
                    "<div class='workMediaList'>" +
                      "<ul>" + skillsList + "</ul>" +
                    "</div>" +
                  "</div>" +
                  "</div>";

    return media;
  }

  $.ajax({
      url: "data/data.json",
      type: 'GET',
      success: function(data){

        $.each(data.WorkExperience, function(index, value){
          var media = generateCard(value.logo, value.title, value.time, value.skills, value.id);

          $('.experienceContainer').append(media);
        });

        $.each(data.Education, function(index, value){

          var media = generateCard(value.logo, value.program, value.time, value.notes, "");

          $('.educationContainer').append(media);
        });

        $.each(data.skills, function(index, value){

          var media = generateSmallCard(value.img, value.skill, "", value.points);

          $('.skillsContainer').append(media);
        });
      },
      error: function(error){

      }
  });

  //smooth scrolling to element
   $('a[href*=#]:not([href=#])').click(function() {
     var target = $( $(this).attr('href') );

     if( target.length ) {
         event.preventDefault();
         $('html, body').animate({
             scrollTop: target.offset().top - ($('nav').height() + 10)
         }, 1000);
     }
   });

//animate the scroll bar, when it is visible
  $(window).scroll(function(){

    var scrollPercent = ($(window).scrollTop() / $(document).height()) * 100;
    var barPercent = ($('#bar').offset().top/$(document).height()) * 100;
    var difference = barPercent - scrollPercent;

    if(difference < 28){//run once
      degreeProgress();

      $(window).unbind('scroll');
    }
  });
});
