
      $(document).ready(function () {
        // Set API endpoint and key
        var endpoint = "https://api.exchangerate-api.com/v4/latest/";
        var apiKey = "YOUR_API_KEY_HERE";

        // Attach click event handler to the convert button
        $("#convert").click(function () {
          // Get the input values
          var amount = $("#amount").val();
          var from = $("#from").val();
          var to = $("#to").val();

          // Send GET request to API endpoint
          $.ajax({
            url: endpoint + from,
            type: "GET",
            success: function (response) {
              // Calculate the conversion
              var rate = response.rates[to];
              var result = amount * rate;

              // Display the result
              $("#result").text(
                amount + " " + from + " = " + result.toFixed(2) + " " + to
              );
            },
            error: function (xhr, status, error) {
              // Display an error message if the API request fails
              $("#result").text("Error: " + error);
            },
          });
        });

       
      });
   