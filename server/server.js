```javascript
const express = require('express');
const mongoose = require('mongoose');
const passport = require('./config/passport');
const users = require('./routes/users');
const passwords = require('./routes/passwords');
const db = require('./config/db');

const app = express();

// Connect to MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Use Routes
app.use('/api/users', users);
app.use('/api/passwords', passwords);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
```