import ApiCalendar from "react-google-calendar-api";
import React from "react";

export function Calendar() {
  let googleAuth;

  function initClient() {
    gapi.client
      .init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: "https://www.googleapis.com/auth/calendar.readonly",
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
      })
      .then(function () {
        googleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);
      });
  }

  const getEvents = async () => {
    return new Promise(async (resolve, reject) => {
      if (ApiCalendar.sign) {
        ApiCalendar.listEvents({
          timeMin: new Date().toISOString(),
          timeMax: new Date().addDays(10).toISOString(),
          showDeleted: true,
          maxResults: 10,
          orderBy: "updated",
        }).then(({ result }) => {
          if (result.items) {
            console.log(result.items);
          } else {
            console.log("No Events");
          }
          resolve(result);
        });
      } else {
        ApiCalendar.handleAuthClick();
        resolve(null);
      }
    });
  };

  return (
    <div>
      <button onClick={() => getEvents()}>Get</button>
    </div>
  );
}
