const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// lire les formulaires
app.use(express.urlencoded({ extended: true }));

// fichiers publics (HTML, CSS)
app.use(express.static("public"));

// session
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

// page connexion
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// traitement login
app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  if (
    (user === "clement" && pass === "azerty") ||
    (user === "pablo" && pass === "1234")
  ) {
    req.session.user = user;
    res.redirect("/home");
  } else {
    res.send("Erreur login");
  }
});

// page protégée
app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.sendFile(path.join(__dirname, "public", "home.html"));
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// ⚠️ IMPORTANT POUR RENDER
app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur lancé");
});