# Install Directions...
1. `cd` to the project folder and run bundle update to install gems.
2. run `rails s` to start the Rails WEBrick server.
3. navigate to `localhost:3000`
# Thought Process...
### There are several ways that the API can be accessed:
#### Way #1:
1. Submit the form data to Rails.
2. Query the API.
3. Persist the data in our own database.
4. Redirect back to the page, rendering each partial for the collection, including the new one just added.
5. Each time we refersh the page, query the API again to update the data in our database and display the updates in our view.

##### Advantages:
If we can find a way to query the Yahoo API less often, or in the background, persisting the data to our own database will make our page refresh much faster because we aren't waiting on a cross-origin request to process and return the data.

##### Disadvantages:
Stock data updates so regularly, that we'd need to query the Yahoo API on every page refresh, or on some interveral, so do we really need to store all the stock data in our database? Consider storing just the stock symbol. Luckily, this API responds very quickly so it might not be necessary to persist the data in this case.

#### Way #2
1. Similar to Way #1, but we use Turbolinks so that there is no page reload.
##### Advantages:
We can get a one-page-app feel without using client-side templating. We can use ERB or HAML for templating. This could result in greater simplicity and faster loading.
##### Disadvantages:
Turbolinks can sometimes interfere with other JavaScript libraries that were poorly designed and didn't namespace their CSS selectors.
Although server side templating is convienent, sometimes we need to set the state using JavaScript the first time the view is displayed. In this case, the stock arrow on the right of every item block. Rendering the template and then applying state changes with JavaScript later can create a "jumping" effect where UI components assemble in steps and this appears un-professional. It may be better, then, to assemble the entire component and its state before first rendering it.

#### Way #3
1. Have the form do a GET request directly to the API using AJAX
2. Process the returned data with JavaScript  
    * We could process it manually with jQuery
    * We could use React components
    * We could use Backbone/Marionette View Models
3. Add each item as we request it
4. On page reload, the data is gone. We would need to request it again.
##### Advantages:
Quick and easy, especially for the demo.
Client-side templates are the most ideal for interactive web apps (but not for informational display pages that should be indexed by Google).
##### Disadvantages:
We're not saving state. So if you reload the page, your stock items that you added will be gone.
Also, if SEO is of a concern, we lose that here because client-side templates are difficult for search engines to crawl.

#### Way #4
1. Have the form do a POST request to our server using AJAX
2. Query the API.
3. Persist the data in our own database.
4. Process the returned data with JavaScript like in Way #3
##### Advantages:
We get the data persistence, plus client-side templating.
##### Disadvantages:
The provided design docs don't have a delete button on each stock item block, so I'm assuming this method isn't what the test has in mind, and that for this small demo saving session state isn't important.

#### Therefore, I'm going to choose Way #3.
1. First step is to build the layout and CSS
2. Next, I'll use Backbone and Marionette
