let Name = document.querySelector('.name')
let userName = document.querySelector('.username')
let description = document.querySelector('.description')
let followersCount = document.querySelector('.followers-count')
let followingCount = document.querySelector('.following-count')
let publicRepos = document.querySelector('.public-repo-count')
let githubProfileLink = document.querySelector('.github-profile-link')
let photo = document.querySelector('.github-avatar')

let searchContainer = document.querySelector('.container')
let userCard = document.querySelector('.display-user-container')

let input = document.getElementById('search')
let cancelBtn = document.querySelector('.cancel-btn')
let loader = document.querySelector('.loader')

let repo = document.querySelector('.repo')

let delay = 0.12
let userGrid = Array.from(document.querySelectorAll('.user-grid'))
let total = userGrid.length

function fetchUser(data) {
    return fetch(`https://api.github.com/users/${data}`)
        .then((res) => {
            if (!res.ok) throw new Error("User not found")
            else return res.json()
        })

}

function displayUser() {
    if (input.value.trim() === "") {
        alert("Please enter a username")
    }
    else {

        loader.style.display = 'flex'
        document.body.style.pointerEvents = 'none'
        setTimeout(() => {
            fetchUser(input.value)
                .then((userData) => {
                    loader.style.display = 'none'
                    userCard.style.display = 'grid'
                    userCard.style.visibility = 'visible'
                    document.body.style.pointerEvents = ''

                    userGrid.forEach((element, index) => {
                        element.style.animationDelay = `${index * delay}s`;
                        element.classList.remove('hide')
                        element.classList.add('show')
                    })


                    photo.setAttribute('src', userData.avatar_url)
                    Name.innerText = userData.name || "No name provided"
                    userName.innerText = userData.login
                    description.innerText = userData.bio || "No description provided"
                    followersCount.innerText = userData.followers
                    followingCount.innerText = userData.following
                    publicRepos.innerText = userData.public_repos

                    input.value = ""
                })
                .catch((err => {

                    console.log(err);
                    document.body.style.pointerEvents = ''
                }))
        }, 2000);

    }
}

function cancel() {
    userGrid.forEach((element, index) => {
        element.style.animationDelay = `${(index) * delay}s`;
        element.classList.remove('show')
        element.classList.add('hide')
    })
    setTimeout(() => {
        userCard.style.display = 'none'
    }, 600);
    userCard.style.visibility = 'hidden'
    searchContainer.style.display = 'flex'
    photo.setAttribute('src', "")
    Name.innerText = ""
    userName.innerText = ""
    description.innerText = ""
    followersCount.innerText = ""
    followingCount.innerText = ""
    publicRepos.innerText = ""
    githubProfileLink.setAttribute('href', "")
}