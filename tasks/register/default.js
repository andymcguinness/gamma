module.exports = function (grunt) {
	grunt.registerTask('default', ['mark_from_db', 'mark_to_db', 'compileAssets', 'linkAssets',  'watch']);
};
