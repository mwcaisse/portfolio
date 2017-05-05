
var apiRoot = "";




ko.extenders.required = function (target, opts) {

    target.OverrideDisplay = opts.OverrideDisplay;

    target.HasError = ko.computed(function () {
        var value = target();
        return null === value || typeof value === "undefined" || value.length === 0;
    });

    target.ShowError = ko.computed(function() {
        return !target.OverrideDisplay() && target.HasError();
    });

    target.ValidationMessage = (opts.Name || "Field") + " cannot be blank!";

    return target;
};


function AlertViewModel() {

    var self = this;

    self.Show = ko.observable(false);
    self.Type = ko.observable("alert-danger");
    self.BoldText = ko.observable("");
    self.Message = ko.observable("");

    self.HasBoldText = ko.computed(function () {
        var text = self.BoldText();
        return null !== text && typeof text !== "undefined" && text.length > 0;
    });

    self.Hide = function () {
        self.Show(false);
        self.Type("");
        self.BoldText("");
        self.Message("alert-danger");
    };
}

function ContactViewModel() {

    var self = this;

    self.OverrideErrorDisplay = ko.observable(true);

    self.Name = ko.observable().extend({ required: { Name: "Name", OverrideDisplay: self.OverrideErrorDisplay}});
    self.Email = ko.observable().extend({ required: { Name: "Email", OverrideDisplay: self.OverrideErrorDisplay } });
    self.Message = ko.observable().extend({ required: { Name: "Message", OverrideDisplay: self.OverrideErrorDisplay } });

    self.Alert = new AlertViewModel();

    self.IsValid = function() {
        return !self.Name.HasError() &&
               !self.Email.HasError() &&
               !self.Message.HasError();

    };

    self.Send = function () {
        self.OverrideErrorDisplay(false);
        if (!self.IsValid()) {
            return;
        }

        var message = ko.toJS({
            name: self.Name,
            email: self.Email,
            message: self.Message
        });

        $.ajax({
            method: "POST",
            url: apiRoot + "contactmessage/",
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

        self.OverrideErrorDisplay(true);
    };

}

$(document).ready(function() {

    //load in the API Root from the page
    apiRoot = $("#apiRoot").val();

    var vm = new ContactViewModel();
    var element = $("#formContact")[0];

    ko.applyBindings(vm, element);

});