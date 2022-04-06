const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

require('../models/User');
require('../models/Item');
require('../models/Comment');
const Item = mongoose.model('Item');
const User = mongoose.model('User');
const Comment = mongoose.model('Comment');

const createComment = async (item, index) => {
  const comment = new Comment({
    body: `Just a sample comment : ${index}`,
    user: item.user,
    item: item._id,
  });
  await comment.save();
};

const createItem = async (user, i) => {
  const item = new Item({
    title: `Item ${i}`,
    description: 'An item for sale',
    price: i * 10,
    seller: user._id,
    tags: ['selling', 'example'],
  });
  await item.save();
  await createComment(item, i);
};

const createCollection = async () => {
  for (let i = 0; i < 101; i++) {
    const user = new User({
      email: `${i}@gmail.com`,
      password: '12345678',
      username: `Sample${i}`,
      bio: 'Just here to sell some items',
    });
    await user.save();
    await createItem(user, i);
  }
};

createCollection()
  .then(() => {
    console.log('Finished seeding');
    process.exit(0);
  })
  .catch((err) => {
    console.log(`Error while running seed file: ${err.message}`);
    process.exit(1);
  });

// Test purpose
