const Task = require("../models/task.js");
const User = require("../models/user.js");
const path = require("path");

exports.createTaskPostController = async (req, res, next) => {
  const { title, des, start, end } = req.body;

  // ✅ Save file metadata if any PDF uploaded
  let documents = [];
  if (req.files && req.files.length > 0) {
    documents = req.files.map(file => ({
      filename: file.filename,
      originalname: file.originalname,
      path: file.path
    }));
  }

  const task = new Task({
    title,
    des,
    startD: start,
    endD: end,
    complete: false,
    important: false,
    user: req.user.idx,
    attachedDocuments: documents
  });

  try {
    const newTask = await task.save();

    await User.findOneAndUpdate(
      { _id: req.user.idx },
      { $push: { taskAll: newTask._id } }
    );

    res.status(200).json({
      msg: "Successfully created a new Task",
      color: "success",
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({
      msg: "Failed to create a new Task",
      color: "danger",
      success: false,
    });
  }
};

exports.getTaskController = async (req, res, next) => {
  try {
    const userId = req.user.idx;

    // 🔍 Query parameters
    const { search, complete, important, page = 1, limit = 10 } = req.query;

    // 🧠 Build filter object
    let filter = { user: userId };
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (complete !== undefined) {
      filter.complete = complete === "true";
    }
    if (important !== undefined) {
      filter.important = important === "true";
    }

    // 🔢 Pagination logic
    const skip = (page - 1) * limit;

    // 🔍 Fetch filtered and paginated tasks
    const tasks = await Task.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const totalCount = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      tasks,
      totalCount,
      totalPages,
      currentPage: Number(page),
    });
  } catch (err) {
    console.error("Error fetching filtered tasks:", err);
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
};


exports.getSingleTaskController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await Task.findOne({ _id: id });
    res.status(200).json({ task });
  } catch {
    res.status(404).json({ task: false });
  }
};

exports.editTaskController = async (req, res, next) => {
  const { id } = req.params;
  const { title, des, start, end, complete, important } = req.body;
  try {
    await Task.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          title,
          des,
          startD: start,
          endD: end,
          complete,
          important,
        },
      }
    );
    res.json({
      msg: "Successfully updated",
      color: "success",
      success: true,
    });
  } catch {
    res.json({
      msg: "Failed to update",
      color: "danger",
      success: false,
    });
  }
};

exports.setCompleteController = async (req, res, next) => {
  const { id } = req.params;
  const { complete } = req.body;

  const user = await User.findOne({ _id: req.user.idx });

  if (user.completedTask.includes(id)) {
    await User.findOneAndUpdate(
      { _id: req.user.idx },
      { $pull: { completedTask: id } }
    );
  } else {
    await User.findOneAndUpdate(
      { _id: req.user.idx },
      { $push: { completedTask: id } }
    );
  }

  try {
    await Task.findOneAndUpdate({ _id: id }, { $set: { complete } });
    const uptask = await Task.findOne({ _id: id });

    res.json({
      msg: uptask.complete
        ? "Congratulations, you have completed your task"
        : "You have not completed your task",
      color: uptask.complete ? "success" : "warning",
      success: true,
      newTask: uptask,
    });
  } catch {
    res.json({ msg: "Update failed", color: "danger", success: false });
  }
};

exports.setImportantController = async (req, res, next) => {
  const { id } = req.params;
  const { important } = req.body;

  await Task.findOneAndUpdate({ _id: id }, { $set: { important } });

  const user = await User.findOne({ _id: req.user.idx });

  if (user.important.includes(id)) {
    await User.findOneAndUpdate(
      { _id: req.user.idx },
      { $pull: { important: id } }
    );
  } else {
    await User.findOneAndUpdate(
      { _id: req.user.idx },
      { $push: { important: id } }
    );
  }

  const uptask = await Task.findOne({ _id: id });

  try {
    res.json({
      msg: uptask.important
        ? "You have marked this task as important"
        : "This task is no longer marked important",
      color: uptask.important ? "success" : "warning",
      success: true,
      newTask: uptask,
    });
  } catch {
    res.json({ msg: "Update failed", color: "danger", success: false });
  }
};

exports.deleteTaskController = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Task.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate(
      { _id: req.user.idx },
      {
        $pull: {
          taskAll: id,
          completedTask: id,
          important: id,
        },
      }
    );
    res.json({
      msg: "Task deleted successfully",
      color: "success",
      success: true,
    });
  } catch {
    res.json({
      msg: "Unable to delete task",
      color: "warning",
      success: false,
    });
  }
};

exports.recentTaskController = async (req, res, next) => {
  try {
    const recentTask = await User.findOne({ _id: req.user.idx })
      .sort({ createdAt: 1 })
      .populate({ path: "taskAll" });

    res.status(200).json({
      recent: recentTask.taskAll.reverse(),
    });
  } catch {
    res.status(500).json({ msg: "Failed to get recent tasks" });
  }
};
