const Project = require("./models/Project");

function resetWeekViews() {
  Project.updateMany({}, { $set: { weekViews: 0 } })
    .then(() => {
      console.log("Week Views has been reset");
    })
    .catch((err) => console.log(err));
}

module.exports = resetWeekViews;
