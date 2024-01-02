// Your array of project data: name, image URL, category
/* import { projectData } from './gallery_items.js' */
const galleryList = document.getElementById("image-gallery").getAttribute("gallery-list");
let projectData = [];

fetch(galleryList)
    .then(response => response.json())
    .then(data => {
        projectData = data.projectData;
        execFunctions(); // A new function to execute all gallery-related functions
    });

function execFunctions() {
    // Place all your gallery-function calls previously
    // outside fetch() here, e.g., createCategoryFilters(), filterByCategory(), etc.
	createCategoryFilters();
	filterByCategory();
	createPaginationControls();
}

  let currentPage = 1;
  const itemsPerPage = 12; // You can change this value
  let currentCategory = 'All';
  
  function createImageGrid(data) {
	const grid = document.getElementById('gallery-grid');
	grid.innerHTML = '';
  
	for (const project of data) {
	  const imgWrapper = document.createElement('div');
	  imgWrapper.setAttribute('class', 'card flex_medium');
	  imgWrapper.innerHTML = `<img src="${project.imageUrl}" alt="${project.name}">`;
	  imgWrapper.addEventListener('click', () => showModal(project.imageUrl, project.name));
	  grid.appendChild(imgWrapper);
	}
  
	// Custom-layout code to make the grid responsive (CSS Grid, Flexbox, etc.)
  }
  
  function filterByCategory() {
	const filteredData = currentCategory === 'All'
	  ? projectData
	  : projectData.filter(project => project.category === currentCategory);
  
	const paginatedData = filteredData.slice((currentPage - 1) *itemsPerPage, currentPage* itemsPerPage);
	
	// Update pagination controls before creating grid
	createPaginationControls(filteredData.length);
	createImageGrid(paginatedData);

	// Highlight active category button
	const filterButtons = document.querySelectorAll("#filters button");
	for (const button of filterButtons) {
		if (button.innerText === currentCategory) {
		  button.classList.add("active");
		} else {
		  button.classList.remove("active");
		}
	}	
  }
  
function createCategoryFilters() {
	const categories = [...new Set(projectData.map(project => project.category))];
  
	const filtersDiv = document.getElementById('filters');
	const allButton = document.createElement('button');
  
	allButton.innerText = 'All';
	allButton.addEventListener('click', () => {
	  currentCategory = 'All';
	  currentPage = 1;
	  filterByCategory();
	});
  
	filtersDiv.appendChild(allButton);
  
	for (const category of categories) {
	  const button = document.createElement('button');
  
	  button.innerText = category;
	  button.setAttribute('data-filter', category);
  
	  button.addEventListener('click', () => {
		currentCategory = category;
		currentPage = 1;
		filterByCategory();
	  });
  
	  filtersDiv.appendChild(button);
	}
}
  
function createPaginationControls() {
	const paginationDiv = document.getElementById('pagination');
  
	// Calculate the total number of pages based on itemsPerPage and filtered data
	const filteredData = currentCategory === 'All'
	  ? projectData
	  : projectData.filter(project => project.category === currentCategory);
	const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  
	// Clean up the pagination controls div
	paginationDiv.innerHTML = '';
  
	// Loop through the total pages and create a button for each one
	for (let i = 1; i <= totalPages; i++) {
	  const pageButton = document.createElement('button');
  
	  pageButton.innerText = i;
	  pageButton.setAttribute('data-page', i);
  
	  // Add a click event listener to each button to handle changing pages
	  pageButton.addEventListener('click', (event) => {
		currentPage = event.target.getAttribute('data-page');
		filterByCategory();

		// Highlight active page button
		const pageButtons = document.querySelectorAll("#pagination button");
		for (const button of pageButtons) {
		  if (button.getAttribute('data-page') === currentPage) {
			button.classList.add("active");
		  } else {
			button.classList.remove("active");
		  }
		}

		window.scrollTo(0, 0); // Scroll to the top of the page after changing pages
		});
  
	  // Add the new button to the pagination controls div
	  	paginationDiv.appendChild(pageButton);

	  // Highlight the active button on page load (for the first button)
		if (i == currentPage) {
			pageButton.classList.add("active");
		}
	}
}

const leftArrow = document.createElement('span');
leftArrow.innerHTML = '❮';
leftArrow.className = 'left-arrow';
const rightArrow = document.createElement('span');
rightArrow.innerHTML = '❯';
rightArrow.className = 'right-arrow';

document.getElementById('image-modal').appendChild(leftArrow);
document.getElementById('image-modal').appendChild(rightArrow);

function showModal(imageUrl, imageName) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const captionText = document.getElementById('caption');

    // Replace 'thumbnail' with 'full' in the imageUrl
    let fullImageUrl = imageUrl.replace('thumbnails', 'full');

    modalImg.src = fullImageUrl;
    captionText.innerHTML = imageName;

	// Define current image index in showModal() so it can be accessed by navigateImages()
    currentImageIndex = getFilteredData().findIndex(project => project.imageUrl === imageUrl);

    modal.style.display = 'block';

    const span = document.getElementsByClassName('close')[0];
    span.onclick = () => {
      modal.style.display = 'none';
    };

    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

	leftArrow.onclick = () => {
		navigateImages(-1);
	};

	rightArrow.onclick = () => {
		navigateImages(1);
	};
}

let currentImageIndex;  // This will keep track of the current image index in the filtered data

function navigateImages(step) {
	const filteredData = getFilteredData();
	currentImageIndex = (currentImageIndex + step + filteredData.length) % filteredData.length;
	const newProject = filteredData[currentImageIndex];
	showModal(newProject.imageUrl, newProject.name);
}

function getFilteredData() {
    return currentCategory === 'All'
      ? projectData
      : projectData.filter(project => project.category === currentCategory);
}

