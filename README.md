# Instructions

Built with node `v18.17.1`

The correct maps are stored in the `maps` folder. To change which map it loads change the value passed to `getMapFromFile` in `index.ts`.
By default it will pass the puzzle that outputs GOONIES. The tests iterate and run all of the puzzles so I figured there is no need to run it like that in the executable.

- To run tests run `npm run test`
- To run the app run `npm run build`

## Test plan

The first thing that is tested is the file loading and parsing. This makes sure the file is loaded correctly and then parsed in the correct format.
The path traversal is tested in 3 different tests. One tests all the edge cases and errors while the other two test the functions that are used for traversing the path.
