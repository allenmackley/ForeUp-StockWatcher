Rails.application.routes.draw do
  root "stocks#index"
  resource :stocks, only: [:index, :create]
end
