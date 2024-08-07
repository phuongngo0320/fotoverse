class Admin::UsersController < ApplicationController
  before_action :authorize_admin
  layout "admin"

  def index
    @users = User.where(admin: false).order(updated_at: :desc).page(params[:page]).per(15)
  end

  def edit
    @user = User.find(params[:id])
  end

  def update
    user_params = user_info_params

    if user_params[:password] != user_params[:password_confirmation]
      msg = "Failed to update user: Password does not match"
      flash[:error] = msg
      render json: { status_code: 400, message: msg }, status: :bad_request
      return
    end

    if user_params[:password] == ""
      user_params.delete(:password)
      user_params.delete(:password_confirmation)
    end

    @user = User.find(params[:id])

    # ban user
    if @user.active == true && user_params[:active] == "false"
      UserMailer.ban(@user, current_user).deliver_later
    end

    # unban user
    if @user.active == false && user_params[:active] == "true"
      UserMailer.unban(@user, current_user).deliver_later
    end

    if @user.update(user_params)
      msg = "User updated!"
      flash[:notice] = msg
      render json: { status_code: 200, message: msg }, status: :ok
    else
      msg = "Failed to update user: " + @user.errors.full_messages.join(", ")
      flash[:error] = msg
      render json: { status_code: 500, message: msg }, status: :internal_server_error
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.destroy
      redirect_to admin_users_path, flash: { notice: "User deleted!" }
    else
      redirect_to admin_users_path, flash: { error: "Failed to delete user: " + @user.errors.full_messages.join(", ") }
    end
  end

  private
  def user_info_params
    params.require(:user).permit(:avatar, :fname, :lname, :email, :password, :password_confirmation, :active)
  end
end
