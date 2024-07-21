document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault(); // Prevent form from submitting the default way
  
      const searchValue = document.getElementById('search').value.trim();
  
      if (searchValue) {
        // Clear previous results
        userList.innerHTML = '';
        reposList.innerHTML = '';
  
        // Fetch user data from GitHub
        try {
          const userResponse = await fetch(`https://api.github.com/search/users?q=${searchValue}`);
          const userData = await userResponse.json();
          
          if (userData.items) {
            // Display users
            userData.items.forEach(user => {
              const userItem = document.createElement('li');
              userItem.innerHTML = `
                <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
                <a href="${user.html_url}" target="_blank">${user.login}</a>
              `;
              userItem.addEventListener('click', () => fetchUserRepos(user.login));
              userList.appendChild(userItem);
            });
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      }
    });
  
    async function fetchUserRepos(username) {
      reposList.innerHTML = ''; // Clear previous repositories
  
      try {
        const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await reposResponse.json();
  
        if (reposData) {
          // Display repositories
          reposData.forEach(repo => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            `;
            reposList.appendChild(repoItem);
          });
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      }
    }
  });
  