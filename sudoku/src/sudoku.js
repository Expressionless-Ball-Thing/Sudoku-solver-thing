const possible = (row, col, num, grid) => {
  for (let i = 0; i < grid.length; i++) {
    if (grid[row][i] === num) {
      return false;
    }
  }
  for (let i = 0; i < grid.length; i++) {
    if (grid[i][col] === num) {
      return false;
    }
  }
  var factor = Math.floor(Math.sqrt(grid.length))
  var square_col_start = Math.floor(col / factor) * factor;
  var square_row_start = Math.floor(row / factor) * factor;
  for (let i = 0; i < factor; i++) {
    for (let j = 0; j < factor; j++) {
      if (grid[square_row_start + i][square_col_start + j] === num) {
        return false;
      }
    }
  }
  return true;
}

export {possible}