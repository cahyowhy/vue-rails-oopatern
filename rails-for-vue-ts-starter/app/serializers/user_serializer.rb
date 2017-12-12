class UserSerializer < BaseSerializer
  attributes :id, :username, :name, :birth_date
  has_many :notes
end
