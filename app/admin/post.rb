ActiveAdmin.register Post do
  permit_params :title, :body, :photo
  
  index do
    column :photo do |post|
      image_tag(post.photo.url)
    end
    column :title
    column :body do |post|
      truncate(post.body)
    end
    column :created_at do |post|
      post.created_at.strftime('%m.%d.%Y.   %k:%M')
    end
    column "Updated At", :updated_at do |post|
      post.updated_at.strftime('%m.%d.%Y.   %k:%M')
    end
    default_actions
  end

  form do |f|
    f.inputs "NewPost" do
      f.input :title
      f.input :body
      f.input :photo, :as => :file
    end
    f.actions
  end

  show do |post|
      attributes_table do
        row :id
        row :title
        row :body
        row :created_at
        row :updated_at
        row :photo_file_name
        row :photo_content_type
        row :photo_file_size
        row :photo_updated_at
        row :photo do
          image_tag(post.photo.url)
        end
      end
    end

  filter :title
  filter :body
  filter :created_at
  filter :updated_at
  
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
