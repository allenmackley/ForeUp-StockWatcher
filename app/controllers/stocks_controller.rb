class StocksController < ApplicationController

  def index
    @stock = Stock.new
    @stocks = Stock.all
  end

  def create
    symbol = stock_params[:symbol].upcase

    stock = Stock.new.select(symbol)

    # Rails.logger.info yahoo_data['query']['results']['quote']

    render :json => stock.to_json
  end

  private
    def stock_params
      params.require(:stock).permit(:symbol)
    end
end
