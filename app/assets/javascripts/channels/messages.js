//= require cable
//= require_self
//= require_tree .

this.App = {};

App.cable = ActionCable.createConsumer("/cable");

App.messages = App.cable.subscriptions.create('MessagesChannel', {

  received: function(data) {
    console.log('Received');
    $("#messages").removeClass('hidden')
    return $('#messages').append(this.renderMessage(data));
  },
  renderMessage: function(data) {
    console.log('Data Sent');

    return "<p>" + data.message + "</p>";
  }
});
