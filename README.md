# FullTable Reviews Module
Reviews backend for a restaurant booking app similar to OpenTable

## Related Projects

  - https://github.com/fulltable

## Table of Contents

1. Usage
1. CRUD API
1. Requirements
1. Development
1. Installing Dependencies

## Usage
#### Starting Server
 - `npm start` to start your server (set up to run on port 3001)
 #### Seeding a Postgres Database
 - Create csv files for the `users`, `restaurants`, and `reviews` tables by running `npm run generate-data:pg`
 - Insert the csv file into your postgres db:
   - In the postgres shell, connect to your database with `\c [database_name]`
   - Copy the relevant csv file into your table with `\copy [table_name] FROM 'path/to/file.csv' WITH DELIMITER '[insert your delimiter]'`
 - Note: The largest table will be approx 5GB with the provided seeding script so ensure you have space on your computer and you delete the csv file once you have transferred it into your database
## CRUD API
#### Create 
Write a review for a restaurant with a `POST` request to `api/restaurants/[restaurant_id]`. Place your review in the body of the request using the following parameters:
 - user_id: number
 - overall_score: number (1-5)
 - food_score: number (1-5)
 - service_score: number (1-5)
 - ambience_score: number (1-5)
 - value_score: number (1-5)
 - date_dined: date
 - review: string
 - user_recommended: boolean

Note: Request body must be type `application/json`

#### Read
Fetch all the reviews for a restaurant with a `GET` request to `api/restaurants/[restaurant_id]`.

#### Update
Change a review with a `PATCH` request to `api/reviews/[review_id]`.
In JSON format, pass into the request body any of the review parameters you want to change.

#### Delete
Remove a review with a `DELETE` request to `api/reviews/[review_id]`.

## Requirements

## Development

## Installing Dependencies

From within the root directory:

```sh
npm install
```



