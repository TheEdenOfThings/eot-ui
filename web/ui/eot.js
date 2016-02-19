// Eden of Things Javascript

function create_marker(parent,name,lat,long)
{
  var origin_lat = 50.361376;
  var origin_long = -4.746325;
  var max_lat = 50.363313;
  var max_long = -4.743967;
  var lat_range = max_lat-origin_lat;
  var long_range = max_long-origin_long;
  var frac_lat= (lat-origin_lat)/lat_range;
  var frac_long= (long-origin_long)/long_range;
  var top= 720-frac_lat*720;
  var left= frac_long*640;

  var marker = $("<div/>");
  marker.attr("class", "marker");
  marker.offset({top:top,left:left});
  marker_name = $("<span/>");
  marker_name.text(name);
  marker_name.attr("class", "marker_name");
  marker.append(marker_name);
  parent.append(marker);

}

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

function get_data(url,callback)
{
  $.ajax
  ({
    url:url,
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


function update_screen1()
{
  var left = $("#screen1_left");
  var right = $("#screen1_right");
  get_data("http://178.62.121.17/api/sensors",
  function(response)
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


function update_screen2()
{
  var left = $("#screen2_left");
  var right = $("#screen2_right");
  get_data("test/test_data.json",
  function(response)
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

      create_marker(side,locationJsonObj.name, locationJsonObj.lat,locationJsonObj.long);
    }
  });
}
  

// Startup function
$(function()
  {
    setInterval(function(){update_screen1();},20000);
    update_screen1();
    update_screen2();

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



