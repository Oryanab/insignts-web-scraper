import React, { useState } from "react";
import { Paste } from "../types/types";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import { Notyf } from "notyf";

export default function SinglePaste({
  paste,
  setTotalNumberOfPastes,
  setTotalNumberShowing,
}: {
  paste: Paste;
  setTotalNumberOfPastes: any;
  setTotalNumberShowing: any;
}) {
  const [show, setShow] = useState<string>("block");
  const notyf = new Notyf();

  const removeSinglePaste = async (id: string) => {
    const removePaste = await axios.delete(
      `http://localhost:4000/remove-paste/${id}`
    );
    notyf.success(removePaste.data.message);
  };

  return (
    <Card
      style={{ margin: "4vh", display: show }}
      key={paste.title}
      data-tag={paste.paste_entire_content}
    >
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
        <Card.Text>
          {Object.keys(paste.ner).map((item: any) => (
            <div>
              <i>{item}: </i>
              <>
                {paste.ner[item].map((word: string) => (
                  <span
                    style={{
                      backgroundColor: "gold",
                      margin: "2px",
                      color: "black",
                    }}
                    className="badge badge-warning"
                  >
                    {word}
                  </span>
                ))}
              </>
              <br />
            </div>
          ))}
        </Card.Text>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => {
              console.log("dconsole.log(totalNumberShowing);");
              setShow("none");
              setTotalNumberOfPastes((currentPage: number) => currentPage - 1);
              setTotalNumberShowing((currentCount: number) => currentCount + 1);
            }}
            style={{ margin: "1vh" }}
            variant="primary"
          >
            hide
          </Button>
          <Button
            onClick={() => {
              removeSinglePaste(paste._id);
              setShow("none");
              setTotalNumberOfPastes((currentPage: number) => currentPage - 1);
              setTotalNumberShowing((currentCount: number) => currentCount + 1);
            }}
            style={{ margin: "1vh" }}
            variant="danger"
          >
            Remove
          </Button>
        </div>
      </Card.Body>
      <Card.Footer className="text-muted">
        <i>from: {paste.date}</i>
      </Card.Footer>
    </Card>
  );
}
