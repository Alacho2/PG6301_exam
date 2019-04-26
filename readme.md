Exam in PG6301 at Høyskolen Kristiania.

Test user: `Chef - lok`

Link: http://localhost:8080/

####Intro
This was quite a task, I didn't actually expect I'd pull off as much as I did, but here I am.
The project is almost finished (see missing functionality section). This project is written from 
scratch in React and Node.js, with the help of Express (for server functionality), 
passport (for authentication/authorization), babel, webpack, and jest/enzyme for testing.
It also consists of smaller modules to achieve some special functionality like Lodash and Linkify.
Files that have been gotten from the course content have been marked.

Time period: 48 hours.

#####Structure
Up until the live chat, everything is implemented as described in the chat. Before the user 
signs up, they do not see any form of information under /profile?id=Chef and not under posts.
They are also not able to ask for friendship or see similar. If the user is signed in, they immediately see their
own posts and their friends' posts and incoming friend requests. A logged in user can also search through all users. This is triggered by writing and then clicking enter.
No search will be performed unless you click enter.
The user can also post links to their favorite websites in a post. This will automatically be converted to links through Linkify,
which takes care of necessary stripping and escaping. At my current level, I thought it would be wise to entrust
such an important task to better and wiser people.
The search is automatically cleared if the user doesn't click on anything within 5 seconds
See extras for more functionality. As said, apart from the live chat, all other requested functionality should be there.

The following commands are in the project
* `yarn test` - This runs test coverage on the files
*  ``yarn dev`` - This starts both the client and the server to do development
* `yarn build` - This builds the project for production. The limit of the project is lower than the bundle.js-file. This is something I have chosen to not change.
* `yarn watch:client` - This boots up the client for development
* `yarn watch:server` - This boots up the server with the help of Nodemon for development.
* `yarn start` - This will start the server with regularly with node.

####Starting the application
```
yarn install
```

```
yarn test
```

```
yarn dev
```



Here are images of the project structure and the logged in version. Notice the Chef user.
![Project structure](https://i.imgur.com/lNC7tcA.png)

![Loggeed in](https://i.imgur.com/RH0ulEG.png)

NOTE! Node is a notorious hog on the last four commands. Be sure to run cmd/ctrl+c in your console between them.
If you see errors, be sure to run kill node before trying again.

####Test data
Immediately upon the creation of the system, two users are made as dummy accounts. One to be tested and one to provide 
data for the tested user. You may sign in with the main, which is `Chef`. His password should be `lok`, but you may find his creation in the userRepo.js-file.



####Testing
I have 53.41% coverage as of 04:51 am Friday morning. I do also include some other tests that are not
run through `yarn test`, but I could not make them work, so I decided to leave them out.

![Test coverage](https://i.imgur.com/gN3Flvu.png)



####Extras

* Link to Profile in feed
* Can't send more friend requests than one to each user
* Get displayed information of the websocket which is in use

In order to handle the 10th requirements, links in a message, 
I decided to use the module Linkify. It's a powerful piece of software that helps 
render a link and strip of potential problems. It is a dangerous thing to trust user input,
that is why I felt it was okay to use a pre-written module


###Evaluation
Overall, I must say that I'm pretty proud of myself. I had never thought I would have 
managed to implement such functionality. I know I didn't meet all requirements, but I learned a lot and did some simple extras. 
With so many functioning parts, I think it's quite an accomplishment to have written a small version of facebook in 48 hours.
I've followed must clean code-principles, within the time frame, and kept it as simple as possible
If I were to grade myself, I feel I deserve a **B**.

##Missing functionality
* The live chat - I had an okay implementation of it, but only based upon all users and not friends. I therefor decided to leave this out.

Remember to mention the ask for friendship + it being cleared if one of the users accept