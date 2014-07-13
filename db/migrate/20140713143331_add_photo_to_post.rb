class AddPhotoToPost < ActiveRecord::Migration
  def change
    add_column :posts, :photo, :string, :default => "logo.svg"
  end
end
