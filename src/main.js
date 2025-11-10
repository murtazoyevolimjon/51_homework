// import express from 'express';
// import path from 'path';
// import mongoose from 'mongoose';
// import { fileURLToPath } from 'url';
// import { Blog } from './models/blog.model.js';  // blog.model.js faylidan Blog modelini import qilamiz

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // Middlewarlar
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Views konfiguratsiyasi
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Statik fayllar uchun
// app.use(express.static(path.join(__dirname, 'public')));

// // MongoDB ulanish funksiyasi
// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://127.0.0.1:27017/superapp');
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('DB connection error:', err);
//   }
// };

// // ROUTES

// // Bosh sahifa
// app.get('/', (req, res) => {
//   res.render('pages/index');
// });

// // Barcha bloglarni ko‘rsatish
// app.get('/blog', async (req, res) => {
//   const blogs = await Blog.find({}).sort({ createdAt: -1 });
//   res.render('pages/blog', { blogs });
// });

// // Yangi blog qo‘shish formasi
// app.get('/blog/new', (req, res) => {
//   res.render('pages/new_blog');  // new_blog.ejs faylini render qiladi
// });


// // Yangi blog yaratish
// app.post('/blog', async (req, res) => {
//   const body = req.body;
//   await Blog.create(body);
//   res.redirect('/blog');
// });

// // Blog tahrirlash formasi
// app.get('/blog/edit/:id', async (req, res) => {
//   const { id } = req.params;
//   const blog = await Blog.findById(id);
//   res.render('pages/edit.blog', { blog }); // views/pages/edit.blog.ejs
// });

// // Blogni yangilash
// app.post('/blog/:id', async (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   await Blog.findByIdAndUpdate(id, body, { new: true });
//   res.redirect('/blog');
// });

// // Bitta blogni ko‘rsatish
// app.get('/blog/:id', async (req, res) => {
//   const { id } = req.params;
//   const blog = await Blog.findById(id);
//   res.render('pages/one_blog', { blog }); // views/pages/one_blog.ejs
// });

// // About sahifa
// app.get('/about', (req, res) => {
//   res.render('pages/about');
// });

// // Serverni ishga tushirish
// const bootstrap = async () => {
//   try {
//     await connectDB();
//     app.listen(8080, () => {
//       console.log('✅ Server is listening on port 8080');
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };

// bootstrap();







import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import { Blog } from './models/blog.model.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewarlar
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // <-- shu joyni qo‘shamiz

// Views konfiguratsiyasi
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Statik fayllar
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB ulanishi
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/superapp');
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('DB connection error:', err);
  }
};

// ROUTES

// Bosh sahifa
app.get('/', (req, res) => {
  res.render('pages/index');
});

// Barcha bloglar
app.get('/blog', async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 });
  res.render('pages/blog', { blogs });
});

// Yangi blog formasi
app.get('/blog/new', (req, res) => {
  res.render('pages/new_blog');
});

// Yangi blog yaratish
app.post('/blog', async (req, res) => {
  await Blog.create(req.body);
  res.redirect('/blog');
});

// Blog tahrirlash formasi
app.get('/blog/edit/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render('pages/edit_blog', { blog }); // ✅ nomini to‘g‘riladik
});

// Blogni yangilash
app.put('/blog/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect('/blog');
});

// Blogni o‘chirish
app.delete('/blog/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  res.redirect('/blog');
});

// Bitta blog
app.get('/blog/:id', async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  res.render('pages/one_blog', { blog });
});

// About sahifasi
app.get('/about', (req, res) => {
  res.render('pages/about');
});

// Serverni ishga tushirish
const bootstrap = async () => {
  await connectDB();
  app.listen(8080, () => console.log('🚀 Server running on port 8080'));
};
bootstrap();
