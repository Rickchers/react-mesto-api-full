const { Card } = require('../models/card');

const NotFoundError = require('../errors/not-found-err');
const Forbidden = require('../errors/forbidden');
const Badrequest = require('../errors/badrequest');

exports.getCards = (req, res, next) => {
  Card
    .find({}).sort({ createdAt: -1 })
    .then((cards) => {
      // console.log(cards[0].likes.toString());
      res.send(cards);
    })
    .catch(next);
};

exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badrequest('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

exports.deleteCard = (req, res, next) => {
  const cardId = req.params.id;
  Card.findById(cardId)
    .orFail(new NotFoundError('Нет карточки с указанным в запросе id'))
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        return Card.findByIdAndRemove(card._id.toString())
          .then(() => res.send({ data: card }));
      }
      next(new Forbidden('Вы не можете удалять чужие карточки'));
    })
    .catch(next);
};

exports.setLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Нет карточки с указанным в запросе id'));
      } else {
        next(err);
      }
    });
};

exports.setDislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        next(new NotFoundError('Нет карточки с указанным в запросе id'));
      } else {
        next(err);
      }
    });
};
