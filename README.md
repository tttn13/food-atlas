# Food Atlas
### [Live Demo](https://appetize.io/embed/3thpf131k155y89f0dh4c77j38?device=iphone8&osVersion=13.7&scale=75)
Food Atlas is an online directory for discovering local food business ranging from bars, restaurants, cafes and so on. The default location is San Francisco, USA. The app is built with React Native and the Yelp API. 

## Screenshots
### Home Screen
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/homepage.png' width = "284" height= '555'>

### Restaurant Screen
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rpage1.png' width = "284" height= '555'>
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rpage2.png' width = "284" height= '555'>
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rpage3.png' width = "284" height= '555'>

## Technologies

- Framework for building front end: `React Native`
- Making API calls from the [YELP API](https://fusion.yelp.com/) 
- Custom hooks to fetch data when components mount 
- Promise based HTTP client for the browser: `axios`
- Navigating between different screens: `react-navigation` and `react-navigation-stack`
- Loading environment variables from .env file: `react-native-dotenv`
- The library for icons: `react-native-vector-icons`
- MapView component from module `react-native-maps`
- Runtime environment for JS: `Node.js `

## Key Features
- Choose from a food category or search for a particular food or business
- Sort the results
- Switch to restaurant screen when clicking on the restaurant detail 
- Redirect to external sites or functionality when users click on relevant text or icon    
- Loading spinners for relevant fetching processes
- Deployed to iOS Simulator 

## Functionality

### Find local restaurants
- A list of 15 businesses will be shown on the home page when users choose a food catagory or look up a specific food group/restaurant.
- Users can sort the results by popular, rating, price(low-high), price(high-low) 

### Navigate users to the restaurant page 
- Users can view up to 3 reviews and 3 photos for each restaurant (the YELP API limitation)


### Navigate to external sites or corresponding phone functionality
- Redirect users to google maps when clicking on View Map/Get Directions, make phone calls when clicking on Call/Phone icon, redirect to the official Yelp business page when clicking on the page URL/Website icon

- Users can copy and share the the business Yelp link, or message a friend 


<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/create-post.gif' width = "600" height= '500'>

<img src='https://github.com/tttn13/social-app/blob/develop/api/client/public/assets/screenshots/edit-post.gif' width = "600" height= '500'>




## Usage

#### Env variables:

Set a `.env` file in server directory and add the following:

```
REACT_APP_YELP_API_KEY = "Your YELP API Key"

```

