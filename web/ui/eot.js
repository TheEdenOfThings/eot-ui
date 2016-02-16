// Eden of Things Javascript

// Fetch a value from the given sensor ID, calling callback with it
function get_value(id, callback)
{
  $.ajax
  ({
    url: "../api/sensor.php",
    data: {id: id},
    dataType: "text",
    error:function(jqXHR, textStatus, errorThrown)
    {
      console.log("Can't get sensor ID "+id);
    },
    success: function(response)
    {
      callback(parseFloat(response));
    }
  });
}

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

function create_location(side, title, temp, humidity)
{
	var location = $("<div/>");
	location.attr("class", "location");
	side.append(location);

	var location_title = $("<div/>");
	location_title.attr("class", "location_title");
	location_title.text(title);
	location.append(location_title);
	

	create_reading(location,"reading_temp",
			"temperature_icon",temp);
	
	create_reading(location,"reading_humidity",
			"humidity_icon",humidity);
		

	

}

function start()
{
	var left = $("#screen1_left");
	var right = $("#screen1_right");

	create_location(left, "Waterfall", "32.6", "93%");
	
	create_location(left, "Balcony", "31.8", "89%");

	create_location(right, "Entrance", "18.5", "38%");

	create_location(right, "Theatre", "18.2", "43%");
}

// Startup function
$(function()
  {
	setTimeout(function(){location.reload();},30000);
	start();
	
  });



