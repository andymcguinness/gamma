module.exports = function (grunt) {
	grunt.registerTask('default', ['mark_from_db:entries', 'mark_from_db:items', 'mark_to_db:entries', 'mark_to_db:items', 'compileAssets', 'linkAssets',  'watch']);
};
