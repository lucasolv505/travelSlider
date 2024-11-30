//MAIN
const btnNext = document.querySelector('.next')
const btnBack = document.querySelector('.back')
let container = document.querySelector('.container')
let list = document.querySelector('.container .list')
let thumb = document.querySelector('.container .thumb')


btnBack.onclick = () => moveItensOnClick('back')
btnNext.onclick = () => moveItensOnClick('next')

function moveItensOnClick(type){
    let listItems = document.querySelectorAll('.list .listItem')
    let thumbItems = document.querySelectorAll('.thumb .thumbItem')

    if(type === 'next'){
        list.appendChild(listItems[0])  
        thumb.appendChild(thumbItems[0])
        container.classList.add('next')
    }else{
        list.prepend(listItems[listItems.length -1])
        thumb.prepend(thumbItems[listItems.length -1])
        container.classList.add('back')
    }

    setTimeout(() => {
        container.classList.remove('next')
        container.classList.remove('back')
    }, 500)
}

//TOP PLACES
const sobeBtn = document.querySelector('#btnAvanca')
const desceBtn = document.querySelector('#btnVolta')
const places = document.querySelector('.placesContainer')

sobeBtn.onclick = () => movePlacesContainer('sobe')
desceBtn.onclick = () => movePlacesContainer('desce')

function movePlacesContainer(type){
    const placesContainers = document.querySelectorAll('.placesContainer .itensContainer')

    let ativo

    placesContainers.forEach(container=>{
        container.classList.remove('active')
    })

    if(type === 'sobe'){
        places.appendChild(placesContainers[0])
        ativo = placesContainers[1]
        ativo.classList.add('animating')
    }else{
        places.prepend(placesContainers[placesContainers.length-1])
        ativo = placesContainers[placesContainers.length-1]
        ativo.classList.add('animating')
    }

    ativo.classList.add('active')
    updateName()
    setTimeout(() => {
        ativo.classList.remove('animating')
        ativo.classList.remove('animating')
    }, 2000);
}

const cityDiv = document.querySelector('#cityTitle')

function updateName(){
    cityDiv.innerHTML = ''
    const activeCity = document.querySelector('.active .title')
    cityDiv.innerHTML = `Fall in Love with ${activeCity.textContent}`
}


//FORM
const passportSection = document.querySelector('.imgContactContainer')
const passportDiv = document.querySelector('.passport')
const passportInfoSec = document.querySelector('.passportInfo')
const postCardDiv = document.querySelector('.postCardDiv')

async function showFormRes(e){
    e.preventDefault()
    passportInfoSec.innerHTML = ``
    postCardDiv.innerHTML = ``
    
    let name = getFormName()
    if(!name) return

    let email = getFormEmail()
    if(!email) return

    let gender = getGender()
    if(!gender) return

    let passportId = getPassportId()

    let {birthday, age} = getFormBirthday()
    if(!birthday) return

    let {nationality,flag} = await getCountryInfo()
    if(!nationality) return

    let destinations = getFormDestinations()
    if(!destinations) return

    let avatar = getFormAvatar()
    
    //mostrar passporte
    passportInfoSec.innerHTML = `
    <div>Name: ${name}</div>
    <div>Passport number: ${passportId}</div>
    <div>Birthday: ${birthday} / Age: ${age}</div>
    <div>Gender: ${gender}</div>
    <div>Email: ${email}</div>
    <div>Nationality: ${nationality} <img id='passportFlag' src="${flag}" alt="Country Flag"></div>
    <div>Stops: ${destinations}</div>
    ` 

    //cria cartoes postais
    if(destinations.includes('New York ')){
        const nyPostCard = document.createElement('img')
        nyPostCard.src = './img/postcards/newyorkPC.jpg';
        postCardDiv.appendChild(nyPostCard)
    }

    if(destinations.includes('Bali ')){
        const baliPostCard = document.createElement('img')
        baliPostCard.src = './img/postcards/baliPC.jpg';
        postCardDiv.appendChild(baliPostCard)
    }

    if(destinations.includes('Paris ')){
        const parisPostCard = document.createElement('img')
        parisPostCard.src = './img/postcards/parisPC.jpg';
        postCardDiv.appendChild(parisPostCard)
    }

    if(destinations.includes('Rome ')){
        const romePostCard = document.createElement('img')
        romePostCard.src = './img/postcards/romePC.jpg';
        postCardDiv.appendChild(romePostCard)
    }

    if(destinations.includes('Venice ')){
        const venicePostCard = document.createElement('img')
        venicePostCard.src = './img/postcards/venicePC.jpg';
        postCardDiv.appendChild(venicePostCard)
    }

    if(avatar){
        const userAvatar = document.createElement('img')
        userAvatar.src = avatar;
        passportInfoSec.prepend(userAvatar);
    }else{
        const userAvatar = document.createElement('img')
        userAvatar.src = 'img/noAvatar.jpg';
        passportInfoSec.prepend(userAvatar);
    }

    passportSection.style.display = 'block'
}

