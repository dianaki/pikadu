// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARX4-SJ4cXmTFl4lfHFSrG5qnzy-gFW_U",
  authDomain: "pikadu-23808.firebaseapp.com",
  databaseURL: "https://pikadu-23808.firebaseio.com",
  projectId: "pikadu-23808",
  storageBucket: "pikadu-23808.appspot.com",
  messagingSenderId: "852951550977",
  appId: "1:852951550977:web:122cfed56df1db4b2e8400"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');
const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');
const editUserName = document.querySelector('.edit-username');
const editUserPhoto = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');
const postsWrapper = document.querySelector('.posts');

const buttonNewPost = document.querySelector('.button-new-post');
const addPostElem = document.querySelector('.add-post');

const listUsers = [
  {
    email: 'diana@mail.com',
    password: '12345',
    displayName: 'DianaJS',
    photo: 'https://www.alpinabook.ru/upload/resize_cache/iblock/663/700_700_1/663f4c67619485c224c5b149b1f65eab.jpg',
  },
  {
    email: 'sasha@mail.com',
    password: '123456',
    displayName: 'SashaJava',
    photo: 'https://icdn.lenta.ru/images/2019/11/01/13/20191101130724350/square_1280_88f54b592eb591cd6252313b5ec3e06d.png',
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('Email не валидный')
      return;
    }
    const user = this.getUser(email);
    if (user && user.password === password) {
      this.authorizedUser(user)
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('Email не валидный')
      return;
    }

    if (!email.trim() || !password.trim()) {
      alert('Введите данные');
      return;
    }
    if (!this.getUser(email)) {
      const user = { email, password, displayName: email.split('@')[0] };
      listUsers.push(user);
      this.authorizedUser(user)
      console.log(listUsers);
      handler();
    } else {
      alert('Пользователь с таким email уже зарегистрирован')
    }
  },
  editUser(userName, userPhoto, handler) {
    if (userName) {
      this.user.displayName = userName;
    }
    if (userPhoto) {
      this.user.photo = userPhoto;
    }

    handler();
  },
  getUser(email) {
    return listUsers.find((item) => {
      return item.email === email
    })
  },
  authorizedUser(user) {
    this.user = user;
  }
};

const setPosts = {
  allPosts: [
    {
      title: 'Заголовок поста',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum tenetur dolores expedita enim illum adipisci eum quae debitis ducimus, consequatur atque officiis odio tempora! Repudiandae dolorum sit repellendus architecto molestias veniam dolorem! Repellendus ut quos ducimus nisi a officiis voluptate culpa accusamus facilis illo eius exercitationem vero dolorem modi temporibus alias, expedita et sunt sit? Dolores doloribus sequi cumque quas',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: { displayName: 'sasha', photo: 'https://icdn.lenta.ru/images/2019/11/01/13/20191101130724350/square_1280_88f54b592eb591cd6252313b5ec3e06d.png' },
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 12,
    },
    {
      title: 'Заголовок поста 2',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство чтовопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'мое', 'случайность'],
      author: { displayName: 'diana', photo: 'https://www.alpinabook.ru/upload/resize_cache/iblock/663/700_700_1/663f4c67619485c224c5b149b1f65eab.jpg' },
      date: '10.11.2020, 10:54:00',
      like: 45,
      comments: 2,
    },
  ],

  addPost(title, text, tags, handler) {
    this.allPosts.unshift({
      title,
      text, 
      tags: tags.split(',').map(item => item.trim()),
      author: {
        displayName: setUsers.user.displayName,
        photo: setUsers.user.photo,
      },
      date: new Date().toLocaleString(),
      like: 0,
      comments: 0,
    })

    if (handler) {
      handler();
    }
  }
};

const toggleAuthDom = () => {
  const user = setUsers.user;

  if (user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userNameElem.textContent = user.displayName;
    userAvatarElem.src = user.photo || userAvatarElem.src;
    buttonNewPost.classList.add('visible');
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
    buttonNewPost.classList.remove('visible');
    addPostElem.classList.remove('visible');
    postsWrapper.classList.add('visible');
  }
};

const showAddPost = () => {
  addPostElem.classList.add('visible');
  postsWrapper.classList.remove('visible');
}

const showAllPosts = () => {
  let postsHTML = '';

  setPosts.allPosts.forEach(({ title, text, date, like, comments, tags, author }) => {

    postsHTML += `
    <section class="post">
      <div class="post-body">
        <h2 class="post-title">${title}</h2>
        <p class="post-text">${text}</p>
        <div class="tags">
          ${tags.map(tag => `<a href="#" class="tag">#${tag}</a>`)}
        </div>
      </div>
      <div class="post-footer">
        <div class="post-buttons">
          <button class="post-button likes">
            <svg width="19" height="20" class="icon icon-like">
              <use xlink:href="img/icons.svg#like"></use>
            </svg>
            <span class="likes-counter">${like}</span>
          </button>
          <button class="post-button comments">
            <svg width="21" height="21" class="icon icon-comment">
              <use xlink:href="img/icons.svg#comment"></use>
            </svg>
            <span class="comments-counter">${comments}</span>
          </button>
          <button class="post-button save">
            <svg width="19" height="19" class="icon icon-save">
              <use xlink:href="img/icons.svg#save"></use>
            </svg>
          </button>
          <button class="post-button share">
            <svg width="17" height="19" class="icon icon-share">
              <use xlink:href="img/icons.svg#share"></use>
            </svg>
          </button>
        </div>
        <div class="post-author">
          <div class="author-about">
            <a href="#" class="author-username">${author.displayName}</a>
            <span class="post-time">${date}</span>
          </div>
          <a href="#" class="author-link"><img src=${author.photo || "img/avatar.jpeg"} alt="avatar" class="author-avatar"></a>
        </div>
      </div>
    </section>
  `;
  })
  postsWrapper.innerHTML = postsHTML;

  addPostElem.classList.remove('visible');
  postsWrapper.classList.add('visible');
};

const init = () => {

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  });

  loginSignUp.addEventListener('click', (event) => {
    event.preventDefault();

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
    loginForm.reset();
  })

  exitElem.addEventListener('click', (event) => {
    event.preventDefault();
    setUsers.logOut(toggleAuthDom);
  });

  editElem.addEventListener('click', (event) => {
    event.preventDefault();
    editContainer.classList.toggle('visible');
    editUserName.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', (event) => {
    event.preventDefault();

    setUsers.editUser(editUserName.value, editUserPhoto.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  })
  // отслеживаем клик по кнопке меню и запускаем функцию 
  menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликнули по кнопке меню 
    menu.classList.toggle('visible');
  })

  buttonNewPost.addEventListener('click', (event) => {
    event.preventDefault();

    showAddPost();
  });

  addPostElem.addEventListener('submit', (event) => {
    event.preventDefault();

    const { title, text, tags } = addPostElem.elements;
    if (title.value.length < 6) {
      alert ('Слишком короткий заголовок');
      return;
    };

    if (text.value.length < 10) {
      alert ('Слишком короткий пост');
      return;
    };

    setPosts.addPost(title.value, text.value, tags.value, showAllPosts);

    addPostElem.classList.remove('visible');
    addPostElem.reset();
  });

  showAllPosts();
  toggleAuthDom();
};

document.addEventListener('DOMContentLoaded', () => {
  init();
});