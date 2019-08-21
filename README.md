# データベース設計

## usersテーブル

| Column | Type  | Options                              |
|:------:|:-----:|:------------------------------------:|
|name    |string |null: false, unique: true, index: true|
|email   |string |null: false, unique: true             |

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members


## groupsテーブル

| Column | Type  | Options   |
|:------:|:-----:|:---------:|
|name    |string |null: false|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members


## membersテーブル

| Column  | Type     | Options                      |
|:-------:|:--------:|:----------------------------:|
|user     |references|null: false, foreign_key: true|
|group    |references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## messagesテーブル

| Column  | Type  | Options                      |
|:-------:|:-----:|:----------------------------:|
|body     |text   |                              |
|image    |string |                              |
|users_id |integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group