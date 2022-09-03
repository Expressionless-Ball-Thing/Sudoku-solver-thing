const possible = (row, col, num, grid) => {
  let temp_grid = [...grid]
  num = parseInt(num)
  for (let i = 0; i < temp_grid.length; i++) {
    if (temp_grid[row][i] === num) {
      return false;
    }
  }
  for (let i = 0; i < temp_grid.length; i++) {
    if (temp_grid[i][col] === num) {
      return false;
    }
  }
  let factor = Math.floor(Math.sqrt(temp_grid.length))
  let square_col_start = Math.floor(col / factor) * factor;
  let square_row_start = Math.floor(row / factor) * factor;
  for (let i = 0; i < factor; i++) {
    for (let j = 0; j < factor; j++) {
      if (temp_grid[square_row_start + i][square_col_start + j] === num) {
        return false;
      }
    }
  }
  return true;
}

export {possible}