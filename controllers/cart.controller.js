const Cart = require("../models/Cart.model");

module.exports.cartController = {
  createCart: async (req, res) => {
    try {
      const addedCart = await Cart.create({
        user: req.body.user,
        items: [],
        totalPrice: 0,
      });
      return res.json(addedCart);
    } catch (err) {
      return res.json(err);
    }
  },
  getCartById: async (req, res) => {
    try {
      const cartById = await Cart.findById(req.params.id);
      return res.json(cartById);
    } catch (err) {
      return res.json(err);
    }
  },
  getAllCarts: async (req, res) => {
    try {
      const allCarts = await Cart.find();
      return res.json(allCarts);
    } catch (err) {
      return res.json(err);
    }
  },
  patchCartById: async (req, res) => {
    try {
      const patchedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          user: req.body.user,
          items: [],
          totalPrice: 0,
        },
        { new: true }
      );
      return res.json(patchedCart);
    } catch (err) {
      return res.json(err);
    }
  },
  addProductToBasket: async (req, res) => {
    try {
      const addedProduct = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $push: {
            items: req.body.item,
          },
        },
        { new: true }
      );
      return res.json(addedProduct);
    } catch (err) {
      return res.json(err);
    }
  },
  deleteProductFromBasket: async (req, res) => {
    try {
      const deletedProduct = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $pull: {
            items: {
              _id: req.body.itemId,
            },
          },
        },
        { new: true }
      );
      return res.json(deletedProduct);
    } catch (err) {
      return res.json(err);
    }
  },
  deleteCartById: async (req, res) => {
    try {
      const deletedCart = await Cart.findByIdAndDelete(req.params.id);
      return res.json(deletedCart);
    } catch (err) {
      return res.json(err);
    }
  },
};