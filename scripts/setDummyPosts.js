import {
  posts,
  translations,
  translationsCg,
  timestamp,
} from '../src/firebase/firebaseAdminRefs.js';

const post = {
  author: 'Admin User',
  description: 'working description',
  imgUrl:
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
  name: 'blog name here is exist',
  title: 'post title',

  enslug: 'post-title-en',
  hislug: 'post-title-hi',
  esslug: 'post-title-es',
  languages: ['en', 'hi', 'es'],
};

// 🌐 English version
const postEn = {
  title: 'Post Title',
  description: 'Working description',
  content: '<p>This is the English version of your blog content.</p>',
  slug: 'post-title-en',
  lang: 'en',
  status: 'draft',
  author: 'Admin User',
  imgUrl:
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
};

// 🇮🇳 Hindi version
const postHi = {
  title: 'पोस्ट शीर्षक',
  description: 'कार्य विवरण',
  content: '<p>यह आपके ब्लॉग की हिंदी सामग्री है।</p>',
  slug: 'post-title-hi',
  lang: 'hi',
  author: 'Admin User',

  imgUrl:
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
};

// 🇪🇸 Spanish version
const postEs = {
  title: 'Título de la publicación',
  description: 'Descripción de trabajo',
  content: '<p>Este es el contenido en español de tu blog.</p>',
  slug: 'post-title-es',
  lang: 'es',
  status: 'draft',
  author: 'Admin User',

  imgUrl:
    'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
};

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function setData() {
  for (let index = 0; index < 5; index++) {
    post.title = post.title + index;
    const docRef = await posts.add({
      ...post,
      createdAt: timestamp(),
      updatedAt: timestamp(),
    });

    await translations(docRef.id)
      .doc('en')
      .set(
        { ...postEn, createdAt: timestamp(), updatedAt: timestamp() },
        { merge: true },
      );
    await translations(docRef.id)
      .doc('hi')
      .set(
        { ...postHi, createdAt: timestamp(), updatedAt: timestamp() },
        { merge: true },
      );
    await translations(docRef.id)
      .doc('es')
      .set(
        { ...postEs, createdAt: timestamp(), updatedAt: timestamp() },
        { merge: true },
      );
      
    // const allTranslations = await translationsCg.get();
    // for (let char of allTranslations.docs) {
    //   char.ref.set({imgUrl:"https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"});
    // }
    await wait(1000);
  }
}
setData();
