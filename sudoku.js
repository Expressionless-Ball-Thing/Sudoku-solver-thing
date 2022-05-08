var sudoku_grid = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
  ];
  
  const possible = (row, col, num, grid) => {
    for (let i = 0; i < 9; i++) {
      if (grid[row][i] == num) {
        return false;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (grid[i][col] == num) {
        return false;
      }
    }
    square_col_start = Math.floor(col / 3) * 3;
    square_row_start = Math.floor(row / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[square_row_start + i][square_col_start + j] == num) {
          return false;
        }
      }
    }
    return true;
  };
  
  const solve = (grid) => {
      for (let row = 0; row < 9; row++) {
          for (let col = 0; col < 9; col++) {
              if (grid[row][col] == 0) {
                  for (let n = 1; n < 10; n++) {
                      if (possible(row, col, n, grid)) {
                          grid[row][col] = n
                          solve(grid)
                          grid[row][col] = 0
                      }
                  }
                  return
              }
          }
      }
      console.log(sudoku_grid)
  }
  
  solve(sudoku_grid)
  