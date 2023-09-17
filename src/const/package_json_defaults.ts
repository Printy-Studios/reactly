export const dev_deps = {
    "typescript": "^5.2.2",
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "rimraf": "^5.0.1",
    "copyfiles": "^2.4.1",
}

export const deps = {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
}

export const scripts = {
    "clean": "rimraf /dist",
    "copy-files": "copyfiles -u 1 src/**/*.js src/**/*. dist/",
    "build": "npm run clean && tsc && npm run copy-files",
}