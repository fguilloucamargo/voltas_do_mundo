Rails.application.routes.draw do
  devise_for :users
  root to: 'articles#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :articles do
    resources :posts, only: [:new, :create, :edit, :update, :destroy]
  end

  get 'about', to: 'articles#about'
end
