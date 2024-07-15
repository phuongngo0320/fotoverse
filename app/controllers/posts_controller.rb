class PostsController < ApplicationController
  layout "user"

  def discover
    @photos = Photo.where(mode: "public").order(created_at: :desc)
    @albums = Album.where(mode: "public").order(created_at: :desc)
  end

  def feeds
    @photos = Photo.where(user_id: current_user.followings.ids, mode: "public").order(created_at: :desc)
    @albums = Album.where(user_id: current_user.followings.ids, mode: "public").order(created_at: :desc)
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { status_code: 200, message: "Post deleted." }, status: :ok
  rescue StandardError => e
    render json: { status_code: 500, message: e.message }, status: :internal_server_error
  end
end
