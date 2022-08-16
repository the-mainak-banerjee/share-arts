# ShareArts

A Social Media Platforms For Artists To Showcase Their Arts.

## Functionalities

- User Auth (Create New Account, Log In, Use Guest Login)
- Customize Profile with DP and Bio. Also, Change them in the future.
- Upload a new post with an Image and Caption.
- Edit and Delete Uploaded Post.
- View, Like, Comment, and Save Others Posts.
- Follow and Unfollow others.
- Only view followers' posts.
- Users can search for other users by using their names.

## Features

### `Auth`
- Can create an account and login into the account.
- Also users can use a guest login to explore the app.
- After login or signup users will be redirected to the home page or the page from there they cam to auth page.
- The profile page, Friends post page, and Create Post page will only be accessible after login.
- User will not be able to access the auth page if he/she is already logged in.

### `Post Management`

- User can create a new post by going to the Create Post page.
- The + icon in the navbar redirects to Create Post page.
- In the post creation form user can upload an image, view the preview of the image, remove the image and upload a new one and then publish the image with a caption.
- User has to add a caption before publishing an Image.
- After publishing a post user can also edit the caption and delete that post.
- Users can also view the posts of all users on the home page and posts of only their followers on the Friends Post page.
- Clicking on the image icon in the navbar will redirect to Friends Post Page.
- Users can like/dislike, save/unsave any post, and comment on any post. Also, the user can delete his own comment from any post.
- Clicking on the comment icon in the post container, reveal all comments in that post only if there are any. 

### `Profile Management`

- Users can click on the name of the user mentioned in their post and post caption and also in a comment to go to the profile page of that particular user.
- On the profile page user can see the posts of that user. And also users can see followers and the following list of that user.
- Also users can follow and unfollow a user by going to that user profile.
- In his own profile user can see his save posts.
- User can edit his name, and bio by clicking on the edit post button in his own profile.
- User can change his DP by clicking on his DP.

### `Search Management`

- Users can search for other users by name by using the search bar in Navbar.
- After searching a list of users whose names match the user search term will display on the screen. By clicking on their name user can visit their profile.


## Technologies Used

- React JS
- React Router
- React Icons
- React Redux Toolkit
- Firebase[Storage, Auth, Firestore]
- Chakra UI


## Screens

### `Home Page`

![image](https://user-images.githubusercontent.com/94280354/184822274-4d4ede03-3e24-4943-8d0b-0773e9c41119.png)


### `Upload Post Page`

![image](https://user-images.githubusercontent.com/94280354/184822333-18bbdd30-503b-4ce9-9e9c-356568d9f7f3.png)


### `Profile Page`

![image](https://user-images.githubusercontent.com/94280354/184822440-94ef9203-c5aa-4ee6-ba81-68cda6fb7df6.png)


![image](https://user-images.githubusercontent.com/94280354/184822726-259bd838-a842-4f10-b402-3c5528df9ba3.png)
