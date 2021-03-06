Rails.application.routes.draw do
  devise_for :users, :skip => [:registrations]
  as :user do
    get 'users/edit' => 'devise/registrations#edit', :as => 'edit_user_registration'
    put 'users' => 'devise/registrations#update', :as => 'user_registration'
  end

  root to: 'articles#home'

  resources :articles do
    resources :posts, only: [:new, :create, :edit, :update, :destroy]
  end

  get 'about', to: 'articles#about'
end
