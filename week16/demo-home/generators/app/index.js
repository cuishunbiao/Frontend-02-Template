var Generator = require('yeoman-generator');

module.exports = class extends Generator {
    // The name `constructor` is important here
    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);
        this.title = '';
    }

    async createTitle(){
        this.title = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project title?"
            }
        ]);
    }

    writing() {
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: this.title.name }
        );
    }

    initPackage(){
        const pkgJson = {
            devDependencies:{
                eslint: '^3.15.0'
            },
            dependencies:{
                react: '^16.2.0'
            }
        }

        this.fs.extendJSON(this.destinationPath('package.json'),pkgJson);

    }

    install(){
        this.npmInstall();
    }

};