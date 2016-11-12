"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var dialogs = require("ui/dialogs");
var event_1 = require("../../services/event");
var database_service_1 = require("../../services/database.service");
var userId_service_1 = require("../../services/userId.service");
var CalendarComponent = (function () {
    function CalendarComponent(_router, _userIdService, _databaseService) {
        var _this = this;
        this._router = _router;
        this._userIdService = _userIdService;
        this._databaseService = _databaseService;
        this.itineraryEvents = new Array();
        this.loading = true;
        this.receivedItineraryEvents = false;
        this.receivedEvents = false;
        _databaseService.getApiData("Calendar").subscribe(function (events) { return _this.gotEvents(events); }, function (error) { return _this.receivingError(error); });
        //get itinerary events for the user to see what they already have resesrved
        this._userIdService.getUserId().then(function (userID) {
            _databaseService.getApiData("Itinerary").subscribe(function (response) {
                //remove events for other guests
                _this.itineraryEvents = response._body.filter(function (e) {
                    return e.PersonID === parseInt(userID);
                });
                _this.receivedItineraryEvents = true;
                if (_this.receivedEvents) {
                    _this.loading = false;
                }
            });
        });
    }
    ;
    CalendarComponent.prototype.gotEvents = function (events) {
        this.events = events._body;
        this.receivedEvents = true;
        if (this.receivedItineraryEvents) {
            this.loading = false;
        }
    };
    CalendarComponent.prototype.receivingError = function (error) {
        console.error(error.status);
        alert("Error getting Calendar Events. Please check your internet connection.");
        this._router.navigate(["/GuestScreen/Home"]);
    };
    CalendarComponent.prototype.addToItinerary = function (event) {
        var _this = this;
        this._userIdService.getUserId().then(function (userID) {
            var itineraryEvent = new event_1.ItineraryEvent(event, parseInt(userID));
            _this._databaseService.postObject("Itinerary", itineraryEvent)
                .subscribe(function (response) {
                dialogs.alert({
                    title: "Reserve",
                    message: "Successfully reserved! You can find your reserved events in the Itinerary",
                    okButtonText: "OK"
                });
                var madeEvent = response._body;
                _this.itineraryEvents.push(madeEvent);
                _this.listView._elementRef.nativeElement.refresh();
            }, function (error) {
                alert("Could not connect to the server. Please try again later.");
            });
        });
    };
    CalendarComponent.prototype.removeFromItinerary = function (event) {
        var _this = this;
        var eventID = event.EventID;
        var subEventID = event.SubEventID;
        //remove from the server
        var itinEventsToRemove = this.itineraryEvents.filter(function (e) {
            return (e.EventID === eventID && e.SubEventID === subEventID);
        });
        itinEventsToRemove.forEach(function (e) {
            console.log('trying to delete: ' + JSON.stringify(e));
            _this._databaseService.deleteObject("Itinerary", e.EventItenaryID)
                .subscribe(function (response) {
                console.log('Response: ' + response.status);
            }, function (error) {
                console.log(error);
            });
        });
        //remove from the local itinerary events array
        this.itineraryEvents = this.itineraryEvents.filter(function (e) {
            return !(e.EventID === eventID && e.SubEventID === subEventID);
        });
    };
    CalendarComponent.prototype.isReserved = function (event) {
        if (this.itineraryEvents) {
            var eventID = event.EventID;
            var subEventID = event.SubEventID;
            var foundMatch = false;
            this.itineraryEvents.forEach(function (e) {
                if (e.EventID === eventID && e.SubEventID === subEventID) {
                    foundMatch = true;
                }
            });
        }
        return foundMatch;
    };
    __decorate([
        core_1.ViewChild("listview"), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "listView", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            templateUrl: 'pages/calendar/calendar.html',
            styleUrls: ['pages/calendar/calendar.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, userId_service_1.UserIdService, database_service_1.DatabaseService])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
//# sourceMappingURL=calendar.component.js.map