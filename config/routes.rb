Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'
  get 'index', to: 'users#index'
  resources :users, only: [:index, :edit, :update] do
  
  end

  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end
end