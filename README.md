# README.md
React starting guide for MacOS (M1).
<br />Result of this page can be seen [here](https://pwangjoo.github.io/demo-react/).

## Preparation
### 1. Using `nvm`
```zsh
% brew install nvm #Homebrew installation
% nvm list #show list of installed nodes
% nvm install [VERSION] #install certain version of node
% nvm use v[VERSION] #temporarily use certain version of node
% nvm alias default v[VERSION] #permanently use certain version of node
```

## Initializing
### 1. Generating new project
```zsh
% npx create-react-app [APPNAME] --template typescript
% cd [APPNAME] && npm i && git init
```
### 2. Easy start
1. Fix maintenace issue.
    ```zsh
    % npm i @babel/plugin-proposal-private-property-in-object
    ```
1. Modify `package.json`.
    ```json
    {
      "config": {
        "port": 8000
      },
      "scripts": {
        "start": "PORT=$npm_package_config_port react-scripts start",
        "build": "BUILD_PATH='./dist' react-scripts build",
        "prod": "npx serve -s dist -l $npm_package_config_port -L -n"
      }
    }
    ```

## Running
```zsh
% npm run start #development & debug mode
% npm run build #build
% npm run prod #production mode

% pm2 start npm --name [NAME] --time -- run prod
```

## Post Installation
### 1. Useful Packages
1. Production
    * Router: `react-router-dom`
    * Helmet: `react-helmet`
    * Swiper: `swiper`

### 2. Deploying GitHub Pages
1. Install packages.
    ```zsh
    % npm i -D gh-pages
    ```
1. Modify `package.json`.
    ```json
    {
      "homepage": "https://[USERNAME].github.io/[APPNAME]",
      "scripts": {
        ...
        "deploy": "gh-pages -d dist"
      }
    }