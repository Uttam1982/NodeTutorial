console.log('Before');

//CALLBACKS -nested structure
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

//PROMISES - Flat structure
// getUser(1)
//   .then((user) => getRepositories(user.gitHubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commits) => console.log('commits: ', commits))
//   .catch((err) => console.log('Error: ', err.message));

//Async and await approch
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commits = await getCommits(repos[0]);

    console.log('commits', commits);
  } catch (err) {
    console.log('Error: ', err.message);
  }
}
displayCommits();

console.log('After');

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Reading a user with id: ${id} from a database...`);
      resolve({ id: id, gitHubUsername: 'Uttam' });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API - Repository');
      //resolve(['repo1', 'repo2', 'repo3']);
      reject(new Error('Could not get the repositories!!!'));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Calling GitHub API - Commits');
      resolve(['commit1', 'commit2', 'commit3']);
    }, 2000);
  });
}
