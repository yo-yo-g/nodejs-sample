const Product = require('../models/product.model'); //imported class

exports.create = function (req, res) {
    if (Object.keys(req.body).length === 0) {
        res.send('No data inserted!');
        return;
    }

    const validData = isDataValid(req, res);

    if (!validData) {
        return;
    }

    const product = new Product(
        {
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity
        }
    );

    product.save(function (err) {
        checkDbRespose(err, res, true, 'Product created successfully.', 'Product creating failed!');
    })
};

exports.get = function (req, res) {
    if (req.query.id) {
        Product.findById(req.query.id, function (err, product) {
            checkDbRespose(err, res, true, product, 'Invalid id!');
        });   
    } else {
        Product.find({ }, function (err, products) {
            checkDbRespose(err, res, true, products, 'Products finding failed!'); 
        })
    }
};

exports.update = function (req, res) {
    if (req.body.id) {
        Product.findById(req.body.id, function (err, product) {
            const isDbResponseSuccess = checkDbRespose(err, res, false, '', 'Invalid id!');

            if (isDbResponseSuccess) {
                if (req.body.name !== product.name || 
                    req.body.price !== product.price || 
                    req.body.quantity !== product.quantity) {
                    
                    const validData = isDataValid(req, res);

                    if (validData) {
                        product.name = req.body.name;
                        product.price = req.body.price;
                        product.quantity = req.body.quantity;
                        product.updatedAt = Date.now();

                        product.save(function (err) {
                            checkDbRespose(err, res, true, 'Product updated successfully.', 'Product updating failed!');
                        })
                    }
                } else {
                    res.send('No new data inserted!');
                }
            }
        });
    } else {
        res.send('Invalid id!');
    }
};

exports.delete = function (req, res) {
    if (req.query.id) {
        Product.findByIdAndDelete(req.query.id, function (err) {
            checkDbRespose(err, res, true, 'Product deleted successfully.', 'Product deleting failed!');
        });
    } else {
        res.send('Invalid id!');
    }
};

function isDataValid(req, res) {
    let message = 'Invalid';
    
    if (typeof req.body.name !== 'string') {
        message += ' name';
    }

    if (typeof req.body.price !== 'number') {
        message += ', price';
    }

    if (typeof req.body.quantity !== 'number') {
        message += ', quantity';
    }

    if (message !== 'Invalid') {
        message += '.';

        res.send({
            status: 400,
            message
        });

        return false;
    }

    return true;
}

function checkDbRespose(err, res, exitForSuccess, success, fail) {
    if (err) {
        res.send(fail);

        return false;
    } else {

        if (exitForSuccess) {
            res.send(success);
        }

        return true;
    }
}
