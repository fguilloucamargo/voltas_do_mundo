class Article < ApplicationRecord
  has_many :posts

  validates :city, presence: true

  geocoded_by :city
  # after_validation :geocode
end
