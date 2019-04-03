var apiRoot = "";

var contactApp = new Vue({
    el: "#contact-form",
    data: function() {
        return {
            name: "",
            email: "",
            message: ""
        };
    },
    methods: {
        send: function() {
            $.ajax({
                method: "POST",
                url: apiRoot + "message/",
                data: JSON.stringify(this.toModel()),
                contentType: "application/json",
                dataType: "JSON",
                jsonp: false
            });
            this.clear();
        },
        clear: function() {
            this.name = "";
            this.email = "";
            this.message = "";
        },
        toModel: function() {
            return {
                name: this.name,
                email: this.email,
                message: this.message
            };
        }
    }
});

$(document).ready(function () {
    apiRoot = $("#apiRoot").val();
});