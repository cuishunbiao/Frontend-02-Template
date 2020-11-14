var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    contractor() {
        this.defaultName = 'cuishunbiao'
        this.defaultDescription = 'default description'
        this.answers = null
    }
    async initPackage() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name, default:cuishunbiao",
                default: this.defaultName // Default to current folder name
            },
            {
                type: "input",
                name: "description",
                message: "Please input you project description",
                default: this.defaultDescription // Default to current folder name
            }
        ]);


        const pkgJson = {
            "name": this.answers.name,
            "version": "1.0.0",
            "description": this.answers.description,
            "main": "generators/app/index.js",
            "scripts": {
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            "author": "",
            "license": "ISC",
            "devDependencies": {
                "webpack": "4.44.1"
            },
            "dependencies": {
                //可以输入默认的需要的 Vue 的版本
            }
        }

        this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
        this.npmInstall(["vue"], { "save-dev": false });
        this.npmInstall(["vue-loader", "html-webpack-plugin", "vue-template-compiler", "vue-style-loader", "css-loader"], { "save-dev": true })

    }

    install(){
        this.npmInstall();//单独安装 webapck 
    }

    copyFiles() {
        this.fs.copyTpl(
            this.templatePath("HelloWorld.vue"),
            this.destinationPath("src/HelloWorld.vue")
        );
        this.fs.copyTpl(
            this.templatePath("webpack.config.js"),
            this.destinationPath("webpack.config.js")
        );
        this.fs.copyTpl(
            this.templatePath("main.js"),
            this.destinationPath("src/main.js")
        );
        this.fs.copyTpl(
            this.templatePath("index.html"),
            this.destinationPath("src/index.html"),
            {
                title: this.answers.name,
            }
        );
    }
};