#Express Code Structure

This project is an example of how to organize a medium-sized express.js web application.

## How big is your application?

Web applications are not all the same, and there's not, in my opinion, a single code structure that should be applied to all express.js applications.

If your application is small, you don't need such a deep directory structure as exemplified here. Just keep it simple and stick a handful of `.js` files in the root of your repository and you're done. Voilà.

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

* The site has some traditional static pages/templates
* The "application" portion of the site is developed as a Single Page Application style
* The application exposes a REST/JSON style API to the browser
* The app models a simple business domain, in this case, it's a car dealership application

## And what about Ruby on Rails?

It will be a theme throughout this project that many of the ideas embodied in Ruby on Rails and the "Convention over Configuration" decisions they have adopted, though widely accepted and used, are not actually very helpful and sometimes are the opposite of what this repository recommends.

My main point here is that there are underlying principles to organizing code, and based on those principles, the Ruby on Rails conventions make sense (mostly) for the Ruby on Rails community. However, just thoughtlessly aping those conventions misses the point. Once you grok the basic principles, ALL of your projects will be well-organized and clear: shell scripts, games, mobile apps, enterprise projects, even your home directory.

For the Rails community, they want to be able to have a single Rails developer switch from app to app to app and be familiar and comfortable with it each time. This makes great sense if you are 37 signals or Pivotal Labs, and has benefits. In the server-side JavaScript world, the overall ethos is just way more wild west anything goes and we don't really have a problem with that. That's how we roll. We're used to it. Even within express.js, it's a close kin of Sinatra, not Rails, and taking conventions from Rails is usually not helping anything. I'd even say **Principles over Convention over Configuration**.

## Underlying Principles and Motivations

* Be mentally manageable
  * The brain can only deal with and think about a small number of related things at once. That's why we use directories. It helps us deal with complexity by focusing on small portions.
* Be size-appropriate
  * Don't create "Mansion Directories" where there's just 1 file all alone 3 directories down. You can see this happening in the [Ansible Best Practices](http://www.ansibleworks.com/docs/playbooks_best_practices.html) that shames small projects into creating 10+ directories to hold 10+ files when 1 directory with 3 files would be much more appropriate. You don't drive a bus to work (unless you're a bus driver, but even then your driving a bus AT work not TO work), so don't create filesystem structures that aren't justified by the actual files inside them.
* Be easy to locate code
  * Given a feature to build or a bug to fix, our goal is that a developer has no struggle locating the source files involved.
    * Names are meaningful and accurate
    * crufty code is fully removed, not left around in an orphan file or just commented out
* Be search-friendly
  * all first-party source code is in the `app` directory so you can `cd` there are run find/grep/xargs/ack/ag/etc and not be distracted by third party matches
* Use simple and obvious naming
  * Almost every module in this application has a valid JavaScript identifier as its filename so this pattern is consistent:
    * var MyClass = require("app/MyClass");
    * var moduleOfFunctions = require("app/moduleOfFunctions");
    * var oneFunctionModule = require("app/blah/oneFunctionModule");
  * variable name matches the basename of the module path
  * This is grep-friendly
  * The JavaScript language is camelCase (toString, toLowerCase, etc), and this: "-" is a minus sign. I don't know why people do `var myModule = require("my-module");`. It's just silly. Don't put minus signs in filesystem paths or package names.
* Group by Coupling, Not by Function
  * This is a major departure from the Ruby on Rails convention of `app/views`, `app/controllers`, `app/models`, etc
  * Features get added to a full stack, so I want to focus on a full stack of files that are relevant to my feature. When I'm adding a telephone number field to the user model, I don't care about any controller other than the user controller, and I don't care about any model other than the user model.
  * So instead of editing 6 files that are each in their own directory and ignoring tons of other files in those directories, this repository is organized such that all the files I need to build a feature are colocated
  * By the nature of MVC, the user view is coupled to the user controller which is coupled to the user model. So when I change the user model, those 3 files will often change together, but the deals controller or customer controller are decoupled and thus not involved.
  * MVC or MOVE style decoupling in terms of which code goes in which module is still encouraged, but spreading the MVC files out into sibling directories is just annoying.
  * Thus each of my routes files has the portion of the routes it owns. A rails-style `routes.rb` file is handy if you want an overview of all routes in the app, but when actually building features and fixing bugs, you only care about the routes relevant to the piece you are changing.
* Reduce cross-cutting coupling with Events
  * It's easy to think "OK, whenever a new Deal is created, I want to send an email to all the Salespeople", and then just put the code to send those emails in the route that creates deals.
  * However, this coupling will eventually turn your app into a giant ball of mud.
  * Intsead, the DealModel should just fire a "create" event and be entirely unaware of what else the system might do in response to that.
  * When you code this way, it becomes much more possible to put all the user related code into `app/users` because there's not a rat's nest of coupled business logic all over the place polluting the purity of the user code base.
* Code flow is followable
  * Don't do magic things. Don't autoload files from magic directories in the filesystem. Don't be Rails. The app starts at `app/server.js:1` and you can see everything it loads and executes by following the code.
  * Don't make DSLs for your routes. Don't do silly metaprogramming when it is not called for.
  * If your app is so big that doing `magicRESTRouter.route(somecontroller, {except: 'POST'})` is a big win for you over 3 basic `app.get`, `app.put`, `app.del`, calls, you're probably building a monolithic app that is too big to effectively work on. Get fancy for BIG wins, not for converting 3 simple lines to 1 complex line.

## express.js specifics
* Don't use `app.configure`. It's almost entirely useless and you just don't need it. It is in lots of boilerplate due to mindless copypasta.
* THE ORDER OF MIDDLEWARE AND ROUTES IN EXPRESS MATTERS!!!
  * Almost every routing problem I see on stackoverflow is out-of-order express middleware
  * In general, you want your routes decoupled and not relying on order that much
  * Don't use `app.use` for your entire application if you really only need that middleware for 2 routes (I'm looking at you, `bodyParser`)
  * Make sure when all is said and done you have EXACTLY this order:
    * Any super-important application-wide middleware
    * All your routes and assorted route middlewares
    * THEN error handlers
