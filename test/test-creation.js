/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('ASP.NET MVC generator', function () {
    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('aspnetmvc:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    it('creates expected files', function (done) {
        var expected = [
            '.jshintrc',
            '.editorconfig',
            '.gitignore',
            'Gruntfile.js',
            'package.json',
            '.bowerrc',
            'bower.json',
            'testapp.sln',
            'testapp/testapp.csproj',
            'testapp/favicon.ico',
            'testapp/Global.asax',
            'testapp/Global.asax.cs',
            'testapp/packages.config',
            'testapp/robots.txt',
            'testapp/Web.config',
            'testapp/Web.Debug.config',
            'testapp/Web.Release.config',
            'testapp/App_Start/FilterConfig.cs',
            'testapp/App_Start/RouteConfig.cs',
            'testapp/Content/main.css',
            'testapp/Controllers/HomeController.cs',
            'testapp/Properties/AssemblyInfo.cs',
            'testapp/Views/_ViewStart.cshtml',
            'testapp/Views/Web.config',
            'testapp/Views/Home/Index.cshtml',
            'testapp/Views/Shared/_Footer.cshtml',
            'testapp/Views/Shared/_Layout.cshtml',
            'testapp/Views/Shared/Error.cshtml'          
        ];
        
        helpers.mockPrompt(this.app, {
            projectName: 'testapp',
            port: 9000,
            compass: true,
            bootstrap: true,
            compassBootstrap: true,
            angular: true,
            modules: []
        });
        
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
