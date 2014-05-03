class Post < ActiveRecord::Base
	has_attached_file :photo,
				:url => "/assets/posts/:id/:basename.:extension",
				:path => ":rails_root/public/assets/posts/:id/:basename.:extension",
				:default_url => "/assets/posts/default.png"
	validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

end
