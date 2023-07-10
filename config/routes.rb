Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      # get '/todolist', to: 'todolist#index'
      get 'todolist/index'
      post 'todolist/create'
      get '/show/:id', to: 'todolist#show'
      put '/todolist/update'
      # # get 'todolist/destroy'
      # delete './destroy/:id',  to: 'todo#destroy'
    end
  end
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
