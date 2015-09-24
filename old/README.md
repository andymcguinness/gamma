# Gamma -- Thrice the Fun

Welcome to the third installment of my personal site. There's not a lot here yet, but it sure does work! Sorta anyways.

## TOC

1. Goals
2. Technology
3. Changelog
4. Colophon

## 1 -- Goals

The goal of this version of my site is to be incredibly light, and incredibly simple. In my past life, I was a Wordpress developer; as such, it  was only logical to build my site in Wordpress. I am no longer a Wordpress developer, but a JavaScript developer -- so it makes sense now to build it in an isomorphic JS framework. (Namely Angular -- I do it all day, every day.) Additionally, Wordpress comes with a ton of great built-in functionality -- that I didn't need or use.

In the end, I hope to have a lean, MEAN, blogging machine of a website that I can easily extend and update. I also want it to be extremely simple to implement.

## 2 -- Technology

As I briefly mentioned above, this new version will be powered by Angular on the frontend, and well, the rest of the MEAN stack on the backend -- save for Mongo. (I probably won't need a db for this.) I don't normally advocate for using Angular to build websites, but it's my website, and I'm an Angular developer, so why not? You only live once, or so I've heard.

I'm not using any templating language (yet) -- maybe down the line I'll feel inspired to learn Jade and incorporate it. For CSS, I'm planning on using Sass (or SCSS) because I've not yet had a good chance to run with it. Eventually, I'll also incorporate Grunt/Gulp and get minification & concatenation involved.

For right now, I just want to build something that works.

The git repo is organized using a variation on the git-flow workflow; the 'main' branch for the project is the development branch, and all features are to be implemented using a feature/[feature-name] branch structure. The actual main branch will only be used for releases.

## 3 -- Changelog

* **0.0.0**: Hello, world!
* **0.0.1**: Basic Grunt functionality incorporated.
* **0.0.2**: Basic blogging functionality incorporated. Nothing was automated, and everything hurt.

## 4 -- Colophon

I'm [Maia McGuinness](http://maiamcguinness.com), and I [build stuff](https://github.com/maiamcguinness). This pile of code is licensed under the please-don't-steal-my-code-but-please-do-have-a-look-about license. I mean if you're really that inspired to do something with this code, at least let me in on it.
