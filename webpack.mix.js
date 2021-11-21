const mix = require('laravel-mix');

mix.setPublicPath('public');

mix.version();

if (mix.inProduction()) {
	mix.sourceMaps();
}

// mix.webpackConfig({
// 	resolve: {
// 		alias: {
// 			resources_js: path.resolve(__dirname, 'resources/js'),
// 		}
// 	}
// });

mix.js('resources/js/app.js', 'public/js/app.js');
mix.sass('resources/sass/app.scss', 'public/css/app.css');
mix.copy('resources/images', 'public/images', false);