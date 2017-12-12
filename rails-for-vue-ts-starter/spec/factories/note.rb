FactoryGirl.define do
  factory :note do
    title {Faker::Lorem.characters(2)}
    description {Faker::VentureBros.quote}
    user_id {Faker::Number.between(1,27)}
  end
end