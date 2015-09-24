module.exports = function (grunt) {
	grunt.registerTask('build', [
                'mark_from_db',
                'mark_to_db',
		'compileAssets',
		'linkAssetsBuild',
		'clean:build',
		'copy:build'
	]);
};
