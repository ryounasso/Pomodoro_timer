import React, { useEffect } from "react";
// import ScriptTag from "react-script-tag";

export function Calendar() {
  let googleAuth;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = "this.onload=function(){};handleClientLoad()";
    document.body.appendChild(script);
  }, []);

  function initClient() {
    gapi.load("client:auth2", initClient);
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

        console.log("success");
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
      <button onClick={() => initClient()}>Get</button>
    </div>
  );
}
