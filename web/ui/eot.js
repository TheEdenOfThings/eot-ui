// Eden of Things Javascript



function create_reading(parent, icon_class,value)
{
  
  var reading = $("<div/>");
  reading.attr("class", "reading");
  reading.text(value);
  icon = $("<div/>");
  icon.attr("class", "icon "+icon_class); 
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
	
      create_reading(location,sensor.type +"_icon",
			sensor.current);
    }

  });
}


// Startup function
$(function()
  {
  setTimeout(function(){location.reload();},30000);
  start();
  
  });



