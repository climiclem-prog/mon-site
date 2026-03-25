const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// ✅ IMPORTANT
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  if (
    (user === "clement" && pass === "azerty") ||
    (user === "pablo" && pass === "1234")
  ) {
    req.session.user = user;
    res.redirect("/home.html");
  } else {
    res.send("Erreur login");
  }
});

app.get("/home.html", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "public", "home.html"));
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur lancé");
});