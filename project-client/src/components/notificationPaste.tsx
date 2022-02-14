import { PasteNotifications } from "../types/types";
import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

export default function notificationPaste({
  paste,
}: {
  paste: PasteNotifications;
}) {
  const [show, setShow] = useState<string>("block");
  return (
    <Card style={{ margin: "4vh", display: show }} key={paste.title}>
      <Card.Header as="h5">{paste.title}</Card.Header>
      <Card.Body
        style={{
          backgroundColor:
            paste.sentiment === "Positive"
              ? "lightgreen"
              : paste.sentiment === "Negative"
              ? "#f05c51"
              : "lightgray",
        }}
      >
        <Card.Subtitle>
          <b>Author: </b>
          {paste.author}
        </Card.Subtitle>
        <Card.Text>
          <b>Content: </b>
          {paste.content}
        </Card.Text>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => setShow("none")}
            style={{ margin: "1vh" }}
            variant="primary"
          >
            mark as seen
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <i>from: {paste.date}</i>
      </Card.Footer>
    </Card>
  );
}
