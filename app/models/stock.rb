class Stock < ApplicationRecord
  include HTTParty

  def select(symbol)
    url =  "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%20%3D%20'#{symbol}'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback="
    @yahoo_data = HTTParty.get(url)

    quote = @yahoo_data['query']['results']['quote']

    self.update(
      name: quote['name'],
      symbol: quote['symbol'],
      change_amount: quote['Change'],
      high: quote['DaysHigh'],
      low: quote['DaysLow'],
      price: quote['LastTradePriceOnly']
    )
  end

end
