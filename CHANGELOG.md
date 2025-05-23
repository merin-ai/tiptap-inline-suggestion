# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-05-23

### Added

- **Debounced API calls**: Configurable `debounceTime` option (default: 250ms) to prevent excessive API requests
- **Enhanced TypeScript support**: Proper type definitions and safer null handling
- **Improved keyboard handling**: Better Tab key integration and suggestion management
- **Comprehensive documentation**: Updated README with configuration options and usage examples

### Fixed

- Removed non-null assertion operators (`!`) for better type safety
- Fixed TypeScript interface conflicts for better IntelliSense support
- Improved error handling and null checks throughout the codebase
- Fixed event handling logic in ProseMirror plugins

### Changed

- Package name changed to `@merin-ai/tiptap-inline-suggestion`
- Updated authorship and licensing information
- Enhanced demo applications with better examples

### Technical Improvements

- Lazy initialization pattern for debounced functions
- Better storage management in Tiptap extension
- Cleaner plugin architecture with proper lifecycle management

---

**Note**: This package is a fork of `@sereneinserenade/tiptap-inline-suggestion` with significant enhancements for production use.
