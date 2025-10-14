import { deleteObject } from "../aws/index.js";
import Notes from "../models/uploadFile.model.js";

const deleteFile = async (req, res) => {
  try {
    const key = decodeURIComponent(req.params.key);
    console.log(key)
    const file = await Notes.findOne({ s3Key: key });
    if (!file) {
      console.log("file is not found")
      return res.status(404).json({
        success: false,
        message: "File Not Found",
      });
    }

    await deleteObject(key);
    await Notes.findOneAndDelete(file);

    return res.status(200).json({
      success: true,
      message: `${file.title} deleted successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

export default deleteFile;
