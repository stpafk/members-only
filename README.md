# members-only
Exclusive (D Double E voice) clubhouse where your members can write anonymous posts.

[Live Preview](https://mini-message-board-q4av.onrender.com/)

![image](https://github.com/stpafk/members-only/assets/117909784/76800958-24d8-4c59-afd5-40b561a9b4bc)

## About 

This project is a glance on auth, cookies and sessions and how to use these for privileges and private stuff. For example, users with no account can see posts, but can't interact or see who posted it.
Also, this project includes an "special" user whom can act like an admin on the website, deleting from posts to users; this "special user" feature is gained by contributing - fake money - into the website. 

In this project, we can:

* Log in and Register an account.
* Read, create and delete posts.
* "Contribute" to the website.
* Become an administrator and get special features.

## Built with

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![Passport](https://a11ybadges.com/badge?logo=passport)
* ![Pug](https://a11ybadges.com/badge?logo=pug)

## Getting Started

Here's how to run this project locally

### Prerequisites 

First, you should have Node, Git (if you use Linux, it's already installed.) and an Atlas dabatase set up.

* [Get Node here.](https://nodejs.org/en)
* [Get Git here](https://git-scm.com/).
* [Atlas MongoDB](https://www.mongodb.com/atlas/database)

### Installation 

Clone the repo

   ```sh
   git clone https://github.com/stpafk/members-only
   ```

Install NPM packages

  ```sh
   npm install 
   ```

Create a `.env` file with a variable called MONGO like this:

 ```sh
 MONGO = "mongodb+srv://<username>:<password>@<cluster>.<key>.mongodb.net/?retryWrites=true&w=majority"
 ```
 
Run the application:

```sh
npm run dev
```

## Roadmap

- [X] Set up database: Users and Messages.
- [X] Add routes and controllers.
- [X] Add passport session handling. 
- [X] Add views.
- [X] Add limits and privileges.
- [ ] Add socket messaging. 

## Contact

[![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=for-the-badge&logo=Twitter&logoColor=white)](https://twitter.com/dubsteph4n)

[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/stephan-allek-weigert-53801619b/)

[![Project Link](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/stpafk/members-only)
