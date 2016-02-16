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

// Startup function
$(function()
  {

setTimeout(function(){location.reload();},30000);

return;

    var test = $("<div/>");
    test.attr("id", "test");
    test.text("Hello, world!");

    $("body").append(test);

    setInterval(function()
                {
                  get_value("temp1",
                            function(value)
                            {
                              test.text("Sensor value is "+value);
                            });
                }, 1000);
  });

