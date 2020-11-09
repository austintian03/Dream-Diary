
# Dream Diary (name pending)

## Overview

Dream Diary is a web app that allows users to record memories of their dreams all into one place. After a user registers for an account and logs in, they can create dream entries. Each dream entry will include the date, the actual memory of the dream itself in text, and any associations or thoughts the user has with that dream.

Once dream entries have been added, the home page (assuming the user is logged in) will prominently display the most recent (number of entries pending) dream entries.



## Data Model
The application will store Users and Dreams

* users can have multiple dreams (by reference)

An Example User:

```javascript
{
  username: "dreamydavid",
  hash: // a password hash,
  lists: // an array of references to Dream documents
}
```

An Example Dream:

```javascript
{
  user: // a reference to a User object
  date: //A JavaScript Date object
  dream: "I was being chased by a bear because I was covered in honey. But then I ran into a tree that teleported me high up in the sky. Instead of plummeting to Earth, I floated slowly down, catching parts of clouds to eat as cotton candy. When I finally touched the ground I woke up.", //a string that represents the dream
  thoughts: "maybe the bear chasing me is a sign of my anxiety", //not required on initial entry, can be added later
}
```


## [Link to Commented First Draft Schema](db.js) 

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/ - registration and login page

![home](documentation/home.png)

/dreams - displays most recent dream entries at top, table of dream entries, and button to record a dream entry

![dreams](documentation/dreams.png)

/dreams/record - page for showing all shopping lists

![dreams record](documentation/dreams-record.png)

/dreams/slug - page for showing specific shopping list

![dreams slug](documentation/dreams-slug.png)

## Site map

![site map](documentation/site-map.png)

## User Stories or Use Cases

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can record a new dream
4. as a user, I can view all my recorded dreams in one page
5. as a user, I can view any specific dream in its own page
6. as a user, I can edit my thoughts on any specific dream

## Research Topics

* (5 points) Integrate user authentication
    * use passport for user authentication

* (2 points) Bootstrap
    * use Bootstrap as a CSS framework

* (1/2 points) Heroku
    * use Heroku for deployment

8/9 points total out of 8 required points


## [Link to Initial Main Project File](app.js) 

## Annotations / References Used

1. [Headless Chrome tutorial](https://developers.google.com/web/updates/2017/06/headless-karma-mocha-chai)

2. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)

3. [bootstrap docs](https://getbootstrap.com/docs/4.5/getting-started/introduction/) - (add link to bootstrap configuration)
