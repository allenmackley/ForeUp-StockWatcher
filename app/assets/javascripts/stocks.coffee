###
There are several ways that the API can be accessed:
Way #1:
  1. Submit the form data to Rails.
  2. Query the API.
  3. Persist the data in our own database.
  4. Redirect back to the page, rendering each partial for the collection, including the new one just added.
  5. Each time we refersh the page, query the API again to update the data in our database and display the updates in our view.
  Advantages:
    * If we can find a way to query the Yahoo API less often, or in the background, persisting the data to our own database will make our page refresh much faster because we aren't waiting on a cross-origin request to process and return the data.
  Disadvantages:
    * Stock data updates so regularly, that we'd need to query the Yahoo API on every page refresh, or on some interveral, so do we really need to store all the stock data in our database? Consider storing just the stock symbol.

Way #2
  1. Similar to Way #1, but we use Turbolinks so that there is no page reload.
  Advantages:
    * We can get a one-page-app feel without using client-side templating. We can use ERB or HAML for templating. This means simplicity and greater control.
  Disadvantages:
    * Turbolinks can sometimes interfere with other JavaScript libraries that were poorly design and didn't namespace their CSS selectors.
    * Although server side templating is convienent, sometimes we need to set the state using JavaScript the first time the view is displayed. In this case, the stock arrow on the right of every item block. Rendering the template and then applying state changes with JavaScript later can create a "jumping" effect where UI components assemble in steps and this appears un-professional. It may be better, then, to assemble the entire component and its state before first displaying it.

Way #3
  1. Have the form do a GET request directly to the API using AJAX
  2. Process the returned data with JavaScript
    * We could process it manually with jQuery
    * We could use React components
    * We could use Backbone View Models
  3. Add each item as we request it
  4. On page reload, the data is gone. We would need to request it again.
  Advantages:
    * Quick and easy, especially for the demo
  Disadvantages:
    * We're not saving state. So if you reload the page, your stock items that you added will be gone.

Way #4
  1. Have the form do a POST request to our server using AJAX
  2. Query the API.
  3. Persist the data in our own database.
  4. Process the returned data with JavaScript
  Advantages:
    * We get the data persistence, plus client-side templating.
  Disadvantages:
    * The provided deign docs don't have a delete button on each stock item block, so I'm assuming this method isn't what you have in mind, and that for this small demo saving session state isn't important.

Therefore, I'm going to choose Way #3.
1. First step is to get it working by building it manually
2. Next, I'll use Backbone and Marionette
###

$(document).ready ->
  console.log "HERE"

  $('.fu-stock-form').on("ajax:before", (e) ->
    symbol = $(this).find("[name='symbol']").val().toUpperCase();
    url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'#{symbol}'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="

    $.getJSON(url, (data) ->
      console.log('DATA', data)

      #Construct the view using a template
      #...

    )
    # console.log('BRFORE', e, url)
  )






  # $('.fu-stock-form').on("ajax:success", (e) ->
  #   detail = event.detail
  #   data   = detail[0]
  #   status = detail[1]
  #   xhr    = detail[2]
  #   # quote  = data.query.results.quote
  #   console.log(e, data)
  #   # $('.fu-stock-form').append xhr.responseText
  # ).on "ajax:error", (e, xhr, status, error) ->
  #   $('.fu-stock-form').append "<p>ERROR</p>"
