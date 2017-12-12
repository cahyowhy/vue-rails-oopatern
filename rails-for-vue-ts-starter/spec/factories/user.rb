FactoryGirl.define do
  factory :user do
    username { Faker::Name.name }
    name { Faker::Name.name }
    birth_date { Faker::Date.birthday(18, 40) }
  end
end