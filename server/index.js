const express = require("express");
const app = express();

const cors = require("cors");

const path = require("path");

const mongoose = require("mongoose");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const User = require("./models/user.model");

const Stud = require("./models/student.model");

const Faculty = require("./models/faculty.model");

const District = require("./models/district.model");

const School = require("./models/school.model");

const jwt = require("jsonwebtoken");

const video = require("./models/videos.models");

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/public", express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/project");

app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/login", async (req, res) => {
  const user = await User.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user });
  } else {
    return res.json(false);
  }
});

app.post("/api/distlogin", async (req, res) => {
  const user = await District.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user });
  } else {
    return res.json(false);
  }
});

app.post("/api/studentlogin", async (req, res) => {
  const user = await Stud.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret13"
    );
    return res.json({ status: "ok", user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/studentregister/:type/:id", async (req, res) => {
  console.log(req.body);
  try {
    await Stud.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      study: req.body.study,
      school: req.body.school,
      aggr: req.body.aggr,
      gender: req.body.gender,
      dist: req.body.dist,
      schoolid: req.body.schoolid,
      distid: req.body.distid,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/districtregister/:type/:id", async (req, res) => {
  console.log(req.body);
  try {
    const response = await District.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      dist: req.body.dist,
    });
    res.json({ status: "ok", response });
  } catch (err) {
    res.json({ status: "error", response: false });
  }
});