* Sadly, being sinatra-inspired, express.js mostly assumes all your routes will be in `server.js` and it will be clear how they are ordered. For a medium-sized application, breaking things out into separate routes modules is nice, but it does introduce peril of out-of-order middleware

## The app symlink trick

There are many approaches outlined and discussed at length by the community in the great gist [Better local require() paths for Node.js](https://gist.github.com/branneman/8048520). I may soon decide to prefer either "just deal with lots of ../../../.." or use the [requireFrom](https://github.com/DSKrepps/requireFrom) modlue. However, at the moment, I've been using the symlink trick detailed below.

So one way to avoid intra-project requires with annoying relative paths like `require("../../../config")` is to use the following trick:

* create a symlink under node_modules for your app
  * cd node_modules && ln -nsf ../app
* add **just the node_modules/app symlink itself**, not the entire node_modules folder, to git
  * git add -f node_modules/app
  * Yes, you should still have "node_modules" in your `.gitignore` file
  * No, you should not put "node_modules" into your git repository. Some people will recommend you do this. They are incorrect.
* Now you can require intra-project modules using this prefix
  * `var config = require("app/config");`
  * `var DealModel = require("app/deals/DealModel")`;
* Basically, this makes intra-project requires work very similarly to requires for external npm modules.
* Sorry, Windows users, you need to stick with parent directory relative paths.

## Configuration

Generally code modules and classes to expect only a basic JavaScript `options` object passed in. Only `app/server.js` should load the `app/config.js` module. From there it can synthesize small `options` objects to configure subsystems as needed, but coupling every subsystem to a big global config module full of extra information is bad coupling.

Try to centralize creation of DB connections and pass those into subsystems as opposed to passing connection parameters and having subsystems make outgoing connections themselves.

### NODE_ENV

This is another enticing but terrible idea carried over from Rails. There should be exactly 1 place in your app, `app/config.js` that looks at the `NODE_ENV` environment variable. Everything else should take an explicit option as a class contsructor argument or module configuration parameter.

If the email module has an option as to how to deliver emails (SMTP, log to stdout, put in queue etc), it should take an option like `{deliver: 'stdout'}` but it should absolutely not check `NODE_ENV`.

## Tests

Setup up a "test" directory that is an exact mirror of the "app" directory.

* code lives in `app/users/UserModel.js`
* tests go in `test/app/users/UserModel.js`

(Yes, I realize this is somewhat contrary to my above tirade against `app/controllers`. Ultimately I'd rather scatter 'test' directories with the 'app' tree, I think, but it's so nice to just type "mocha" and have your tests run that at least for the moment I still follow this convention, and yes I realize this is not self-consistent.)

## How to organize code within each `.js` module file

This project's scope is mostly about where files and directories go, and I don't want to add much other scope, but I'll just mention that I organize my code into 3 distinct sections.

1. Opening block of CommonJS require calls to state dependencies
2. Main code block of pure-JavaScript. No CommonJS pollution in here. Don't reference exports, module, or require.
3. Closing block of CommonJS to set up module.exports
