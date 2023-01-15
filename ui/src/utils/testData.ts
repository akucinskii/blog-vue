const testPosts = [
  {
    id: "313553ff-784f-497f-adfc-7e549bebab66",
    title:
      "POST TESTOWY asm.nfnasnfas.fa.sfn,acsaf;;;;;;;;;;;;jslfsafsjafjsajkfsjfsajfsafsajlfjlksajklfasjklafsjklfsajklaflkjslksfnsaf,mnfsa,fsannm",
    date: "2037-01-01",
    text: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
    imageUrl:
      "https://images.unsplash.com/photo-1495753379358-73c76ccd644b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80",
    author: {
      username: "Robert",
      avatar:
        "https://images.unsplash.com/photo-1495753379358-73c76ccd644b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80",
      description: "test description",
    },
    category: {
      id: "1",
      name: "Technology",
    },
    disabled: false,
  },
  {
    id: "313553ff-784f-497f-adfc-7e549rerab66",
    title: "sfakfasjlasdasdasndaskdjaskjsj",
    date: "2020-01-01",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi e",
    imageUrl:
      "https://images.unsplash.com/photo-1495753379358-73c76ccd644b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80",
    author: {
      username: "Wojciech",
      avatar:
        "https://images.unsplash.com/photo-1495753379358-73c76ccd644b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1539&q=80",
      description: "test description",
    },
    category: {
      id: "2",
      name: "Dieta",
    },
    disabled: false,
  },
  {
    id: "fsafasd",
    title: "Najlepsza dieta w okolicy. Zobacz teraz!!!",
    date: "2020-01-01",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi euismod nisi. Nullam euismod, nisi eu consectetur euismod, nisl nisi consectetur nisi, eu consectetur nisi nisi e",
    imageUrl:
      "https://images.unsplash.com/photo-1529565214304-a882ebc5a8e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    author: {
      username: "Test author",
      avatar:
        "https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
      description: "test description",
    },
    category: {
      id: "1",
      name: "Technology",
    },
    disabled: false,
  },
  {
    id: "fsafasd",
    title: "This post shouldnt be visible",
    date: "2020-01-01",
    text: "This post shouldnt be visible",
    imageUrl:
      "https://images.unsplash.com/photo-1529565214304-a882ebc5a8e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    author: {
      username: "Test author",
      avatar:
        "https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80",
      description: "test description",
    },
    category: {
      id: "2",
      name: "Dieta",
    },
    disabled: true,
  },
];

export const testCategories = [
  {
    id: "1",
    name: "Technology",
  },
  {
    id: "2",
    name: "Dieta",
  },
  {
    id: "3",
    name: "Entertainment",
  },
];

export const testUser = {
  id: "1",
  username: "TestUser",
  password: "Password123.",
  avatar_url: "testAvatar.jpg",
  description: "test description",
  name: "Test name",
  surname: "Test surname",
  is_admin: true,
};

export default testPosts;
