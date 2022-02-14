import express, { Router, Request, Response } from "express";
import { PasteDb, PasteInterface } from "../types/pasteTypes";
import Paste from "../mongodb/pasteSchema";
// Start Router
const router: Router = express.Router();
// Const
const SEND_INTERVAL = 2000;
let upComingPasteArray: PasteInterface[] = [];

router.post("/add-pastes", (req: Request, res: Response) => {
  const pastes: PasteDb[] = req.body.pastes;
  if (pastes.length > 0) {
    upComingPasteArray = pastes;
  }
  return res.json({ message: "Thank you for Adding Paste 🙏" });
});

// Event Response
const writeEvent = (res: Response, sseId: string, data: string) => {
  res.write(`id: ${sseId}\n`);
  res.write(`data: ${data}\n\n`);
};

const sendEvent = (_req: Request, res: Response) => {
  res.writeHead(200, {
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Type": "text/event-stream",
  });
  const sseId = new Date().toDateString();

  setInterval(() => {
    writeEvent(res, sseId, JSON.stringify(upComingPasteArray));
    upComingPasteArray.length = 0;
  }, SEND_INTERVAL);
  //writeEvent(res, sseId, JSON.stringify(upComingPasteArray));
};

router.get("/dashboard", (req: Request, res: Response) => {
  if (req.headers.accept === "text/event-stream") {
    sendEvent(req, res);
  } else {
    res.json({ message: "Ok" });
  }
});

router.get("/page-number", async (_req: Request, res: Response) => {
  const numberOfResults = await Paste.countDocuments();
  res.status(200).json({ "number of pages": numberOfResults });
});

router.get("/show-pastes", async (_req: Request, res: Response) => {
  const limitedPastesResults = await Paste.find().limit(5);
  res.status(200).json(limitedPastesResults);
});

router.get("/get-pastes/:page", async (_req: Request, res: Response) => {
  const limitedPastesResults = await Paste.find()
    .limit(5)
    .skip(Number(_req.params.page) * 5);
  res.status(200).json(limitedPastesResults);
});

router.delete("/remove-paste/:id", async (_req: Request, res: Response) => {
  try {
    await Paste.findByIdAndDelete(_req.params.id);
    res.status(200).json({ message: "paste was successfully removed" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

export default router;
