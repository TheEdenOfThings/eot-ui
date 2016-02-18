// Eden of Things Javascript



function create_reading(parent, icon_class,value,id)
{
  var reading = $("<div/>");
  reading.attr("class", "reading");
  reading_value = $("<span/>");
  reading_value.text(value);
  reading_value.attr("class", "reading_value");
  reading.append(reading_value);
  icon = $("<div/>");
  icon.attr("class", "icon "+icon_class); 
  reading.append (icon); 
  reading.attr("sensor_id", id);
  parent.append(reading);
}

function update_reading(reading, icon_class, value)
{
  var reading_title = reading.find(".reading_value")
  reading_title.text(value);
}

function create_location(side, title, id)
{
  var location = $("<div/>");
  location.attr("class", "location");
  location.attr("location_id", id);

  
  side.append(location);

  var location_title = $("<div/>");
  location_title.attr("class", "location_title");
  location_title.text(title);
  location.append(location_title);
  return location;
 
}

function update_location(location,name)
{
  var location_title = location.find (".location_title")
  location_title.text(name);

}

function get_data(callback)
{
  $.ajax
  ({
    //url: "http://178.62.121.17/api/sensors",
    url: "test/test_data.json",
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
  get_data(function(response)
  {
    for (var i=0; i<response.length; i++)
    {
      var locationJsonObj = response[i];
      var side = right;
      
//TODO:fix the long magic number
      if (locationJsonObj.long >=50)
      {
        side = left;
      }      

      var locationDivObj = $("[location_id=" + locationJsonObj.location + "]");     

      if (locationDivObj.length == 0)
      {
        locationDivObj = create_location(side, locationJsonObj.name, locationJsonObj.location);
      }
      else 
      {
	 update_location(locationDivObj,locationJsonObj.name) 
      }

      for (var j=0; j<locationJsonObj.sensors.length; j++)
      {
	  var sensor = locationJsonObj.sensors[j];
	  var sensorDivObj = locationDivObj.find("[sensor_id=" + sensor.id + "]"); 
	  if (sensorDivObj.length == 0)
	  {
	    create_reading(locationDivObj, sensor.type +"_icon",sensor.current, sensor.id);
	  }
	  else
	  {
	    update_reading(sensorDivObj,  sensor.type +"_icon",sensor.current);
	  }	
      }
    }

  });
}


// Startup function
$(function()
  {
    setInterval(function(){start();},20000);
    start();
  
  });



