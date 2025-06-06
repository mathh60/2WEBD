# Metropolitan Museum of Art

## Project Overview:
This project involves developing a user interface for an art collection using data from the MET (Metropolitan Museum of Art). The goal is to create a user-friendly platform allowing users to explore artworks, search for specific objects, and access detailed information about each piece in the collection.

## Features:
- **Quick Search**: Allows users to quickly search for objects by keywords. Available on all application pages.
- **Advanced Search**: Enables more precise search using advanced filters such as department, author, date, etc. Accessible from a dedicated page.
- **Display Featured Items**: Presents a selection of highlighted artworks on the homepage. Based on a specific API search.
- **Display Object Details**: Allows users to access a detailed page for each object. Displays information such as image, title, author, department, date, etc.

## Technologies Used:
- **React.js**: JavaScript library for building user interfaces.
- **TypeScript**: Superset of JavaScript offering optional static typing.
- **React Router**: For navigation through different application pages.
- **Axios**: For making HTTP requests to the MET API.
- **CSS3**: For styling and formatting the user interface.
- **GitHub**: For source code management and collaboration.

## Prerequisites:
Before getting started, make sure you have the following tools installed on your machine:
- Node.js (version 12 or higher)
- npm (version 6 or higher)

## Installation:
1. Clone the project repository:
git clone https://github.com/mathh60/2WEBD
2. Navigate to the project directory:
cd 2webd(nom du projet)
3. Install the necessary dependencies:
npm install
## Usage:
- On the homepage, use the quick search bar to find objects by keywords.
- Access the advanced search page for more specific searches using filters.
- Explore featured items to discover selected artworks.
- Click on an object to access its detailed page and get more information about it.

## Directory Structure:
src/ : Main directory of your source code.

  App.css : Style file for the root component of the application.

  App.tsx : Main component of the application, acting as the entry point.

  Components/ : Directory to store reusable components of the application.

    AdvancedSearchForm.tsx : Component for the advanced search form.

    DisplayHighlightContent.tsx : Component for displaying featured content.

    Menu.css : Style file for the menu component.

    Menu.tsx : Component for the application menu.

    SearchResults.tsx : Component for displaying search results.

    Type.ts : File containing TypeScript types used in the application.

  Page/ : Directory to store page components of the application.

    AdvancedSearch.tsx : Page for advanced search.

    DisplayHighlight.tsx : Page for displaying featured content.

    MuseumObjectPage.tsx : Page for displaying details of a museum object.

    ObjectDeatilPage.css : Style file for the object details page.

    ObjectDetailsPage.tsx : Page for displaying details of a specific object.

  Query/ : Directory to store files related to API requests and data.

    advancedSearch.ts : Function to perform advanced search in the API.

    fetchArtObject.ts : Function to fetch art objects from the API.

    MuseumObjectQuery.ts : Query to query museum objects in the API.

    searchArtObjects.ts : Function to perform object search in the API.

    useObjectDetailQuery.ts : Custom hook to fetch details of an object from the API.

  index.css : Global style file for the application.
  
  main.tsx : Main entry point of the application, used to render the root component.
