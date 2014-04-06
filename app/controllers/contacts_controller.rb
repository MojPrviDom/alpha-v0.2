class ContactsController < ApplicationController
  def new
  	@contact = Contact.new
  end

  def create
  	@contact = Contact.new(params[:contact])
  	if @contact.valid?
	  	ContactMailer.new_email(@contact).deliver
	  	redirect_to new_contact_path, notice: "Hvala Vam na poruci :)"
  	else
  		render :new
	  end
  end
end
