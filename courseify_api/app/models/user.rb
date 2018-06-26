class User < ApplicationRecord
  has_many :recommendations, dependent: :destroy
  has_many :active_follows, class_name: "Follow",
                            foreign_key: "follower_id",
                            dependent: :destroy

  has_many :passive_follows, class_name: "Follow",
                             foreign_key: "followed_id",
                             dependent: :destroy

  has_many :following, through:  :active_follows, source: :followed
  has_many :followers, through:  :passive_follows, source: :follower

  has_secure_password
  # attr_accessor :password, :salt, :password_confirmation
  
  validates_format_of :email, :with => /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  # validates :password, :email, presence: true
  validates :password, length: { in: 6..20 }, on: :create
  validates :email, uniqueness: true, on: :create
  validate :check_password_confirmation, on: :create

  # validates :password, length: { in: 6..20 }, on: :update, if :password_changed?
  # validates :email, uniqueness: true, on: :update, if :password_changed?
  # validate :check_password_confirmation, on: :update, if :password_changed?

  # before_save :hash_password, :if => proc{ |u| !u.password.blank? }
  

  # protected

  # def hash_password
  #   self.salt = BCrypt::Engine.generate_salt
  #   self.password_digest = BCrypt::Engine.hash_secret(password, salt)
  # end

  def full_name
    first_name + " " + last_name
  end

  def follow(other_user)
    following << other_user
  end

  def unfollow(other_user)
    following.delete(other_user)
  end

  def following?(other_user)
    following.include?(other_user)
  end

  def check_password_confirmation
    errors.add(:password_confirmation, "and password do not match") if password != password_confirmation
  end 

  def self.from_token_request request
    # Returns a valid user, `nil` or raise `Knock.not_found_exception_class_name`
    # e.g.
    email = request.params["auth"] && request.params["auth"]["email"]
    self.find_by email: email
  end

  def self.from_token_payload payload
    self.find payload["sub"]["user"]["id"]
  end

  def to_token_payload
    { sub: { user: { id: self.id, email: self.email } } }
  end

  private

  def password_changed?
    !self.password.blank?
  end
end
