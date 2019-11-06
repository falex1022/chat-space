json.array! @users do |user|
  json.id users.user_id
  json.name users.name
end