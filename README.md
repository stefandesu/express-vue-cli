# express-vue-cli
An example project that combines an Express server that serves EJS templates with a Vue.js project (Vue.js 3 via vue-cli).

## Project setup
```
npm install
```

### Runs production server
Will run build on first launch.
```
npm run start
```

### Runs development server
This will start the Vue dev server on port 8122 and the Express server on port 8123. Express will then use the assets from Vue's dev server instead of the static files from `dist`, allowing hot reloading for Vue modules even when accessing via Express.
```
npm run dev
```

http://localhost:8123

### Compiles and minifies for production (only Vue stuff)
```
npm run vue:build
```

### Lints and fixes files
```
npm run lint
```

### Customize Vue configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
