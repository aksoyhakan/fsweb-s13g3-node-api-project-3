const express = require("express");
const Users = require("./users-model");
const Posts = require("../posts/posts-model");
const {
  logger,
  validateUserId,
  validateUser,
  validatePost,
} = require("../middleware/middleware");

// `users-model.js` ve `posts-model.js` sayfalarına ihtiyacınız var
// ara yazılım fonksiyonları da gereklidir

const router = express.Router();

router.use(express.json());
router.use(logger);

router.get("/", (req, res) => {
  // TÜM KULLANICILARI İÇEREN DİZİYİ DÖNDÜRÜN
  Users.get()
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanından çekilemedi." })
    );
});

router.get("/:id", validateUserId, (req, res) => {
  // USER NESNESİNİ DÖNDÜRÜN
  // user id yi getirmek için bir ara yazılım gereklidir
  res.status(200).json(req.user);
});

router.post("/", validateUser, (req, res) => {
  // YENİ OLUŞTURULAN USER NESNESİNİ DÖNDÜRÜN
  // istek gövdesini doğrulamak için ara yazılım gereklidir.
  Users.insert(req.body)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanına işlenemedi." })
    );
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  // YENİ GÜNCELLENEN USER NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan ara yazılım gereklidir
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  Users.update(req.params.id, req.body)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanına işlenemedi." })
    );
});

router.delete("/:id", validateUserId, (req, res) => {
  // SON SİLİNEN USER NESNESİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Users.remove(req.params.id)
    .then((response) => res.status(200).json(req.user))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanına silinemedi." })
    );
});

router.get("/:id/posts", validateUserId, (req, res) => {
  // USER POSTLARINI İÇEREN BİR DİZİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  Posts.getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanından çekilemedi." })
    );
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  // YENİ OLUŞTURULAN KULLANICI NESNESİNİ DÖNDÜRÜN
  // user id yi doğrulayan bir ara yazılım gereklidir.
  // ve istek gövdesini doğrulayan bir ara yazılım gereklidir.
  Posts.insert({ user_id: req.params.id, text: req.body.text })
    .then((r) => res.status(200).json(r))
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanından işlenemedi." })
    );
});

router.use((err, req, res, next) => {
  console.error(err);
  res.status(err.code).json({ message: err.message });
});

// routerı dışa aktarmayı unutmayın
module.exports = router;
