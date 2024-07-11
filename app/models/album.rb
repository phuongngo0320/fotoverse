class Album < Post
  has_many :media, inverse_of: :post
  accepts_nested_attributes_for :media, allow_destroy: true

  validates :media, length: { maximum: 25 }
end