//pegar nome
const nameInput = document.querySelector('#name')
function getFormName(){
    nameInput.style.border = 'none'
    let name = nameInput.value

    if(!name){
        alert('Fill in the name')
        nameInput.style.border = '2px solid red'
        nameInput.focus()
        return null
    }else{
        return name
    }
}

//pegar email
const emailInput = document.querySelector('#email')
function getFormEmail(){
    emailInput.style.border = 'none'
    let email = emailInput.value

    if(!email){
        emailInput.style.border = '2px solid red'
        alert('Fill in the email')
        emailInput.focus()
        return null
    }else{
        return email
    }
}

//gerar número passaporte
function getPassportId(){
    let passportId = Math.floor(Math.random() * 10000) + 10000
    return passportId
}

//pegar data nascimento e idade
const birthdayInput = document.querySelector('#birthday')
function getFormBirthday(){
    birthdayInput.style.border = 'none'
    let birthday = birthdayInput.value
    let today = new Date().toLocaleDateString('en-CA')

    if(!birthday || birthday >= today){
        birthdayInput.style.border = '2px solid red'
        alert('Birthday invalid')
        return null
    }else{
        let age = parseInt(today) - parseInt(birthday)
        if(age < 1){
            age = 1
        }
        return {birthday,age}
    }
}

//pegar genero
const genderOptions = document.querySelector('#gender')
function getGender() {
    genderOptions.style.border = 'none'
    let gender = genderOptions.options[genderOptions.selectedIndex].text
    if(gender === 'Gender'){
        genderOptions.style.border = '2px solid red'
        alert('Select your gender')
        gender = null
    }else{
        return gender
    }
}

//pegar info pais
const nationalityOptions = document.querySelector('#country')
async function getCountryInfo(){
    let nationality = nationalityOptions.options[nationalityOptions.selectedIndex].text

    if(nationality === 'Nationality'){
        nationalityOptions.style.border = '2px solid red'
        alert('Choose your nationality')
        nationality = null
    }else{
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countries = await response.json()
        const country = countries.find(c=> c.name.common === nationality)
        const flag = country.flags.png
        const response2 = await fetch(flag);
        const blob = await response2.blob();
        const reader = new FileReader();
        reader.readAsDataURL(blob);

        await new Promise(resolve => reader.onloadend = resolve);

        const flagBase64 = reader.result
        return { nationality, flag: flagBase64 };

    }
}

//pegar destinos
const destinationsCheckBoxes = document.querySelectorAll('.checkOptions input[type="checkbox"]')
const checkOptionsContainer = document.querySelector('.checkOptions')
function getFormDestinations(){
    let selectedDestinatons = []
    destinationsCheckBoxes.forEach((checkbox) =>{
        if(checkbox.checked){
            selectedDestinatons.push(`${checkbox.name} `)
        }
    })

    if(selectedDestinatons.length === 0){
        checkOptionsContainer.style.border = '1px solid red'
        alert('select at least one destination')
        return null
    }else{
        console.log(selectedDestinatons)
        return selectedDestinatons 
    }
    
}

//pegar avatar
let imageURL =''
const fileInput = document.querySelector('#userAvatar')
const fileNameDisplay = document.getElementById('fileName')

fileInput.addEventListener('change',(event)=>{
    const file = event.target.files[0]

    if(file){
        const reader = new FileReader()
        fileNameDisplay.textContent = fileInput.files[0].name
        reader.onload = function(e){
            imageURL = e.target.result
        }

        reader.readAsDataURL(file)
    }
})

function getFormAvatar(){
    return imageURL
}

//carregar paises
async function loadCountries(){
    try{
        const response = await fetch('https://restcountries.com/v3.1/all')
        const countries = await response.json()
        console.log(countries)
        
        const countrySelect = document.querySelector('#country')

        countries.forEach(country =>{
            const option = document.createElement('option')
            option.value = country.name.common
            option.textContent = country.name.common
            countrySelect.appendChild(option)
        })
    }catch(error){
        console.error('could not load countries',error)
    }
}

//permite salvar o passporte
const savePassportBtn = document.querySelector('#saveAsImage')
const passportSecImg = document.querySelector('.passport')

savePassportBtn.addEventListener('click',()=>{
    html2canvas(passportSecImg).then(canvas =>{
        const link = document.createElement('a')
        link.download = 'passport.png'
        link.href = canvas.toDataURL()
        link.click()    
    }).catch(err =>{
        console.log('error capturing your passport', err)
    })
})

window.onload = loadCountries


//pegar clique
const formBtn = document.querySelector('#formBtn')
formBtn.addEventListener('click', showFormRes)
