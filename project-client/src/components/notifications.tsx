import React, { useEffect, useState, useCallback, useRef } from "react";
import { PasteNotifications } from "../types/types";

export default function Notifications() {
  const [sentPaste, setSentPaste] = useState<PasteNotifications[]>([]);
  const [countNewPastes, setCountNewPastes] = useState<number>(0);

  const evtSrc = useRef<any>(null);
  const listenEvt = useCallback(() => {
    if (!evtSrc.current) {
      const source = (evtSrc.current = new EventSource(
        `http://localhost:4000/dashboard`
      ));
      source.addEventListener("open", () => {
        console.log("SSE opened!");
      });
      source.addEventListener("message", (e) => {
        const data: PasteNotifications[] = JSON.parse(e.data);
        if (data.length > 0) {
          setCountNewPastes(
            (countNewPastes) => (countNewPastes += data.length)
          );
          setSentPaste((oldArray) => oldArray.concat(data));
        }
      });
      source.addEventListener("error", (e) => {
        console.error("Error: ", e);
      });
    }
  }, []);

  useEffect(() => {
    listenEvt();
    return () => evtSrc.current.close();
  }, []);

  return (
    <div>
      <h1>We Received A New Paste:</h1>
      <hr />
      <div>
        <>
          <h1>Number of New Pastes: {countNewPastes}</h1>
          {sentPaste.map((singlePaste) => (
            <div
              key={singlePaste.title}
              style={{
                padding: "2vh",
                backgroundColor:
                  singlePaste.sentiment === "Positive"
                    ? "green"
                    : singlePaste.sentiment === "Negative"
                    ? "red"
                    : "grey",
              }}
            >
              <h3>Title: {singlePaste.title}</h3>
              <h3>Author: {singlePaste.author}</h3>
              <h3>Date: {singlePaste.date}</h3>
              <h3>Content: {singlePaste.content}</h3>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