app.get("/api/alldistricts/:type/:id", async (req, res) => {
  try {
    if (req.params.type == "distr") {
      const districts = await District.find({ _id: req.params.id });
      console.log(districts);
      return res.status(200).json(districts);
    }
    if (req.params.type == "admin") {
      const districts = await District.find({});
      return res.status(200).json(districts);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/allschools/:type/:id", async (req, res) => {
  try {
    if (req.params.type == "distr") {
      const school = await School.find({ distid: req.params.id });
      return res.status(200).json(school);
    }
    if (req.params.type == "admin") {
      const school = await School.find({});
      return res.status(200).json(school);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/allfaculty/:type/:id", async (req, res) => {
  try {
    if (req.params.type == "distr") {
      const school = await Faculty.find({ distid: req.params.id });
      return res.status(200).json(school);
    }
    if (req.params.type == "admin") {
      const school = await Faculty.find({});
      return res.status(200).json(school);
    }
    if (req.params.type == "school") {
      const school = await Faculty.find({ schoolid: req.params.id });
      return res.status(200).json(school);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/allstud/:type/:id", async (req, res) => {
  try {
    if (req.params.type == "distr") {
      const stud = await Stud.find({ distid: req.params.id });
      return res.status(200).json(stud);
    }
    if (req.params.type == "admin") {
      const stud = await Stud.find({});
      return res.status(200).json(stud);
    }
    if (req.params.type == "school") {
      const stud = await Stud.find({ schoolid: req.params.id });
      return res.status(200).json(stud);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/api/deletedist/:id", async (req, res) => {
  try {
    await District.deleteOne({ _id: req.params.id });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/api/deleteschl/:id", async (req, res) => {
  try {
    await School.deleteOne({ _id: req.params.id });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/api/deletefac/:id", async (req, res) => {
  try {
    await Faculty.deleteOne({ _id: req.params.id });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.delete("/api/deletestud/:id", async (req, res) => {
  try {
    await Stud.deleteOne({ _id: req.params.id });
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/district/:type/:id", async (req, res) => {
  try {
    const distrk = await District.find({ _id: req.params.id });
    res.status(200).json(distrk);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/school/:type/:id", async (req, res) => {
  try {
    const distrk = await School.find({ _id: req.params.id });
    res.status(200).json(distrk);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/faculty/:type/:id", async (req, res) => {
  try {
    const distrk = await Faculty.find({ _id: req.params.id });
    res.status(200).json(distrk);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/student/:type/:id", async (req, res) => {
  try {
    const distrk = await Stud.find({ _id: req.params.id });
    res.status(200).json(distrk);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.put("/api/editdist/:type/:id", async (req, res) => {
  try {
    await District.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.put("/api/editschl/:type/:id", async (req, res) => {
  try {
    await School.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.put("/api/editfac/:type/:id", async (req, res) => {
  try {
    await Faculty.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.put("/api/editstud/:type/:id", async (req, res) => {
  try {
    await Stud.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json({ status: "ok" });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.post("/api/studentlogin", async (req, res) => {
  const user = await District.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret13"
    );

    return res.json({ status: "ok", user: true });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/schoolregister/:type/:id", async (req, res) => {
  console.log(req.body);
  try {
    const response = await School.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      distr: req.body.distr,
      distid: req.body.distid,
    });
    //res.json(res.distid)
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/facultyregister/:type/:id", async (req, res) => {
  console.log(req.body);
  try {
    await Faculty.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      subject: req.body.subject,
      school: req.body.school,
      dist: req.body.dist,
      distid: req.body.distid,
      schoolid: req.body.schoolid,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/facultyloginforcourse", async (req, res) => {
  const user = await Faculty.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/schoollogin", async (req, res) => {
  const user = await School.find({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    return res.json({ status: "ok", user });
  } else {
    return res.json({ status: "error", user: false });
  }
});

app.post("/api/addcourse/:type/:id", async (req, res) => {
  console.log(req.body);
  try {
    await Course.create({
      title: req.body.title,
      author: req.body.author,
    });
    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

const cpUpload = upload.fields([
  { name: "imageUrl", maxCount: 1 },
  { name: "videoUrl", maxCount: 1 },
]);
app.post("/api/video/:type/:id", cpUpload, async (req, res) => {
  try {
    await video.create({
      title: req.body.title,
      description: req.body.description,
      imageUrl: req.files["imageUrl"][0].path,
      videoUrl: req.files["videoUrl"][0].path,
    });

    res.json({ status: "ok" });
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/uploadedVideos/:type/:id", async (req, res) => {
  try {
    // headers: { Authorization: `Bearer ${token}` }
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret13");
    const vi = await video.find({});
    res.status(200).json(vi);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/getvideo/:type/:id", async (req, res) => {
  try {
    const vid = await video.find({ _id: req.params.id });
    res.status(200).json(vid);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

app.get("/api/getDashboardData", async (req, res) => {
  try {
    const districts = await District.find({});
    // there are 5 chart.js charts in the dashboard page
    // first chart is a bar chart showing the number of schools in each district

    // in the format of
    // {
    //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    //   datasets: [
    //     {
    //       label: "No of Students",
    //       data: [12, 19, 3, 5, 2, 3],
    //       borderWidth: 1,
    //     },
    //   ],
    // },
    const noOfSchoolsinDistrict = await Promise.all( districts.map(async (d) => {
      const count = await School.countDocuments({ distid: d._id });
      return count;
    }));
    const graph1Data = {
      labels: districts.map((d) => d.name),
      datasets: [
        {
          label: "No of Schools",
         data: noOfSchoolsinDistrict,
          borderWidth: 1,
        },
      ],
    };

    // second chart is a bargraph showing the no of Faculty in each district
    const noOfFacultyinDistrict = await Promise.all( districts.map(async (d) => {
      const count = await Faculty.countDocuments({ distid: d._id });
      return count;
    }));
    const graph2Data = {
      labels: districts.map((d) => d.name),
      datasets: [
        {
          label: "No of Faculty",
          data: noOfFacultyinDistrict,
          borderWidth: 1,
        },
      ],
    };
    // third chart is a bargraph showing the no of Faculty in each School
    const noOfFacultyinSchool = await Promise.all( districts.map(async (d) => {
        const schools = await School.find({ distid: d._id });
        const count = await Promise.all(schools.map(async (s) => {
            const count = await Faculty.countDocuments({ schoolid: s._id });
            return count;
        }));
        return count;
        }
    ));
    const graph3Data = {
      labels: districts.map((d) => d.name),
      datasets: [
        {
          label: "No of Faculty",
          data: noOfFacultyinSchool,
          borderWidth: 1,
        },
      ],
    };
    // fourth chart is a bargraph showing the no of Students in each district
    const noOfStudentsinDistrict = await Promise.all( districts.map(async (d) => {
      const count = await Stud.countDocuments({ distid: d._id });
      return count;
    }));
    const graph4Data = {
      labels: districts.map((d) => d.name),
      datasets: [
        {
          label: "No of Students",
          data: noOfStudentsinDistrict,
          borderWidth: 1,
        },
      ],
    };
    // fifth chart is a bargraph showing the no of Students in each School
    const noOfStudentsinSchool = await Promise.all( districts.map(async (d) => {
        const schools = await School.find({ distid: d._id });
        const count = await Promise.all(schools.map(async (s) => {
            const count = await Stud.countDocuments({ schoolid: s._id });
            return count;
        }));
        return count;
        }
    ));
    const graph5Data = {
      labels: districts.map((d) => d.name),
      datasets: [
        {
          label: "No of Students",
          data: noOfStudentsinSchool,
          borderWidth: 1,
        },
      ],
    };
    return res.status(200).json({ data: [graph1Data, graph2Data,graph3Data,graph4Data,graph5Data] });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});
app.listen(1337, () => {
  console.log("server started on 1337");
});
