const possible = (row, col, num, grid) => {
  num = parseInt(num)
  for (let i = 0; i < grid.length; i++) {
    if (parseInt(grid[row][i]) === num) {
      return false;
    }
  }
  for (let i = 0; i < grid.length; i++) {
    if (parseInt(grid[i][col]) === num) {
      return false;
    }
  }
  let factor = Math.floor(Math.sqrt(grid.length))
  let square_col_start = Math.floor(col / factor) * factor;
  let square_row_start = Math.floor(row / factor) * factor;
  for (let i = 0; i < factor; i++) {
    for (let j = 0; j < factor; j++) {
      if (parseInt(grid[square_row_start + i][square_col_start + j]) === num) {
        return false;
      }
    }
  }
  return true;
}

export {possible}