class NoteSerializer < BaseSerializer
  attributes :id, :title, :description
  has_one :user
end
