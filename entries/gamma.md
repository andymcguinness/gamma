---
title: Gamma
category: blog_post
slug: gamma
featured_image: /images/gamma.png
---
Welcome to the third iteration of my site! Well, major iteration that is.

This is a ground-up rebuild of my entire site, and I hope you enjoy having a look around. Below, I'd like to discuss the logic behind the site, and a bit about the building process.

### From the Ground Up

My previous iteration of this site was built on WordPress. I was a WordPress developer at the time; it made sense to use that as my go-to for my personal site as well. However, at this point I'm really a full-stack JavaScript developer; it makes more sense for me to use full-stack JavaScript than to keep going with WordPress. (Even though I still develop for WordPress.) So, for my tech stack, I decided to go JavaScript from top to bottom.

### Round 1

The first iteration (of this third redesign) was a full-on MEAN stack application. I was custom-building a Node.js server using Express on top of Mongodb, with AngularJS powering the front-end. It was powerful, and it was right in my niche. However, there was something that was bugging me.

You see, this site was meant to be a translation of Jekyll to JavaScript. That's right, Grunt-based flat-file site building. Pretty neat, hunh? The only problem I had was that it wasn't easy or fast to add new layers to the API; I couldn't just run a command in the Terminal to get what I wanted.

### Round 2

That's where Sails.js comes in. With Sails, you absolutely can run `sails generate` and get the desired result. So, for Round 2, I switched my site over to Sails.

Sails takes care of the Node, Express, and Mongodb parts of my app. It also comes with a very robust built-in Grunt system; all I had to do was add two new tasks to the site, and voila, I had what I was looking for. But for SEO purposes, Angular can be a bit of a pain-in-the-you-know-what, since it's not SEO friendly from the get-go. For speed of development, and as an excuse to play with technologies I haven't already, I decided to switch to EJS as my templating language. That meant that templating was now happening on the backend.

This also made it much easier to, instead of doing a flat-file structure for the site, template out my blog and portfolio, and keep the information I needed in the database. That's what I've done at this point; the posts and portfolio items you see are currently hosted in my database, put there (and updated there) by a Grunt task.

### To Be Continued

The site is not currently responsive, which is a huge pitfall for me. That's quite high on my to-do list. I'd also like to add some subtle animations to help with the user experience; right now, it's rather stark.

The next large thing I'd like to do is I'd like to take the work I've done for this site and extract it into its own CMS; riffing off of Jekyll, I'll most likely call it Hyde. That will be a challenge in and of itself!

Thank you for reading this, and I hope you enjoy your stay!
