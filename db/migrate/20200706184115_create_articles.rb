class CreateArticles < ActiveRecord::Migration[6.0]
  def change
    create_table :articles do |t|
      t.string :city
      t.string :country
      t.integer :month
      t.integer :year

      t.timestamps
    end
  end
end
