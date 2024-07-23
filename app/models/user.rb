class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :confirmable, :trackable
  # has_secure_password

  has_many :follows_as_followed, class_name: "Follow", foreign_key: :followed_id, inverse_of: :followed, dependent: :destroy
  has_many :followers, class_name: "User", through: :follows_as_followed, source: :follower

  has_many :follows_as_follower, class_name: "Follow", foreign_key: :follower_id, inverse_of: :follower, dependent: :destroy
  has_many :followings, class_name: "User", through: :follows_as_follower, source: :followed

  has_many :posts, dependent: :destroy
  has_many :reactions, dependent: :destroy
  has_many :reacted_posts, class_name: "Post", through: :reactions, source: :post

  validates :fname, length: { maximum: 25 }
  validates :lname, length: { maximum: 25 }
  validates :email, presence: true, length: { maximum: 255 }, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
  # validates :password_digest, presence: true, confirmation: true, length: { maximum: 64 }
  validates :admin, inclusion: [true, false]
  validates :active, inclusion: [true, false]

  mount_uploader :avatar, AvatarUploader
end
