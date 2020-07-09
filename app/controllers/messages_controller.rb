class MessagesController < ApplicationController
  def index
    @message = Message.new
    @messages = Message.all
  end

  def create
    message = Message.new(message_params)
    if message.save
      Redis.new(:password=>"010718") 
      ActionCable.server.broadcast 'messages',
        message: message.content
      head :ok
    end
  end

  private

    def message_params
      params.require(:message).permit(:content)
    end
end
