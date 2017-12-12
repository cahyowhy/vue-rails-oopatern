class User < ApplicationRecord
	has_many :notes
	accepts_nested_attributes_for :notes
end
