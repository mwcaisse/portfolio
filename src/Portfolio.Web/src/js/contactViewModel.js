function AlertViewModel() {

    var self = this;

    self.Show = ko.observable(false);
    self.Type = ko.observable("alert-danger");
    self.BoldText = ko.observable("");
    self.Message = ko.observable("");

    self.HasBoldText = ko.computed(function() {
        var text = self.BoldText();
        return null !== text && typeof text !== "undefined" && text.length > 0;
    });

    self.Hide = function() {
        self.Show(false);
        self.Type("");
        self.BoldText("");
        self.Message("alert-danger");
    };
}

function ContactViewModel() {

    var self = this;

    self.Name = ko.observable();
    self.Email = ko.observable();
    self.Message = ko.observable();

    self.Alert = new AlertViewModel();

    self.Send = function() {
        var message = ko.toJS({
            name: self.Name,
            email: self.Email,
            message: self.Message
        });

        console.log(message);

        $.ajax({
            method: "POST",
            url: "http://localhost:54248/api/contactmessage/",
            data: JSON.stringify(message),
            contentType: "application/json",
            dataType: "JSON",
            jsonp: false
        }).done(function(res) {
            if (res.valid) {
                self.Alert.Type("alert-success");
                self.Alert.BoldText("");
                self.Alert.Message("Message sent successfully. Thank you I will be contact with you soon!");
                self.Clear();
            } else {
                self.Alert.Type("alert-danger");
                self.Alert.BoldText("Error");
                self.Alert.Message(res.message);
            }
            self.Alert.Show(true);
        }).fail(function() {
            self.Alert.Type("alert-danger");
            self.Alert.BoldText("Error");
            self.Alert.Message("An error has occured while sending your message. Please try again later.");
            self.Alert.Show(true);
        });


    };

    self.Clear = function() {
        self.Name("");
        self.Email("");
        self.Message("");
    };

}


$(document).ready(function() {

    var vm = new ContactViewModel();
    var element = $("#formContact")[0];

    ko.applyBindings(vm, element);

});