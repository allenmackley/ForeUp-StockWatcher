class AddPriceToStocks < ActiveRecord::Migration[5.1]
  def change
    add_column :stocks, :price, :decimal, :precision => 15, :scale => 2
  end
end
