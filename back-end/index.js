const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const images = require("./module/modul");
const router = require("./Router/Router");
app.use(cors());
app.use(express.json());
app.use(router);
const fs = require("fs");
mongoose
  .connect(
    "mongodb+srv://sanjaimsk263:GJNZ37GmGGntD934@cluster0.7oi83sg.mongodb.net/ImageGallery"
  )
  .then(() => console.log("DB is Connected"))
  .catch(() => console.log("DB is not Connected"));

app.use(express.static("./public"));

const storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const imageSize = 10 * 1000 * 1000;
const uploads = multer({
  storage: storage,
  limits: { fileSize: imageSize },
});

app.post("/upload", uploads.single("image"), async (req, res) => {
  try {
    images
      .create({ image: req.file.filename })
      .then((result) => res.json(result))
      .catch((err) => console.log(err));
  } catch (error) {
    res.json({ message: error }).status(400);
  }
});

app.get("/get", (req, res) => {
  try {
    images.find({}).then((user) => res.json(user));
  } catch (error) {}
});
app.get("/get/:id", (req, res) => {
  try {
    images
      .findById(req.params.id)
      .then((image) => res.json(image))
      .catch((err) =>
        res.status(404).json({ message: "Image not found", error: err })
      );
  } catch (error) {
    res.status(400).json({ message: "Error fetching image", error });
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const image = await images.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const imagePath = `./public/images/${image.image}`;

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error("Failed to delete the file from filesystem", err);
        return res
          .status(500)
          .json({ message: "Failed to delete image file from server" });
      }

      await images.findByIdAndDelete(req.params.id);

      res.status(200).json({ message: "Image deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 4000;

app.listen(port, () => {
  console.log("Server is Runing");
});
