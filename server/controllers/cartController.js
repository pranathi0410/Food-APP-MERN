const Cart = require("../models/Cart")
exports.addToCart = async (req, res) => {
  try {
    const { userId, resId, itemId, name, price } = req.body;

    let cart = await Cart.findOne({ userId });
    // if no cart exist
    if (!cart) {
      cart = new Cart({
        userId,
        resId,
        items: [{ itemId, name, price, quantity: 1 }]
      })
      await cart.save();
      return res.status(201).json(cart);
    }

    //cart exist, but diff res
    if (cart.resId !== resId) {
      return res.status(400).json({
        message: "cart contains items from another restaurant"
      })

    }

    //checking if item exist , if yes, ++quantity
    const existingItem = cart.items.find(
      (item) => item.itemId.toString() === itemId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ itemId, name, price, quantity: 1 })
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: " error in server" })
  }
}
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    await Cart.deleteOne({ userId });

    res.json({ message: "Cart cleared" });

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
exports.updateQuantity = async (req, res) => {

  try {

    const { userId, itemId, action } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(i => i.itemId === itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (action === "increase") {
      item.quantity += 1;
    }

    if (action === "decrease") {

      item.quantity -= 1;

      if (item.quantity <= 0) {
        cart.items = cart.items.filter(i => i.itemId !== itemId);
      }
      if (cart.items.length === 0) {
        await Cart.deleteOne({ userId });
        return res.json(null);
      }

    }

    await cart.save();

    res.json(cart);

  } catch (err) {

    console.error(err);
    res.status(500).json({ message: "Server error" });

  }

};
