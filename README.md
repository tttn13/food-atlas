# Food Atlas
### [Live Demo](https://appetize.io/embed/r3t39d70v0a8e7ag2gfduzrrq0?device=iphone8&osVersion=13.7&scale=75)
Food Atlas is a mobile app that serves as an online directory for discovering local food businesses ranging from bars, restaurants, cafes and so on. The default location is San Francisco, USA. The app is built with React Native and the Yelp API. 

## Screenshots
### Home Screen
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/hp.png' width = "284" height= '555'>

### Restaurant Screen
<p float="left">

<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rp1.png' width = "222" height= '449'>
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rp2.png' width = "222" height= '449'>
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/rp3.png' width = "222" height= '449'>

</p>

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
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/category.gif' width = "222" height= '449'>

- Users can sort the results by popular, rating, price(low-high), price(high-low) 

<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/sort.gif' width = "222" height= '449'>

### Navigate users to the restaurant page 
- Users can view up to 3 reviews and 3 photos for each restaurant (the YELP API limitation)
- Users can click on Read more to see the whole content of the review (can only display part of the review due to the YELP API limitation)
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/reviews.gif' width = "222" height= '449'>


### Navigate to external sites or corresponding phone functionality
- Redirect users to google maps when clicking on View Map/Get Directions, make phone calls when clicking on Call/Phone icon, redirect to the official Yelp business page when clicking on the page URL/Website icon
<p float="left">

<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/viewmap.gif' width = "222" height= '449'>
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/getdir.gif' width = "222" height= '449'>
</p>
- Users can copy and share the the business Yelp link, or message a friend 
<img src='https://github.com/tttn13/food-atlas/blob/main/assets/readme/gifs/photosbelow.gif' width = "222" height= '449'>



## Usage

#### Env variables:

Set a `.env` file in server directory and add the following:

```
REACT_APP_YELP_API_KEY = "Your YELP API Key"

```

