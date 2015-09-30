---
title: Code, Manage, Go!
slug: code_manage_go
featured_image: http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-22.42.36.png
client: Personal
role: Full-Stack Developer
technology: CodeIgniter, MySQL Workbench, User Stories, User Flows
---

Code, Manage, Go! is the result of a semester of work in a PHP class. It’s a web app I envisioned, designed, wireframed, developed, improved, and improved yet again. The idea behind the webapp is simple: combine the best of Git version control and a project management software like Asana. The result is a webapp that allows for synchronized code-oriented collaboration, with Git commits being used to complete tasks.

The project began as a several-page PDF explaining what I wanted to do, 10 applicable user stories, a basic ERD, and basic wireframe ideas for what the user interfaces might look like. This progressed into high fidelity mockups (spawning the app’s first design), object-oriented data models (classes/objects), forms and authentication (which spawned the second design), database integration, and, finally, a CodeIgniter MVC rewrite of the whole application (which spawned the current design).

The amount I learned from this project (beyond PHP) is incredible. I eventually sat down and did some user flows to try and see how my app should function; I had been creating pages and content, but I hadn’t really put all the pieces together. This resulted in the complete structural and design overhaul in the final project, mimicking the structure written on that whiteboard. The final result felt more like an actual app than anything I had produced before, which I’ll definitely take as a sign of improvement.

![User Flows](http://beta.andymcguinness.com/wp-content/uploads/2013/11/December_11__2013_at_0355AM.jpg)

The app is currently not complete. None of the actual Git functionality is there; instead, for the sake of the project, I focused on file uploading. I plan to use Bitbucket’s API to tie Git in. (Bitbucket allows for infinite amounts of private repositories, as well as teams, which I think work well for a proprietary software type of environment.) The task management is wobbly at best, and though you can assign tasks, it’s sort of hazy as to how I’ll tie Git and the task together. However, that’s a puzzle I look forward to solving!

I plan to keep going with this project in my spare time, eventually creating an app I wouldn’t mind using for my personal projects.

---

In order to see how the project has really progressed, it’s worth looking at how some of the app elements have evolved.

For starters, the dashboard has gone through several phases. First, it was just a bare-bones profile-style page:

![Design One](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.05.34.png)

Then, it was a fancy profile-style page (that used PHP sessions):

![Design Two](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.08.45.png)

Finally, it became more of a true dashboard, and less of a profile (with 100% more CodeIgniter sessions):

![Design Three](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.10.03.png)

Also, the evolution of the project page was pretty neat. First, it started off much the same as the dashboard, a list:

![Design One](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.23.43.png)

It then became a fancy list, featuring an icon font:

![Design Two](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.39.20.png)

Finally, it became what it needed to be all along, the heart of the app:

![Design Three](http://beta.andymcguinness.com/wp-content/uploads/2013/11/Screenshot-2013-12-24-23.28.19.png)

There are other great examples of the app’s evolution, but these are a couple of the best ones.
