# generator-aspnet-mvc [![Build Status](https://travis-ci.org/has606/generator-aspnetmvc.png?branch=master)](https://travis-ci.org/has606/generator-aspnetmvc)

A NET Core ASP.NET MVC project generator for [Yeoman](http://yeoman.io).


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```
$ npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-aspnetmvc from npm, run:

```
$ npm install -g generator-aspnet-mvc
```

If you want to use Compass as a sass compiler:

```
$ gem install compass
```

Then make a directory to contain your project (this sounds silly, but I always forget):

```
$ mkdir YourProject
$ cd YourProject
```

Finally, initiate the generator:

```
$ yo aspnet-mvc
```

After install, type:

```
$ grunt serve
```

And open the project with Visual Studio 2012 / 2013.

Happy coding :)

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
