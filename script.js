let Name = document.querySelector('.name')
let userName = document.querySelector('.username')
let description = document.querySelector('.description')
let followersCount = document.querySelector('.followers-count')
let followingCount = document.querySelector('.following-count')
let publicRepos = document.querySelector('.public-repo-count')
let githubProfileLink = document.querySelector('.github-profile-link')
let photo = document.querySelector('.github-avatar')

let searchContainer = document.querySelector('.container')
let userCard = document.querySelector('.user-card')

let input = document.getElementById('search')
let cancelBtn = document.querySelector('.cancel-btn')
let loading = document.querySelector('.loading')

function fetchUser(data) {
    return fetch(`https://api.github.com/users/${data}`)
        .then((res) => {
            if (!res.ok) throw new Error("User not found")
            else return res.json()
        })

}

function fetchRepos(userLogin){
    return fetch(`https://api.github.com/users/${userLogin}/repos`).then(res => res.json())
}

function displayUser() {
    if (input.value.trim() === "") {
        alert("Please enter a username")
    }
    else {
        userCard.classList.remove('hide-card')
        userCard.style.display = 'none'
        loading.innerText = "Loading....."
        loading.style.display = 'block'
        document.body.style.pointerEvents = 'none'

        setTimeout(() => {
            fetchUser(input.value)
                .then((userData) => {
                    userCard.style.display = 'grid'
                    userCard.classList.add('show-card')
                    searchContainer.style.display = 'none'
                    loading.style.display = 'none'

                    document.body.style.pointerEvents = ''

                    photo.setAttribute('src', userData.avatar_url)
                    Name.innerText = userData.name || "No name provided"
                    userName.innerText = userData.login
                    description.innerText = userData.bio || "No description provided"
                    followersCount.innerText = userData.followers
                    followingCount.innerText = userData.following
                    publicRepos.innerText = userData.public_repos
                    githubProfileLink.setAttribute('href', userData.html_url)

                    return fetchRepos(userData.login)
                })
                .then((repos)=>{
                    console.log(repos);
                })
                .catch((err => {
                    loading.style.display = 'none'
                    alert(err)
                    document.body.style.pointerEvents = ''
                }))
        }, 1200);

    }
}

function cancel() {

    userCard.classList.remove('show-card')
    userCard.classList.add('hide-card')
        setTimeout(() => {
        userCard.style.display = 'none'

    }, 400);
    

    searchContainer.style.display = 'flex'
    loading.textContent = ""
    loading.style.display = 'none'

    photo.setAttribute('src', "")
    Name.innerText = ""
    userName.innerText = ""
    description.innerText = ""
    followersCount.innerText = ""
    followingCount.innerText = ""
    publicRepos.innerText = ""
    githubProfileLink.setAttribute('href', "")
}