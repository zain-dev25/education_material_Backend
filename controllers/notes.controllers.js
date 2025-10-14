import { getObjectUrl, listObjects } from "../aws/index.js";
import Notes from "../models/uploadFile.model.js";

export const getFiles = async (req, res) => {
  try {
    const { board, classLevel, major, subject } = req.query;

    let query = {};
    if (board) query.board = board;
    if (classLevel) query.classLevel = classLevel;
    if (major) query.major = major;
    if (subject) query.subject = subject;

    if (Object.keys(query).length === 0) {
      const files = await Notes.find({});
      return res.status(200).json({
        success: true,
        total: files.length,
        files,
      });
    }

    const file = await Notes.findOne(query);

    if (!file) {
      return res
        .status(404)
        .json({ success: false, message: "File not found !!" });
    }

    const getSignUrl = await getObjectUrl(file.s3Key);

    res.status(200).json({
      success: true,
      meta_data: file,
      getPdfSignUrl: getSignUrl,
      mdUrl: file.mdUrl,
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      message: "PDF Fetching Error",
      error: err.message,
    });
  }
};


export const getAllFiles = async (req, res) => {
  try {
    const data = await listObjects();
    console.log(data)
    return res.status(200).json({
      success: true,
      message: "data fetch Successfuly",
      data: data.Contents || "NO Data",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
