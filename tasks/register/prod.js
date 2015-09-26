module.exports = function (grunt) {
	grunt.registerTask('prod', [
                'mark_from_db:entries',
                'mark_from_db:items',
                'mark_to_db:entries',
                'mark_to_db:items',
		'compileAssets',
		'concat',
		'uglify',
		'cssmin',
		'sails-linker:prodJs',
		'sails-linker:prodStyles',
		'sails-linker:devTpl',
		'sails-linker:prodJsJade',
		'sails-linker:prodStylesJade',
		'sails-linker:devTplJade'
	]);
};
