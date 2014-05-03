class AdminUser < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, 
         :recoverable, :rememberable, :trackable, :validatable

  before_destroy :check_number_of_users

  def check_number_of_users
  	# does not allow deleting AdminUser if there is only one
  	if AdminUser.all.count <= 1
  		self.errors[:base] = "Cannot delete the only user."
    	return false   
	end
  end

end
