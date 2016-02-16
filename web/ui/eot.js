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

function create_location(title, temp, humidity)
{



}

// Startup function
$(function()
  {

setTimeout(function(){location.reload();},30000);

	var location1 = $("<div/>");
	location1.attr("id", "location_1");
	location1.attr("class", "location");
	$("#screen1_left").append(location1);

	var location_title = $("<div/>");
	location_title.attr("class", "location_title");
	location_title.text("Waterfall");
	location1.append(location_title);
	
	var reading_temp = $("<div/>");
	reading_temp.attr("class", "reading reading_temp");
	reading_temp.text("32.6");
	temperature_icon = $("<div/>");
 	temperature_icon.attr("class", "temperature_icon"); 
	reading_temp.append (temperature_icon); 
	location1.append(reading_temp);	

	var reading_humidity = $("<div/>");
	reading_humidity.attr ("class", "reading reading_humidity"); 
	reading_humidity.text ("93%");
	humidity_icon = $("<div/>");
 	humidity_icon.attr("class", "humidity_icon"); 
	reading_humidity.append (humidity_icon); 
	location1.append(reading_humidity);
	
	 


	


  });

