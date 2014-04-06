class Contact
	include ActiveAttr::Model

	attribute :name
	attribute :email
	attribute :subject
	attribute :content
	

	validates_presence_of :name, :subject, :content 
 	validates_format_of :email, :with => /\b[A-Z0-9._%a-z\-]+@(?:[A-Z0-9a-z\-]+\.)+[A-Za-z]{2,4}\z/
	validates_length_of :content, :maximum => 500

end