class PostsController < ApplicationController
  layout "user"

  def discover
    @photos = Photo.where(mode: "public").order(created_at: :desc).page(params[:page]).per(16)
    @albums = Album.where(mode: "public").order(created_at: :desc).page(params[:page]).per(16)

    if (params[:tab].present?)
      @tab = params[:tab]
    else
      @tab = "photos"
    end

    if params[:content].present?
      if params[:content] == "photos"
        render json: @photos, include: {
          medium: { only: :url },
          reactors: { only: :id },
          user: {
            only: [:id, :fname, :lname, :avatar],
            include: { followers: { only: :id } }
          }
        }
      elsif params[:content] == "albums"
        render json: @albums, include: {
          media: { only: :url },
          reactors: { only: :id },
          user: {
            only: [:id, :fname, :lname, :avatar],
            include: { followers: { only: :id } }
          }
        }
      end
    end
  end

  def feeds
    @photos = Photo.where(user_id: current_user.followings.ids, mode: "public").order(created_at: :desc).page(params[:page]).per(16)
    @albums = Album.where(user_id: current_user.followings.ids, mode: "public").order(created_at: :desc).page(params[:page]).per(16)

    if (params[:tab].present?)
      @tab = params[:tab]
    else
      @tab = "photos"
    end

    if params[:content].present?
      if params[:content] == "photos"
        render json: @photos, include: {
          medium: { only: :url },
          reactors: { only: :id },
          user: {
            only: [:id, :fname, :lname, :avatar],
            include: { followers: { only: :id } }
          }
        }
      elsif params[:content] == "albums"
        render json: @albums, include: {
          media: { only: :url },
          reactors: { only: :id },
          user: {
            only: [:id, :fname, :lname, :avatar],
            include: { followers: { only: :id } }
          }
        }
      end
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: { status_code: 200, message: "Post deleted." }, status: :ok
  rescue StandardError => e
    render json: { status_code: 500, message: e.message }, status: :internal_server_error
  end
end
