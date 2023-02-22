const Users = require("../users/users-model");

function logger(req, res, next) {
  console.log(`${req.method}-${req.url}-${new Date()}`);
  next();
}

function validateUserId(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { id } = req.params;
  Users.getById(id)
    .then((response) => {
      if (response) {
        req.user = response;
        next();
      } else {
        next({ message: "not found", code: 404 });
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Veri tabanından çekilemedi." })
    );
}

function validateUser(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { name } = req.body;
  name ? next() : next({ message: "gerekli name alanı eksik", code: 400 });
}

function validatePost(req, res, next) {
  // SİHRİNİZİ GÖRELİM
  const { text } = req.body;
  text ? next() : next({ message: "gerekli text alanı eksik", code: 400 });
}

// bu işlevleri diğer modüllere değdirmeyi unutmayın

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
};
