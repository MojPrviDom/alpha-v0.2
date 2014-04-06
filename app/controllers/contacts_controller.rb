class ContactsController < ApplicationController
  def new
  	@contact = Contact.new
  end

  def create
  	@contact = Contact.new(params[:contact])
  	if @contact.valid?
	  	ContactMailer.new_mail(@contact).deliver
	  	redirect_to root_url, notice: "Message sent! Thank you for contacting us."
	else
    flash.now.alert = "Please fill all fields."
		render :new
	end
  end
end
