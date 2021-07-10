import React, { useEffect, useState } from "react";
import { Heading, Center, Box, Button } from "@chakra-ui/react";
import { Schedule } from "./Schedule";

export function Calendar() {
  const [isLogin, setIsLogin] = useState(false);
  const [isEvents, setIsEvents] = useState(false);
  const [events, setEvents] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = "this.onload=function(){};handleClientLoad()";
    script.onreadystatechange =
      "if (this.readyState === 'complete') this.onload()";
    document.body.appendChild(script);
  }, []);

  function handleClientLoad() {
    gapi.load("client:auth2", initClient);
  }

  let GoogleAuth;

  function initClient() {
    gapi.client
      .init({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_APIKEY,
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.readonly",
      })
      .then(
        function () {
          // GoogleAuth = gapi.auth2.getAuthInstance();
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          handleAuthClick();

          // Listen for sign-in state changes.
          // GoogleAuth.isSignedIn.listen(updateSigninStatus);
        }
        // function (error) {
        //   appendPre(JSON.stringify(error, null, 2));
        // }
      );
  }

  let isAuthorized;
  let currentApiRequest;

  function sendAuthorizedApiRequest(requestDetails) {
    currentApiRequest = requestDetails;
    if (isAuthorized) {
      // Make API request
      // gapi.client.request(requestDetails)

      // Reset currentApiRequest variable.
      currentApiRequest = {};
    } else {
      GoogleAuth.signIn();
    }
  }

  function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      isAuthorized = true;
      if (currentApiRequest) {
        sendAuthorizedApiRequest(currentApiRequest);
      }
    } else {
      isAuthorized = false;
    }
  }

  function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
    setIsLogin(true);
  }

  function handleSignoutClick() {
    console.log("ろぐあーうと", gapi);
    gapi.auth2.getAuthInstance().signOut();
  }

  // function appendPre(message) {
  //   const pre = document.getElementById("content");
  //   const textContent = document.createTextNode(message + "\n");
  //   pre.appendChild(textContent);
  // }

  function listUpcomingEvents() {
    const currentTime = new Date();
    const tomorrowDate = new Date(
      currentTime.getFullYear(),
      currentTime.getMonth(),
      currentTime.getDate(),
      23,
      59
    );
    gapi.client.calendar.events
      .list({
        calendarId: process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_ID,
        // calendarId: "primary",
        timeMin: new Date().toISOString(),
        timeMax: tomorrowDate.toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime",
      })
      .then(function (response) {
        setEvents(response.result.items);
        setIsEvents(true);
        // appendPre("Upcoming events:");

        // if (events.length > 0) {
        //   for (let i = 0; i < events.length; i++) {
        //     const event = events[i];
        //     let when = event.start.dateTime;
        //     if (!when) {
        //       when = event.start.date;
        //     }
        //     // appendPre(event.summary + " (" + when + ")");
        //   }
        // } else {
        //   appendPre("No upcoming events found.");
        // }
      });
  }

  return (
    <Box>
      <Center>
        <Heading>Schedule</Heading>
      </Center>
      <Center>
        {isLogin ? null : (
          <Button onClick={() => handleClientLoad()}>Login</Button>
        )}
        {isLogin ? (
          <Button onClick={() => listUpcomingEvents()}>Get</Button>
        ) : null}
      </Center>
      <Center marginTop={4}>
        {isEvents ? <Schedule events={events} /> : null}
      </Center>
    </Box>
  );
}
