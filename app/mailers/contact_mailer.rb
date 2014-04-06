class ContactMailer < ActionMailer::Base
   default from: "from@example.com"
  default to: ENV["GMAIL_USERNAME"]

  def new_email(contact)
  	@contact = contact
  	mail(subject: "[MojPrviDom.hr]: #{contact.subject}")
  end
end
