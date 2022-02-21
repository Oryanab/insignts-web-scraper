import React, { useState } from "react";
import { Paste } from "../types/types";
import axios from "axios";
import SinglePaste from "./singlePaste";
import { Button } from "react-bootstrap";
import Navbar from "./navbar";

export default function MainPage() {
  const [pastes, setPastes] = useState<Paste[]>([]);
  const [totalNumberOfPastes, setTotalNumberOfPastes] = useState<number>(6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [omniSearch, setOmniSearch] = useState<string>("");
  const [totalNumberShowing, setTotalNumberShowing] = useState<number>(0);

  const loadPastes = async () => {
    const initialPastes = await axios.get("http://localhost:4000/show-pastes");
    setPastes((oldArray) => oldArray.concat(initialPastes.data));
    const getTotalPastes = await axios.get("http://localhost:4000/page-number");
    setTotalNumberOfPastes(getTotalPastes.data["number of pages"]);
  };
  useState(() => loadPastes());

  const loadMorePastes = async () => {
    const morePastes = await axios.get(
      `http://localhost:4000/get-pastes/${currentPage}`
    );
    setPastes((oldArray) => oldArray.concat(morePastes.data));
    if (currentPage <= Math.floor((totalNumberOfPastes - pastes.length) / 5)) {
      setCurrentPage((currentPage) => currentPage++);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "8vh" }}>
        <div style={{ textAlign: "center" }}>
          <b>Search Pastes: </b>
          <input
            onChange={(e) => {
              setOmniSearch(e.target.value);
            }}
            type="text"
          />
          <br />
          <p>
            Omni Search Showing:{" "}
            {pastes.filter((item) =>
              item.paste_entire_content.includes(omniSearch)
            ).length - totalNumberShowing}{" "}
            / {totalNumberOfPastes}
          </p>
        </div>
        {pastes.map((paste) => {
          if (paste.paste_entire_content.includes(omniSearch)) {
            return (
              <SinglePaste
                paste={paste}
                setTotalNumberOfPastes={setTotalNumberOfPastes}
                setTotalNumberShowing={setTotalNumberShowing}
              />
            );
          }
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{
            margin: "1vh",
            display: pastes.length !== totalNumberOfPastes ? "block" : "none",
          }}
          variant="secondary"
          onClick={() => loadMorePastes()}
        >
          Load More
        </Button>
      </div>
    </div>
  );
}
