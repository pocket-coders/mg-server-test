var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var client_id = "272589905349-scqfilok0ucok40j6h6eo9pcsp7bhadd.apps.googleusercontent.com";
var client_secret = "vpM3s6IXDLcmZtNpkOFbeQMg";
var redirect_uri = "http://localhost:3000";
var CLIENT_SECRET_FILE = "./apiGoogleconfig.json";
var apiKey = "AIzaSyBp8aAD-xwmvna9o1InxK23wkpywLWm0oc";
var moment = require("moment");
var axios = require("axios");
var auth_code = "4/2QHvu9eIqNLC-_GsrBfHjOacb3hwQeZA47oD0DtmEqWAwrshDlr4WdLbJ8mLE8mUdd7H69gl2L869MN7Y89FiZ0";
var scope = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.readonly",
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.settings.readonly",
    "https://www.googleapis.com/auth/calendar.events",
];
//github.com/googleapis/google-api-nodejs-client#oauth2-client
var google = require("googleapis").google;
var oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
google.options({
    auth: oauth2Client,
    http2: true
});
function getAccessToken(refresh_token) {
    return __awaiter(this, void 0, void 0, function () {
        var response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, axios.post("https://oauth2.googleapis.com/token", {
                            refresh_token: refresh_token,
                            client_id: client_id,
                            client_secret: client_secret,
                            redirect_uri: redirect_uri,
                            grant_type: "refresh_token"
                        })];
                case 1:
                    response = _a.sent();
                    console.log("getting access token");
                    console.log(response.data.access_token);
                    console.log(response.status);
                    console.log(response.statusText);
                    return [2 /*return*/, Promise.resolve(response.data.access_token)];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1.response.status, error_1.response.statusText, error_1.response.data);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var calendar = google.calendar("v3");
function getList() {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, calendar.events.list({
                            calendarId: "primary",
                            timeMin: new Date().toISOString(),
                            showDeleted: false,
                            singleEvents: true,
                            maxResults: 10,
                            orderBy: "startTime",
                            auth: oauth2Client
                        })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, Promise.resolve(response.data.items)];
                case 2:
                    err_1 = _a.sent();
                    console.log("an error in the list");
                    console.log(err_1);
                    return [2 /*return*/, Promise.resolve([])];
                case 3: return [2 /*return*/];
            }
        });
    });
}
var access = getAccessToken("1//06cQm-VLd3mA9CgYIARAAGAYSNwF-L9Irc6b4reVW6-AWbpl1uGPE1h-3kkKcHZVbB0O9h50tJTAIhfvrOyWMFI7PQ1tw4n-Gl-o")
    .then(function (res) {
    oauth2Client.setCredentials({
        access_token: res,
        scope: scope
    });
    console.log("used this token: " + res);
})
    .then(function () {
    getList().then(function (res) {
        console.log("CREATE ARRAY");
        var events = res;
        // console.log(res);
        var rv = events.map(function (event) { return ({
            start: moment.utc(event.start.dateTime).toDate().toString(),
            end: moment.utc(event.end.dateTime).toDate().toString()
        }); });
        rv.map(function (item) {
            console.log(item);
        });
    });
    // console.log(res);
});
var invite = getAccessToken("1//06cQm-VLd3mA9CgYIARAAGAYSNwF-L9Irc6b4reVW6-AWbpl1uGPE1h-3kkKcHZVbB0O9h50tJTAIhfvrOyWMFI7PQ1tw4n-Gl-o")
    .then(function (res) {
    oauth2Client.setCredentials({
        access_token: res,
        scope: scope
    });
    console.log("used this token: " + res);
})
    .then(function () {
    sendInvite(30, "tbenaja@gmail.com", "Ben Tchamba", "Initial meeting", new Date(2020, 6, 29, 12, 30, 0));
});
function ISODateString(d) {
    function pad(n) {
        return n < 10 ? "0" + n : n;
    }
    return (d.getFullYear() +
        "-" +
        pad(d.getMonth() + 1) +
        "-" +
        pad(d.getDate()) +
        "T" +
        pad(d.getHours()) +
        ":" +
        pad(d.getMinutes()) +
        ":" +
        pad(d.getSeconds()) +
        "-" +
        pad(d.getTimezoneOffset() / 60) +
        ":00");
}
function sendInvite(duration, email, userName, comment, startTime) {
    return __awaiter(this, void 0, void 0, function () {
        var start, timeZone, event, response, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = startTime.toString();
                    timeZone = startTime.getTimezoneOffset().toString();
                    console.log(start);
                    console.log(timeZone);
                    event = {
                        summary: "Meeting with " + userName,
                        location: "Online",
                        description: comment,
                        start: {
                            // date: scheduledDate.toISOString(),
                            dateTime: ISODateString(startTime),
                            timeZone: "Etc/UTC"
                        },
                        end: {
                            // date: scheduledDate.toISOString(),
                            dateTime: ISODateString(new Date(startTime.getTime() + 60 * 1000 * duration)),
                            timeZone: "Etc/UTC"
                        },
                        recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
                        attendees: [{ email: email }],
                        visibility: "default",
                        reminders: {
                            useDefault: false,
                            overrides: [
                                { method: "email", minutes: 24 * 60 },
                                { method: "popup", minutes: 10 },
                            ]
                        }
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, calendar.events.insert({
                            calendarId: "primary",
                            resource: event,
                            sendNotifications: true,
                            sendUpdates: "all"
                        })];
                case 2:
                    response = _a.sent();
                    console.log("Event created: " + event);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    console.log("an error in the list");
                    console.log(err_2);
                    return [2 /*return*/, Promise.resolve()];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// oauth2Client.setCredentials({
//   access_token:
//     "ya29.a0AfH6SMDxYrKw7YgB4jALTM5FP31suGHZbk8gYTGvkha847p4GrSVzHSCYMj0TsLhq192Z3RT_k7k4PMQZJLufUY0Z4twgGISMX3EquKT5iS-v3WunNq-Rdxvvd4umekczcPMxS2TIfzGikLn1Xum2zxb3K4o9Ndd4Eg",
//   scope: scope,
// });
// const calendar = google.calendar({
//   version: "v3",
//   auth: oauth2Client,
// });
// const authClient = oauth2Client.getClient().then((response: any) => {
//   google.options({
//     auth: authClient,
//     http2: true,
//   });
// });
// const tokens = oauth2Client
//   .getToken(auth_code)
//   .then(() => {
//     oauth2Client.setCredentials(tokens);
//     console.log("credential recorded");
//   })
//   .catch((err) => {
//     console.log("errored here: " + err);
//   });
// oauth2Client.on("tokens", (tokens) => {
//   if (tokens.refresh_token) {
//     // store the refresh_token in my database!
//     console.log("Refresh");
//     console.log(tokens.refresh_token);
//   }
//   console.log("access");
// //   console.log(tokens.access_token);
// // });
// async function getList() {
//   try {
//     const response = await calendar.events.list({
//       calendarId: "primary",
//       timeMin: new Date().toISOString(),
//       showDeleted: false,
//       singleEvents: true,
//       maxResults: 10,
//       orderBy: "startTime",
//     });
//     return Promise.resolve(response.data);
//   } catch (err) {
//     console.log("an error in the list");
//     console.log(err);
//     return Promise.resolve([]);
//   }
// }
// const res = getList().then((res: any) => {
//   console.log("CREATE ARRAY");
//   //const events: any[] = res;
//   console.log(res);
//   // const rv = events.map((event: any) => ({
//   //   start: moment.utc(event.start.dateTime).toDate().toISOString(),
//   //   end: moment.utc(event.end.dateTime).toDate().toISOString(),
//   // }));
//   // rv.map((item: any) => {
//   //   console.log(item);
//   // });
//   console.log(res);
// });
//getList();
console.log("the end");
// console.log(res);
