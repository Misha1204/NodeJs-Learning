const Product = require("../models/product");

exports.getAddProduct = (req, res) => {
    res.render("admin/edit-product", {
      pageTitle: "Add Product",
      path: "/admin/add-product",
      editing: false
    });
  };
  
exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageUrl, description, price);
    product.save().then(() => {
      res.redirect("/");
    }).catch(err => {
      console.log(err);
    })
};

exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect("/");
  }

  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if(!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product
    });
  })
};

exports.postEditProduct = (req, res) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice);
  updatedProduct.save();
  res.redirect("/admin/products");
};

exports.getProducts = (req, res) => {
    Product.fetchAll().then(([rows, fieldData]) => {
      res.render("admin/products", {
        prods: rows,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    }).catch(err => {
      console.log(err);
    });
}

exports.postDeleteProduct = (req, res) => {
  const prodId = req.body.productId;

  Product.deleteProductById(prodId).then(() => {
    res.redirect("/admin/products");
  }).catch(err => {
    console.log(err);
  });
}