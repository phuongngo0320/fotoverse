class AccessMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.access_mailer.notify.subject
  #
  def notify
    @user = params[:user]

    mail to: "jellyismeee@gmail.com", subject: "Bruh, some one has accessed our website"
  end
end
