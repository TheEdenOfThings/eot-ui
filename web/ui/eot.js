// Eden of Things Javascript



function create_reading(parent,reading_class, icon_class,value)
{
  
  var reading = $("<div/>");
  reading.attr("class", "reading "+reading_class);
  reading.text(value);
  icon = $("<div/>");
  icon.attr("class", icon_class); 
  reading.append (icon); 
  parent.append(reading);
}

function create_location(side, title)
{
  var location = $("<div/>");
  location.attr("class", "location");
  side.append(location);

  var location_title = $("<div/>");
  location_title.attr("class", "location_title");
  location_title.text(title);
  location.append(location_title);
  return location;
 
}


function get_data(callback)
{
  $.ajax
  ({
    url: "http://10.255.253.32/api/sensors",
    dataType: "json",
    error:function(jqXHR, textStatus, errorThrown)
    {
      console.log("Error "+textStatus);
    },
    success: function(response)
    {
      callback(response);
    }
  });
}


function start()
{
  var left = $("#screen1_left");
  var right = $("#screen1_right");
  var location = create_location(left, "?");
  get_data(function(response)
  {
    for (var i=0; i<response.length; i++)
    {
      var sensor= response[i];

      switch (sensor.type) 
      {
        case "temp":
          create_reading(location,"reading_temp",
          "temperature_icon",sensor.current);
        break;
      
        case "humid":
          create_reading(location,"reading_humidity",
          "humidity_icon",sensor.current);
        break;
      }

    }

  });
}


// Startup function
$(function()
  {
  setTimeout(function(){location.reload();},30000);
  start();
  
  });



