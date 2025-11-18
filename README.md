This project uses React Native typescript to create a mobile app front-end for the crudibase project

The UI should have views for searching wikibase, adding results to named collections, add notes to collections, add a camera photo, add phone info like: gps location, temperature, pressure, nearby WiFi access points, etc.

This project uses Test-Driven-Development (TDD) and Red/Green tests. Pre-commit checks: format the code, lint the code, fix lint (and build) warnings (Do NOT bypass checks). If a wasm related lint error indicates dead code, fix the configuration annotations per wasm-test best practices (q.v. online). Pre-commit checks also require all tests to pass, and that .gitignore is valid/sane. commit messages should be detailed.

When possible automated UI testing should be used to diagnose UI issues and verify UI features and fixes. When not available, Rust curl-equivalent code (reqwest) to fetch html, to verify that elements appear, css checks out, etc. To aid debugging, the back-end rest (and static file) server should have extensive logging and the WASM frontend code should also have fine-grain logging to the browser console (or to debug divs at the bottom of the UI). The CLI should accept different granularity logging/debugging flags.

Start with a ./docs directory and create markdown files for: architecture, prd, design, plan, process, and status. This will use Java 17, Gradle 8.x, Android ~35, modern CSS, best practices,

The APIs are documented at: https://github.com/softwarewrighter/crudibase

The app should use HTTPS to authenticate with the Digital Ocean droplet/docker crudibase app running at: https://crudibase.codingtech.info/
