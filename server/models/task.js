const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: String,
    des: String,
    startD: String,
    endD: String,
    complete: Boolean,
    important: Boolean,

    user: {
      type: Schema.Types.ObjectId,
      ref: "user_taskManeger", // keep this if your user model name is custom
    },

    // ✅ NEW: PDF file attachments (max 3)
    attachedDocuments: [
      {
        filename: String,
        originalname: String,
        path: String,
      },
    ],
  },
  { timestamps: true }
);

const Task = model("task", taskSchema);
module.exports = Task;

