const state = { currentUsers: [], currentRepos: [] };
const reposUrl = "https://api.github.com/users/---/repos"; // replace --- with username

const githubForm = document.getElementById("github-form");
const githubContainer = document.getElementById("github-container");
const userList = document.getElementById("user-list");
const reposList = document.getElementById("repos-list");

const getData = (url) => {
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json();
    } else {
      throw resp.statusText;
    }
  });
};

const handleUserClick = ({ repos_url }) => {
  console.log(repos_url);
  githubContainer.innerHTML = "";
  const searchValue = e.target.search.value;
  const usersUrl = `https://api.github.com/search/users?q=${searchValue}`;
  if (searchValue.trim()) {
    getData(usersUrl)
      .then((data) => {
        if (!data.incomplete_results) {
          state.currentUsers = [...data.items];
        }
        createUsersList(state.currentUsers);
      })
      .catch((err) => console.log("Error: ", err.message));
  } else {
    alert("Please enter a github username.");
  }
};

const createUsersList = (usersArr) => {
  usersArr.forEach((user) => {
    const li = document.createElement("li");
    li.id = `github-user-1`;
    li.addEventListener("click", () => handleUserClick(user));

    const img = document.createElement("img");
    img.src = user.avatar_url;
    img.alt = user.login;

    const h2 = document.createElement("h2");
    h2.textContent = user.login;

    li.append(img, h2);
    githubContainer.appendChild(li);
  });
};

const handleFormSubmit = (e) => {
  e.preventDefault();
  githubContainer.innerHTML = "";
  const searchValue = e.target.search.value;
  const usersUrl = `https://api.github.com/search/users?q=${searchValue}`;
  if (searchValue.trim()) {
    getData(usersUrl)
      .then((data) => {
        if (!data.incomplete_results) {
          state.currentUsers = [...data.items];
        }
        createUsersList(state.currentUsers);
      })
      .catch((err) => console.log("Error: ", err.message));
  } else {
    alert("Please enter a github username.");
  }
};

const initialize = () => {
  githubForm.addEventListener("submit", handleFormSubmit);
};
initialize();
