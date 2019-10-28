# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## users テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false,|
|mail|string|null: false, unique: true|
|password|string|null: false, unique: true|

### Association
- has_many :chats
- has_many :users_groups
- has_many :groups, through: :users_groups

## chats テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|body|text||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## Group テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|name|string|null: false|

### Association
- has_many :chats
- has_many :users_groups
- has_many :users, through: :users_groups

## Users_Groups テーブル

|Column|Type|Options|
|------|----|-------|
|id|integer||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
-belongs_to :user
-belongs_to :group