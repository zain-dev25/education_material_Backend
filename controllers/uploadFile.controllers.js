import Notes from "../models/uploadFile.model.js";
import {putObj } from "../aws/index.js";

export const uploadFile = async (req, res) => {
  try {
    const { title, type, board, major, classLevel, subject } =
      req.body;

      console.log( title, type, board, classLevel, major, subject)
  const s3Key = `uploads/${board}/${classLevel}/${major}/${subject}/${Date.now()}.${type}`;

    const signedUrl = await putObj(s3Key, "application/pdf");

    const mdUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;

    const file = await Notes.create({
      title,
      type,
      board,
      classLevel,
      major,
      subject,
      s3Key,
      mdUrl,
    });

    res.status(201).json({
      success: true,
      signedUrl,
      file,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


