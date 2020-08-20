class Article < ApplicationRecord
  has_many :posts

  geocoded_by :city
  after_validation :geocode

  validates :city, presence: true
  validates :month, presence: true
  validates :year, presence: true
end
