class BaseSerializer < ActiveModel::Serializer
  attributes :updated_at, :created_at

  def created_at
    object.created_at.strftime("%F %T")
  end

  def updated_at
    object.created_at.strftime("%F %T")
  end
end