Array.prototype.rotate = function(reverse) {
  if (reverse) this.unshift(this.pop());
  else this.push(this.shift());
}

Array.prototype.vecSum = function(other) {
    return [this[0] + other[0], this[1] + other[1]];
}

Array.prototype.vecDiff = function(other) {
    return [this[0] - other[0], this[1] - other[1]];
}
