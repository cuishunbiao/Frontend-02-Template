var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
    }


    async prompting() {
        const answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname // Default to current folder name
            }
        ]);

        const pkgJson = {
            "name": answers.name,
            "version": "0.1.0",
            "private": true,
            "scripts": {
                "test": "mocha --require @babel/register",
                "build": "webpack",
                "coverage": "nyc mocha --require @babel/register"
            },
            "dependencies": {

            },
            "devDependencies": {
            }
        }

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { "save-dev": false })
        this.npmInstall(["webpack", "webpack-cli", "vue-loader", "mocha", "nyc","babel-loader",
            "@istanbuljs/nyc-config-babel", 'vue-style-loader', 'css-loader', "vue-template-compiler",
            "@babel/core", "@babel/preset-env", "@babel/register", "copy-webpack-plugin", "babel-plugin-istanbul"
        ], { "save-dev": true })

        this.fs.copyTpl(
            this.templatePath('sample-test.js'),
            this.destinationPath('test/sample-test.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('.babelrc'),
            this.destinationPath('.babelrc'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('.nycrc'),
            this.destinationPath('.nycrc'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('HellowWorld.vue'),
            this.destinationPath('src/HelloWorld.vue'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('webpack.config.js'),
            this.destinationPath('webpack.config.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('main.js'),
            this.destinationPath('main.js'),
            {}
        )

        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('src/index.html'),
            {
                title: answers.name
            }
        )

    }

};
