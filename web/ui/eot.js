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
    url: "http://178.62.121.17/api/sensors",
//    url: "test/test_data.json",
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
      var side;
      var zone = locationJsonObj.zone.toLowerCase();
      
      if (zone === "tropical") {
        side = left;
      } else if (zone === "mediterranean") {
        side = right;
      } else {
        continue;
      }
  
      var locationDivObj = $("[location_id=" + locationJsonObj.id + "]");     

      if (locationDivObj.length == 0)
      {
        locationDivObj = create_location(side, locationJsonObj.name, locationJsonObj.id);
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
		    create_reading(locationDivObj, sensor.type.toLowerCase() +"_icon", sensor.current + sensor.unit, sensor.id);
		  }
		  else
		  {
		    update_reading(sensorDivObj,  sensor.type.toLowerCase() +"_icon",sensor.current + sensor.unit);
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

    // hide all the screens
    $('.screen').hide();

    // show the first screen
    $('.screen').first().show();

    // every 3 seconds, move the visible screen to the next one
    setInterval(function() {
      var current = $('.screen:visible');
      current.hide();

      var next = current.next();
      if (next.length == 0)
      {
       	next = $('.screen').first();
      } 

      next.show();      

      // TODO: add a transition to the screens switching.
    }, 30000);
  });



