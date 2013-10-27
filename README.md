#Express Code Structure

This project is an example of how to organize a medium-size express.js web application.

## How big is your application?

Web applications are not all the same, and there's not, in my opinion, a single code structure that should be applied to all express.js applications

If your application is small, you don't need such a deep directory structure as exemplified here. Just keep it simple and stick a handful of .js files in the root of your repository and you're done. Voila.

If your application is huge, at some point you need to break it up into distinct npm packages. In general the node.js approach seems to favor many small packages, at least for libraries, and you should build your application up by using several npm packages as that starts to make sense and justify the overhead. So as your application grows and some portion of the code becomes clearly reusable outside of your application or is a clear subsystem, move it to it's own git repository and make it into a standalone npm package.

**So** the focus of this project is to illustrate a workable structure for a medium-sized application.

## What is your overall architecture

There are many approaches to building a web application, such as

  * Server Side MVC a la Ruby on Rails
  * Single Page Application style a la MongoDB/Express/Angular/Node (MEAN)
  * Basic web site with some forms
  * Models/Operations/Views/Events style a la [MVC is dead, it's time to MOVE on](http://cirw.in/blog/time-to-move-on.html)
  * and many others both current and historical

Each of these fits nicely into a different directory structure. For the purposes of this example, it's just scaffolding and not a fully working app, but I'm assuming the following key architecture points:

* The site has some traditional static pages
* The "application" portion of the site is developed as a Single Page Application style
* The application exposes a REST/JSON style API to the browser
* The app models a simple business domain, in this case, it's a car dealership application

## And what about Ruby on Rails?

It will be a theme throughout this project that many of the ideas embodied in Ruby on Rails and the "Convention over Configuration" decisions they have adopted, though widely accepted and used, are not actually very helpful and sometimes are the opposite of what this repository recommends.

My main point here is that there are underlying principles to organizing code, and based on those principles, the Ruby on Rails conventions make sense (mostly) for the Ruby on Rails community. However, just thoughtlessly aping those conventions misses the point. Once you grok the basic principles, ALL of your projects will be well-organized and clear: shell scripts, games, mobile apps, enterprise projects, even your home directory.

## Underlying Principles and Motivations

* Be mentally manageable
  * The brain can only deal with and think about a small number of related things at once. That's why we use directories. It helps us deal with complexity by focusing on small portions.
* Be easy to locate code
  * Given a feature to build or a bug to fix, our goal is that a developer has no struggle locating the source files involved.
    * Names are meaningful and accurate
    * crufty code is fully removed, not left around in an orphan file or just commented out
* Use simple and obvious naming
  * Almost every module in this application has a valid JavaScript identifier as its filename so this pattern is consistent:
    * var MyClass = require("app/MyClass");
    * var moduleOfFunctions = require("app/moduleOfFunctions");
    * var oneFunctionModule = require("app/blah/oneFunctionModule");
  * variable name matches the basename of the module path
  * This is grep-friendly
  * The JavaScript language is camelCase (toString, toLowerCase, etc), and this: "-" is a minus sign. I don't know why people do `var myModule = require("my-module");`. It's just silly. Don't put minus signs in filesystem paths or package names.
* Group by Coupling, Not by Function
  * This is a major departure from the Ruby on Rails convention of app/views, app/controllers, etc
  * Feauters get added to a full stack, so I want to focus on a full stack of files that are relevant to my feature. When I'm adding a telephone number field to the user model, I don't care about any other controller than the user controller, and I don't care about any other model than the user model.
  * So instead of editing 6 files that are each in their own directory and ignoring tons of other files in those directories, this repository is organized such that all the files I need to build a feature are colocated
  * When I change the user controller, that is coupled to the user model and the user view by the nature of MVC, so that means those 3 files will change together, but the deals controller or customer controller are decoupled and thus not involved.
  * MVC or MOVE style decoupling is still encouraged, but spreading the MVC files out into sibling directories is just annoying
  * Thus each of my routes files has the portion of the routes it owns. A rails-style routes.rb file is handy if you want an overview of all routes in the app, but when actually building features and fixing bugs, you only care about the routes relevant to the piece you are changing.
* Code flow is followable
  * Don't do magic things. Don't autoload files from magic directories in the filesystem. Don't be ruby. The app starts at `app/server.js:1' and you can see everything it loads and executes by following the code.


## The app symlink trick

So one way to avoid intra-project requires with annoying relative paths like `require("../../../config")` is to use the following trick:

* create a symlink under node_modules for your app
  * cd node_modules && ln -nsf ../app
* add **just the node_modules/app symlink itself**, not the entire node_modules folder, to git
  * git add -f node_modules/app
  * Yes, you should still have "node_modules" in your `.gitignore` file
  * No, you should not put "node_modules" into your git repository. Some people will recommend you do this. They are incorrect.
* Now you can require intra-project modules using this prefix
  * `var config = require("app/config");`
  * `var DealModel = require("app/deals/DealModel");
* Basically, this makes intra-project requires work very similarly to requires for external npm modules.

## Tests

Setup up a "test" directory that is an exact mirror of the "app" directory.

* code lives in app/users/UserModel.js
* tests go in test/app/users/UserModel.js

## How to organize code within each .js module file

This project's scope is mostly about where files and directories go, and I don't want to add much other scope, but I'll just mention that I organize my code into 3 distinct sections.

1. Opening block of CommonJS require calls to state dependencies
2. Main code block of pure-JavaScript. No CommonJS pollution in here. Don't reference exports, module, or require.
3. Closing block of CommonJS to set up module.exports