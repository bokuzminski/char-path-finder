# Instructions

Built with node `v18.16.1`

The correct maps are stored in the `puzzles` folder. To change which map it loads change the value passed to `getMapFromFile` in `index.ts`.
By default it will pass the puzzle that outputs GOONIES. The tests iterate and run all of the puzzles so I figured there is no need to run it like that in the executable.

- To run tests run `npm run test`
- To run the app run `npm run build`

## Test plan

The first thing that is tested is the file loading and parsing. This makes sure the file is loaded correctly and then parsed in the correct format.
The path traversal is tested in two different tests. One tests all the edge cases and errors and the second loops over a mock JSON with the correct values and runs them against the main loop.
I wrote a short script to generate the JSON but deleted it after it was done as there is no need to keep regenerating mock file.
