Rails.application.routes.draw do
  devise_for :users
  root to: 'messages#index'
  resources :users, only: [:edit, :update]
  resources :groups, only: [:edit, :new, :create, :update] do
    resources :messages, only: [:index, :create]
end
