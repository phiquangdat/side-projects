const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const ALL_RESTAURANTS = require("./restaurants").restaurants;

/**
 * A list of starred restaurants.
 * In a "real" application, this data would be maintained in a database.
 */
let STARRED_RESTAURANTS = [
  {
    id: "a7272cd9-26fb-44b5-8d53-9781f55175a1",
    restaurantId: "869c848c-7a58-4ed6-ab88-72ee2e8e677c",
    comment: "Best pho in NYC",
  },
  {
    id: "8df59b21-2152-4f9b-9200-95c19aa88226",
    restaurantId: "e8036613-4b72-46f6-ab5e-edd2fc7c4fe4",
    comment: "Their lunch special is the best!",
  },
];

/**
 * Feature 6: Getting the list of all starred restaurants.
 */
router.get("/", (req, res) => {
  /**
   * We need to join our starred data with the all restaurants data to get the names.
   * Normally this join would happen in the database.
   */
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map(
    (starredRestaurant) => {
      const restaurant = ALL_RESTAURANTS.find(
        (restaurant) => restaurant.id === starredRestaurant.restaurantId
      );

      return {
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant.name,
      };
    }
  );

  res.json(joinedStarredRestaurants);
});

/**
 * Feature 7: Getting a specific starred restaurant.
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  // Find the starred restaurant by id
  const starredRestaurant = STARRED_RESTAURANTS.find(
    (restaurant) => restaurant.id === id
  );

  // If the starred restaurant doesn't exist, send 404
  if (!starredRestaurant) {
    res.sendStatus(404);
    return;
  }

  // Find the restaurant details from ALL_RESTAURANTS
  const restaurant = ALL_RESTAURANTS.find(
    (restaurant) => restaurant.id === starredRestaurant.restaurantId
  );

  // Create the response object with the required fields
  const response = {
    id: starredRestaurant.id,
    comment: starredRestaurant.comment,
    name: restaurant.name,
  };

  res.json(response);
});

/**
 * Feature 8: Adding to your list of starred restaurants.
 */
router.post("/", (req, res) => {
  const { restaurantId, comment } = req.body;

  // Find the restaurant in ALL_RESTAURANTS to verify it exists
  const restaurant = ALL_RESTAURANTS.find(
    (restaurant) => restaurant.id === restaurantId
  );

  // If the restaurant doesn't exist, send 404
  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  // Generate a unique id for the new starred restaurant
  const newId = uuidv4();

  // Create a record for the new starred restaurant
  const newStarredRestaurant = {
    id: newId,
    restaurantId,
    comment,
  };

  // Push the new record into STARRED_RESTAURANTS
  STARRED_RESTAURANTS.push(newStarredRestaurant);

  // Set success status code and send the restaurant data
  res.status(201).json({
    id: newStarredRestaurant.id,
    comment: newStarredRestaurant.comment,
    name: restaurant.name,
  });
});

/**
 * Feature 9: Deleting from your list of starred restaurants.
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const newListOfRestaurants = STARRED_RESTAURANTS.filter(
    (restaurant) => restaurant.id !== id
  );

  if (STARRED_RESTAURANTS.length === newListOfRestaurants.length) {
    res.sendStatus(404);
    return;
  }

  STARRED_RESTAURANTS = newListOfRestaurants;
  res.sendStatus(200);
});

/**
 * Feature 10: Updating your comment of a starred restaurant.
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const restaurant = STARRED_RESTAURANTS.find(
    (starredRestaurant) => starredRestaurant.id === id
  );

  if (!restaurant) {
    res.sendStatus(404);
    return;
  }

  const { comment } = req.body;
  restaurant.comment = comment;
  res.status(200).json(restaurant);
});
module.exports = router;
