import React, { useEffect, useState, useCallback, useRef } from "react";
import { Nav, OverlayTrigger, Popover, Button } from "react-bootstrap";
import { PasteNotifications } from "../types/types";

const init = [
  {
    title: "BITCOIN GENERAT0R v2022",
    author: "Anonymous",
    content:
      "BITCOIN GENERATOR v2022Earn Free Bitcoins in just a few moments without any investment! Use our Bitcoin Generator and you will receive free unlimited Bitcoin instantly!http://2222asi7crk3yh5dbanvul4uldpktisa637rznipn3g5qodyzqz5urqdonion/",
    date: "11 Feb 2022 17:00:09 UTC",
    sentiment: "Positive",
  },
  {
    title: "BITCOIN GENERAT0R v2022",
    author: "Anonymous",
    content:
      "BITCOIN GENERATOR v2022Earn Free Bitcoins in just a few moments without any investment! Use our Bitcoin Generator and you will receive free unlimited Bitcoin instantly!http://2222asi7crk3yh5dbanvul4uldpktisa637rznipn3g5qodyzqz5urqdonion/",
    date: "11 Feb 2022 17:00:09 UTC",
    sentiment: "Negative",
  },
];

export default function Navbar() {
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

  //   const [notificationPastes, setNotificationPastes] =
  //     useState<PasteNotifications[]>(init);

  return (
    <Nav
      style={{
        paddingTop: "0.5vh",
        marginTop: "-8vh",
        position: "fixed",
        overflow: "hidden",
        zIndex: "10",
        width: "100%",
      }}
      activeKey="/home"
      className="navbar navbar-dark bg-dark pb-0"
    >
      <Nav.Item style={{ display: "flex", marginLeft: "3vw" }}>
        <OverlayTrigger
          trigger="hover"
          key={"bottom"}
          placement={"bottom"}
          overlay={
            <Popover
              style={{ marginTop: "1.5vh" }}
              id={`popover-positioned-${"bottom"}`}
            >
              {sentPaste.map((item) => (
                <div key={item.title}>
                  <Popover.Header as="h3">{item.title}</Popover.Header>
                  <Popover.Body
                    style={{
                      backgroundColor:
                        item.sentiment === "Positive"
                          ? "lightgreen"
                          : item.sentiment === "Negative"
                          ? "#f05c51"
                          : "lightgray",
                    }}
                  >
                    <strong>Author: </strong>
                    {item.author} <br />
                    <strong>Content: </strong>
                    {item.content.slice(0, 50)}... <br />
                  </Popover.Body>
                </div>
              ))}
            </Popover>
          }
        >
          <Nav.Link
            style={{ backgroundColor: "white", marginBottom: "0.5vw" }}
            href="/"
          >
            News({countNewPastes})
          </Nav.Link>
        </OverlayTrigger>
      </Nav.Item>
      <Nav.Item
        onClick={() => (window.location.href = "/")}
        style={{ color: "white", marginLeft: "-6vw" }}
      >
        <h5>Pastes App</h5>
      </Nav.Item>
      <Nav.Item style={{ display: "flex", marginRight: "4vw" }}>
        <Nav.Link
          style={{ backgroundColor: "white", marginBottom: "0.5vw" }}
          target="blank"
          href="https://github.com/Oryanab/insignts-web-scraper"
        >
          Github
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
