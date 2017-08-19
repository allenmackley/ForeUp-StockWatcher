class CreateStocks < ActiveRecord::Migration[5.1]
  def change
    drop_table :stocks
    create_table :stocks do |t|
      t.string :name
      t.string :symbol, :limit => 4, :null => false
      t.decimal :change_amount, :precision => 15, :scale => 2
      t.decimal :change_percent, :precision => 3, :scale => 2
      t.decimal :high, :precision => 15, :scale => 2
      t.decimal :low, :precision => 15, :scale => 2
      t.timestamps
    end
  end
end
