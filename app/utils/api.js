const id = "YOUR_CLIENT_ID";
const sec = "YOUR_SECRET_ID";
const params = `?client_id=${id}&client_secret=${sec}`;
export function fetchPopularRepos(language) {
    const endpoint = window.encodeURI(
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
    );
    return fetch(endpoint).then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message);
            }
            return data.items;
        })
}
function getProfile(username) {
    return (
        fetch(`https://api.github.com/users/${username}`).then
            ((res) => res.json())
            .then((data) => {
                if (data.message) {
                    throw new Error(getErrorMsg(data.message, username))
                }
                console.log(data)
                return data;
            })
    )
}
function getRepos(username) {
    return (
        fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`).then
            ((res) => res.json())
            .then((data) => {
                if (data.message) {
                    throw new Error(getErrorMsg(data.message, username))
                }
                console.log(data)
                return data;
            })
    )
}
function getErrorMsg(message, username) {
    if (message === 'Not Found') {
        console.log(`${username} doesn't exist`)
        return `${username} doesn't exist`
    }
}
function getStarCount(repos) {
    console.log(repos)
    return repos.reduce((count, { stargazers_count }) => {
        return count + stargazers_count;
    }, 0);
}
function getUserData(player) {
    return Promise.all([getProfile(player), getRepos(player)])
        .then(([profile, repos]) => ({
            profile,
            score: calculateScore(profile.followers, repos)
        }))
}
function calculateScore(followers, repos) {
    return followers * 3 + getStarCount(repos);
}
function sortPlayers(players) {
    return players.sort((playerOne, playerTwo) =>
        playerTwo.score - playerOne.score
    )
}
export function battle(players) {
    return Promise.all([getUserData(players[0]), getUserData(players[1])])
        .then(
            sortPlayers
        )

}