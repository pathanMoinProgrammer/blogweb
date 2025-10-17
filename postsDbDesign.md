// Admin - all posts

table
title , description, languages, 

create new post 
=> add doc in db and redirect user to locale/create-new-post?postId=postId
=> publish => save post in posts/postId/translations/locale , posts/postId/ 

table
title , description, languages, 






// client side
All posts of lang 
read translations 



////
create new blog click => loader => add doc in posts collection with data {title: "untitled" } and get it's id 
redirect user on /locale/create-new-blog/postId => on this page you will check if you have data in posts/postId/translations/locale 
if you have data , load it and display it in editor 

if user click on any article language, redirect user to /language/create-new-blog/postId


