class CreateMedia < ActiveRecord::Migration[7.1]
  def change
    create_table :media do |t|
      t.references :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
