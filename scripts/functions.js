$(document).ready(function(){

  var jumboHeight = $('#jumboContainer').outerHeight();

  //controls jumbo slide
  function parallax(){
      var scrolled = $(window).scrollTop();

      if(jumboHeight - scrolled > 0){
        $('#jumboContainer').css('height', (jumboHeight-scrolled) + 'px');
      }
  }

  $(window).scroll(function(){

    var atBottom = $(window).scrollTop() + $(window).height() >= ($(document).height() - 20);

    if(!atBottom && $("body").height() >= $(window).height()){
      parallax();
    }

  });


function generateWorkExperienceMediaObject(imageURL, title, time, skills){

  var skillsList = "";

  $.each(skills, function(index,  value){
    skillsList += "<li>" + value + "</li>";
  });

  var media = "<div class='workMedia flex'>" +
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
        var media = generateWorkExperienceMediaObject(value.logo, value.title, value.time, value.skills);

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

        var media = generateWorkExperienceMediaObject(value.logo, value.program, value.time, value.notes);

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

});
