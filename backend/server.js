const express = require('express');     // server web
const cors = require('cors');           // managest React requests
require('dotenv').config();             // loads variables from .env
const sequelize = require('./config/db.js'); // db connection

const User = require('./models/user.js'); // import User model
const Category = require('./models/category.js'); // import Category model
const Product = require('./models/products.js'); // import Product model
const Vehicle = require('./models/vehicle.js'); // import Vehicle model
const Address = require('./models/address.js'); // import Address model
const Order = require('./models/order.js'); // import Order model
const OrderItem = require('./models/orderItem.js'); // import OrderItem model
const ProductCompatibility = require('./models/productCompatibility.js'); // import ProductCompatibility model

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require('./routes/authRoutes.js'); // import auth routes
const productRoutes = require('./routes/productRoutes.js'); // import product routes
const vehicleRoutes = require('./routes/vehicleRoutes.js'); // import vehicle routes
const cartRoutes = require('./routes/cartRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const addressRoutes = require('./routes/addressRoutes.js');
const categoryRoutes = require('./routes/categoryRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');


// app init
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes); // use auth routes
app.use('/api/products', productRoutes); // link url to routes
app.use('/api/vehicles', vehicleRoutes); 
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/admin', adminRoutes);


// test
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

const startServer = async () => {
  try {
    await sequelize.authenticate(); // verify connection
    console.log('Connection successful.');

    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    const createAdmin = async () => {
    const adminExists = await User.findOne({ where: { role: 'admin' } });
    if (!adminExists) {
        await User.create({
            name: 'Admin',
            email: 'admin@marsigliaecommerce.it',
            password: 'PassworDona26!', 
            role: 'admin'
        });
        console.log("Account Admin creato: admin@marsigliacommerce.it / PassworDona26!");
    }
};
createAdmin();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
