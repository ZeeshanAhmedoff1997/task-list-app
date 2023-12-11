const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URL ||
    'mongodb+srv://tg-admin:admin@cluster0.nltdz.mongodb.net/task-manager?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
  }
);
