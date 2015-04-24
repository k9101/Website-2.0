$(document).ready(function(){

  var jumboHeight = $('#jumboContainer').outerHeight();
  var open = true;

//calculate degree progress - 15 terms in total
function degreeProgress(){
//  var width = 100/15 * numberOfTerms + "%";
  var date = new Date();
  var yearSinceStart = date.getFullYear() - 2014; //get full years
  var month = date.getMonth();

  var numberOfTerms = 3 * yearSinceStart + month/4 + 1; // account for Fall 2013
  var width = 100/15 * numberOfTerms + "%";

  $('#bar').animate({
    width: width
  }, 4000);

//  $('#bar').css('width', 100/15 * numberOfTerms + "%");
}

function generateWorkExperienceMediaObject(imageURL, title, time, skills, id){

  var skillsList = "";

  $.each(skills, function(index,  value){
    skillsList += "<li>" + value + "</li>";
  });

  var media = "<div id='" + id + "' class='workMedia flex'>" +
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

function generateWorkExperienceSmallMediaObject(imageURL, title, time, skills){

  var skillsList = "";

  $.each(skills, function(index,  value){
    skillsList += "<li>" + value + "</li>";
  });

  var media = "<div class='workMedia flex workMedia-small'>" +
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



//populate work experience media objects
  $.ajax({
    url: 'data/workExperience.json',
    type: "GET",
    success: function(data) {

  //    var jData = JSON.parse(data);

      $.each(data.WorkExperience, function(index, value){
        var media = generateWorkExperienceMediaObject(value.logo, value.title, value.time, value.skills, value.id);

        $('.experienceContainer').append(media);
      });

    }
  });


//populate education media objects
  $.ajax({
    url: 'data/education.json',
    type: 'GET',
    success: function(data){

    //  var jData = JSON.parse(data);

      $.each(data.Education, function(index, value){

        var media = generateWorkExperienceMediaObject(value.logo, value.program, value.time, value.notes, "");

        $('.educationContainer').append(media);
      });
    }
  });

  $.ajax({
    url: 'data/skills.json',
    type: 'GET',
    success: function(data){

      $.each(data.skills, function(index, value){

        var media = generateWorkExperienceSmallMediaObject(value.img, value.skill, "", value.points);

        $('.skillsContainer').append(media);
      });
    }
  });

  //smooth scrolling to element
   $('a[href*=#]:not([href=#])').click(function() {
     var target = $( $(this).attr('href') );
     open = !open;

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
