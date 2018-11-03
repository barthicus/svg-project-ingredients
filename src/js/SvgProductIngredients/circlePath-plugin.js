/*
* Snap plugin to draw circle paths
*/
const circlePathPlugin = (Snap, Element, Paper) => {
  Paper.prototype.circlePath = function(cx, cy, r, inside) {
    var sweepFlag = inside === true ? 0 : 1
    var p = 'M' + cx + ',' + cy
    p += 'm' + -r + ',0'
    p += 'a' + r + ',' + r + ' 0 ,0' + sweepFlag + ' ' + (r * 2) +',0'
    p += 'a' + r + ',' + r + ' 0 ,0' + sweepFlag + ' ' + -(r * 2) + ',0'
    return this.path(p, cx, cy)
  }
}

export default circlePathPlugin
