const client_id = "";
const client_secret = "";
const redirect_uri = "http://localhost:3000";
const CLIENT_SECRET_FILE = "./apiGoogleconfig.json";
const apiKey = "";
const moment = require("moment");
const axios = require("axios");

const auth_code =
  "4/2QHvu9eIqNLC-_GsrBfHjOacb3hwQeZA47oD0DtmEqWAwrshDlr4WdLbJ8mLE8mUdd7H69gl2L869MN7Y89FiZ0";

const scope = [
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.readonly",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.settings.readonly",
  "https://www.googleapis.com/auth/calendar.events",
];

//github.com/googleapis/google-api-nodejs-client#oauth2-client
const { google } = require("googleapis");
const oauth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uri
);

google.options({
  auth: oauth2Client,
  http2: true,
});

async function getAccessToken(refresh_token) {
  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      refresh_token,
      client_id,
      client_secret,
      redirect_uri,
      grant_type: "refresh_token",
    });
    console.log("getting access token");
    console.log(response.data.access_token);
    console.log(response.status);
    console.log(response.statusText);
    return Promise.resolve(response.data.access_token);
  } catch (error) {
    console.error(
      error.response.status,
      error.response.statusText,
      error.response.data
    );
  }
}

const calendar = google.calendar("v3");
async function getList() {
  try {
    const response = await calendar.events.list({
      calendarId: "primary",
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: "startTime",
      auth: oauth2Client,
    });
    return Promise.resolve(response.data.items);
  } catch (err) {
    console.log("an error in the list");
    console.log(err);
    return Promise.resolve([]);
  }
}

const access = getAccessToken("")
  .then((res) => {
    oauth2Client.setCredentials({
      access_token: res,
      scope: scope,
    });
    console.log("used this token: " + res);
  })
  .then(() => {
    getList().then((res: any) => {
      console.log("CREATE ARRAY");
      const events: any[] = res;
      // console.log(res);
      const rv = events.map((event: any) => ({
        start: moment.utc(event.start.dateTime).toDate().toString(),
        end: moment.utc(event.end.dateTime).toDate().toString(),
      }));
      rv.map((item: any) => {
        console.log(item);
      });
    });
    // console.log(res);
  });

const invite = getAccessToken("")
  .then((res) => {
    oauth2Client.setCredentials({
      access_token: res,
      scope: scope,
    });
    console.log("used this token: " + res);
  })
  .then(() => {
    sendInvite(
      30,
      "tbenaja@gmail.com",
      "Ben Tchamba",
      "Initial meeting",
      new Date(2020, 6, 29, 12, 30, 0)
    );
  });

function ISODateString(d: Date) {
  function pad(n: number) {
    return n < 10 ? "0" + n : n;
  }
  return (
    d.getFullYear() +
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
    ":00"
  );
}

async function sendInvite(
  duration: number,
  email: string,
  userName: string,
  comment: string,
  startTime: Date
) {
  // let result: boolean;
  const start: string = startTime.toString();
  const timeZone: string = startTime.getTimezoneOffset().toString();
  console.log(start);
  console.log(timeZone);
  const event = {
    summary: "Meeting with " + userName,
    location: "Online",
    description: comment,
    start: {
      // date: scheduledDate.toISOString(),
      dateTime: ISODateString(startTime),
      timeZone: "Etc/UTC",
    },
    end: {
      // date: scheduledDate.toISOString(),
      dateTime: ISODateString(
        new Date(startTime.getTime() + 60 * 1000 * duration)
      ),
      timeZone: "Etc/UTC",
    },
    recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
    attendees: [{ email: email }],
    visibility: "default",
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 10 },
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      sendNotifications: true,
      sendUpdates: "all",
    });
    console.log("Event created: " + event);
    // .execute((event: any) => {
    //   console.log("Event created: " + event.status);
    //   // result = event.status.toLocaleString() === "complete";
    // });
  } catch (err) {
    console.log("an error in the list");
    console.log(err);
    return Promise.resolve();
  }
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
