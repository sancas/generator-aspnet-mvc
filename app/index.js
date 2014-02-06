'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var AspNetMvcGenerator = module.exports = function AspNetMvcGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AspNetMvcGenerator, yeoman.generators.Base);

AspNetMvcGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What\'s the name of this project?',
    default: 'WebApplication'
  }, {
    name: 'port',
    message: 'Which port you would like to use?',
    default: '9000'
  }, {
    type: 'confirm',
    name: 'compass',
    message: 'Would you like to use Sass (with Compass)?',
    default: true
  }, {
    type: 'confirm',
    name: 'bootstrap',
    message: 'Would you like to use bootstrap?',
    default: true
  }, {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to use the Sass version of Twitter Bootstrap?',
    default: true,
    when: function (props) {
      return props.bootstrap && props.compass;
    }
  }, {
    type: 'confirm',
    name: 'jquery',
    message: 'Would you like to use jQuery?',
    default: true,
    when: function (props) {
      return !props.bootstrap;
    }
  }, {
    type: 'confirm',
    name: 'angular',
    message: 'Would you like to use angularjs?',
    default: false
  }, {
    type: 'checkbox',
    name: 'modules',
    message: 'Which modules would you like to include?',
    when: function(props) {
      return props.angular;
    },
    choices: [{
      value: 'resourceModule',
        name: 'angular-resource.js',
        checked: true
      }, {
        value: 'cookiesModule',
        name: 'angular-cookies.js',
        checked: true
      }, {
        value: 'sanitizeModule',
        name: 'angular-sanitize.js',
        checked: true
      }, {
      value: 'routeModule',
        name: 'angular-route.js',
        checked: true
      }
    ]
  }];

  this.prompt(prompts, function (props) {
    if (props.modules) {
      var hasMod = function (mod) { return props.modules.indexOf(mod) !== -1; };
      this.resourceModule = hasMod('resourceModule');
      this.cookiesModule = hasMod('cookiesModule');
      this.sanitizeModule = hasMod('sanitizeModule');
      this.routeModule = hasMod('routeModule');
    
      var angMods = [];

      if (this.cookiesModule) {
        angMods.push("'ngCookies'");
      }

      if (this.resourceModule) {
        angMods.push("'ngResource'");
      }
      if (this.sanitizeModule) {
        angMods.push("'ngSanitize'");
      }
      if (this.routeModule) {
        angMods.push("'ngRoute'");
        this.env.options.ngRoute = true;
      }

      if (angMods.length) {
        this.env.options.angularDeps = "\n  " + angMods.join(",\n  ") +"\n";
      }
    }
    
    this.projectName = props.projectName;
    this.port = props.port;
    this.bootstrap = props.bootstrap;
    this.jquery = props.jquery;
    this.angular = props.angular;
    this.compass = props.compass;
    this.compassBootstrap = props.compassBootstrap;
    
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript#answer-8809472
    function generateUUID() {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);
          return (c=='x' ? r : (r&0x7|0x8)).toString(16);
      });
      return uuid;
    };

    this.projectGuid = generateUUID();
    this.assemblyGuid = generateUUID();
    this.year = new Date().getFullYear();
    
    cb();
  }.bind(this));
};

AspNetMvcGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

AspNetMvcGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AspNetMvcGenerator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

AspNetMvcGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  
  this.template('gitignore', '.gitignore');
};

AspNetMvcGenerator.prototype.app = function app() {
  this.mkdir(this.projectName);
  this.mkdir(this.projectName + '/bin');
  this.mkdir(this.projectName + '/App_Start');
  this.mkdir(this.projectName + '/Content');
  this.mkdir(this.projectName + '/Content/images');
  if (this.compass) {
    this.mkdir(this.projectName + '/Content/sass');
  }
  this.mkdir(this.projectName + '/Controllers');
  this.mkdir(this.projectName + '/Properties');
  this.mkdir(this.projectName + '/Views');
  this.mkdir(this.projectName + '/Views/Home');
  this.mkdir(this.projectName + '/Views/Shared');
  
  this.copy('_/WebTemplate.sln', this.projectName + '.sln');
  
  this.copy('_/WebTemplate/WebTemplate.csproj', this.projectName + '/' + this.projectName + '.csproj');
  this.copy('_/WebTemplate/favicon.ico',        this.projectName + '/favicon.ico');
  this.copy('_/WebTemplate/Global.asax',        this.projectName + '/Global.asax');
  this.copy('_/WebTemplate/Global.asax.cs',     this.projectName + '/Global.asax.cs');
  this.copy('_/WebTemplate/packages.config',    this.projectName + '/packages.config');
  this.copy('_/WebTemplate/robots.txt',         this.projectName + '/robots.txt');
  this.copy('_/WebTemplate/Web.config',         this.projectName + '/Web.config');
  this.copy('_/WebTemplate/Web.Debug.config',   this.projectName + '/Web.Debug.config');
  this.copy('_/WebTemplate/Web.Release.config', this.projectName + '/Web.Release.config');
  
  this.copy('_/WebTemplate/App_Start/FilterConfig.cs', this.projectName + '/App_Start/FilterConfig.cs');
  this.copy('_/WebTemplate/App_Start/RouteConfig.cs',  this.projectName + '/App_Start/RouteConfig.cs');
  
  this.copy('_/WebTemplate/Content/main.css', this.projectName + '/Content/main.css');
  
  this.copy('_/WebTemplate/Controllers/HomeController.cs', this.projectName + '/Controllers/HomeController.cs');
  
  this.copy('_/WebTemplate/Properties/AssemblyInfo.cs', this.projectName + '/Properties/AssemblyInfo.cs');
  
  this.copy('_/WebTemplate/Views/_ViewStart.cshtml',     this.projectName + '/Views/_ViewStart.cshtml');
  this.copy('_/WebTemplate/Views/Web.config',            this.projectName + '/Views/Web.config');
  this.copy('_/WebTemplate/Views/Home/Index.cshtml',     this.projectName + '/Views/Home/Index.cshtml');
  this.copy('_/WebTemplate/Views/Shared/_Footer.cshtml', this.projectName + '/Views/Shared/_Footer.cshtml');
  this.copy('_/WebTemplate/Views/Shared/_Layout.cshtml', this.projectName + '/Views/Shared/_Layout.cshtml');
  this.copy('_/WebTemplate/Views/Shared/Error.cshtml', this.projectName + '/Views/Shared/Error.cshtml');
};
