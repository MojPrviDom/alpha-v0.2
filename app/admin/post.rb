ActiveAdmin.register Post do
  permit_params :title, :body
  
  index do
    column :title
    column :body do |post|
      truncate(post.body)
    end
    column "update Date", :updated_at do |post|
      post.updated_at.strftime('%m.%d.%Y.   %k:%M')
    end
    default_actions
  end
  
  # See permitted parameters documentation:
  # https://github.com/gregbell/active_admin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :list, :of, :attributes, :on, :model
  #
  # or
  #
  # permit_params do
  #  permitted = [:permitted, :attributes]
  #  permitted << :other if resource.something?
  #  permitted
  # end
  
end
