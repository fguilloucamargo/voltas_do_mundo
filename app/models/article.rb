class Article < ApplicationRecord
  has_many :posts

  validates :city, presence: true
end
