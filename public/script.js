const cards = document.querySelectorAll('.card'),
  currentPage = location.pathname,
  formDelete = document.querySelector('#form-delete'),
  chefsAdmin = document.querySelectorAll('.chef.item a'),
  chefsUser = document.querySelectorAll('.card_chef'),
  navegationsAdmin = document.querySelectorAll('#header-admin a'),
  navegationsUser = document.querySelectorAll('.navegacao a')

for (let item of navegationsAdmin) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('adminActive')
  }
}

for (let item of navegationsUser) {
  if(currentPage.includes(item.getAttribute('href'))) {
    item.classList.add('userActive')
  }
}

for(let card of cards){
  card.addEventListener('click', function () {
    const idCard = card.getAttribute('id')
    window.location.href = `/recipes/${idCard}`
  })
}

if (chefsAdmin) {
  for (let chef of chefsAdmin) {
    const idChef = chef.getAttribute('id')
    window.location.href = `/admin/chefs/${idChef}`
  }  
}

function addIngredient () {
  const ingredients = document.querySelector('#ingredients')
  const ingredient = document.querySelectorAll('#ingredients input')
  const newIngredient = ingredient[ingredient.length - 1].cloneNode(true)
  if (newIngredient.value == "") return false     
  newIngredient.value = ""
  ingredients.appendChild(newIngredient)
}
function addPreparation () {
  const preparations = document.querySelector('#preparations')
  const preparation =  document.querySelectorAll('#preparations input')
  const newPreparation = preparation[preparation.length - 1].cloneNode(true)
  if(newPreparation.value == "") return false
  newPreparation.value = ""
  preparations.appendChild(newPreparation)   
}
if(document.querySelector('.add-ingredient')){
  document.querySelector('.add-ingredient').addEventListener('click', addIngredient)
}
if(document.querySelector('.add-preparation')){
  document.querySelector('.add-preparation').addEventListener('click', addPreparation)
}
if(formDelete){
  formDelete.addEventListener('submit', function (event) {
    const numberRecipes = Number(document.getElementById('countRecipes').innerHTML)
    const confirmation = confirm('Deseja excluir?')
    if (!confirmation) {
      event.preventDefault()
    }
    else {
      if(numberRecipes > 0) {
        alert('Chef possui receitas e não pode ser deletado!')
        event.preventDefault()
      }
    }
  })
}

let chefId= window.location.pathname.split("/")[3],
  windowLocation= window.location.pathname
  
const PhotosUpload = {
  input: '',
  imageRecipeLimit: 5, 
  imageChefLimit: 1,
  preview: document.querySelector('#photos-preview'),
  files: [],
  createLocation: "/admin/chefs/create",
  editLocation: `/admin/chefs/${chefId}/edit` ,
  handleImageInput(event) {
    const {files: fileList} = event.target
    PhotosUpload.input = event.target

    if(PhotosUpload.hasLimit(event)){
      PhotosUpload.updateUploadFiles()

      return
    }
    Array.from(fileList).forEach(file => {
      PhotosUpload.files.push(file)
      const reader = new  FileReader()
      
      reader.onload = () => {
        const image = new Image()
        image.src = String(reader.result)
        
        const div = PhotosUpload.getContainer(image)

        if(this.editLocation != windowLocation && windowLocation != this.createLocation) {
          PhotosUpload.preview.appendChild(div)
        }
        console.log(div) 
      }
        reader.readAsDataURL(file)
    }) 
      
    PhotosUpload.updateUploadFiles()
  },
  hasLimit(event){
    const {imageRecipeLimit, input, preview, imageChefLimit} = PhotosUpload
    const {files: fileList} = input
    
    if(this.editLocation == windowLocation || windowLocation == this.createLocation) {
      if(fileList.length > imageChefLimit) {
        alert(`Envie no máximo ${imageChefLimit} fotos.`)
        event.preventDefault()
        return true
      }
      
      return false
      
    }
    
    if(this.editLocation != windowLocation || windowLocation != this.createLocation) {

      if(fileList.length > imageRecipeLimit) {
        alert(`Envie no máximo ${imageRecipeLimit} fotos.`)
        event.preventDefault()
        
        return true
      }
      let photosDiv = []
      preview.childNodes.forEach(item => {

        if(item.classList && item.classList.value == "photo")
          photosDiv.push(item)
      })

      const totalPhotos = fileList.length + photosDiv.length
      if(totalPhotos > imageRecipeLimit) {
        alert(`Você atingiu o limite máximo de fotos.`)
        event.preventDefault()

        return true
      }

      return false
    }

  },
  getAllFiles() {
    const dataTrasnfer = new ClipboardEvent("").clipboardData || new DataTransfer

    PhotosUpload.files.forEach(file => {
      return dataTrasnfer.items.add(file)
    })

    return dataTrasnfer.files
  },
  getContainer(image) {
    const div = document.createElement("div")

    div.classList.add("photo")
    if(this.editLocation != windowLocation && windowLocation != this.createLocation) {

      div.onclick = PhotosUpload.removePhoto
      div.appendChild(PhotosUpload.getRemoveButton())
    }
    div.appendChild(image)
    return div
  },
  getRemoveButton() {
    const button = document.createElement("i")

    button.classList.add('material-icons')
    button.innerHTML = 'close'

    return button
  },
  removePhoto(event) {
    const photoDiv = event.target.parentNode //<div class="photo">

    const photosArray = Array.from(PhotosUpload.preview.children)
    const newFiles = photosArray.filter(file => {
      if (file.classList.contains("photo") && !file.getAttribute('id')) return true
    })
    const index = newFiles.indexOf(photoDiv)
    PhotosUpload.files.splice(index, 1)

    PhotosUpload.updateUploadFiles()

    photoDiv.remove()
  },
  removeOldPhoto(event) {
    const photoDiv = event.target.parentNode 
    if(photoDiv.id) {
      const removedFiles = document.querySelector('input[name="removed_files"]')
    
      if(removedFiles) {
        removedFiles.value += `${photoDiv.id},`
      }
    }

    photoDiv.remove()
  },
  updateUploadFiles() {

    PhotosUpload.input.files = PhotosUpload.getAllFiles()
  }
}

const ImageGallery = {
  previews: document.querySelectorAll('.images-gallery img'),
  imagePrimery: document.querySelector('.images-container #image-recipe > img'),
  setImage(e) {
    const {target} = e
    
    ImageGallery.previews.forEach(preview => preview.classList.remove('active'))

    target.classList.add('active')

    ImageGallery.imagePrimery.src = target.src
  }

}