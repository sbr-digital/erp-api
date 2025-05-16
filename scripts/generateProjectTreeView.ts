import * as fs from 'node:fs'
import * as path from 'node:path'

import * as d3 from 'd3'
import jsdom from 'jsdom'

interface FileNode {
  name: string
  children?: FileNode[]
}
const { JSDOM } = jsdom

const width = process.argv[2] ?? 1800
const height = process.argv[3] ?? 1200

const rootDir = process.argv[4]
  ? path.join(__dirname, process.argv[4])
  : path.join(__dirname, '../src')

const fileName = process.argv[5] ?? 'API'

const outDir = path.join(__dirname, `../docs/images/${fileName}-treeView.svg`)

const getDirectoryTree = (dirPath: string): FileNode => {
  const stats = fs.statSync(dirPath)
  const info: FileNode = {
    name: path.basename(dirPath),
  }

  if (stats.isDirectory()) {
    info.children = fs
      .readdirSync(dirPath)
      .map((child) => getDirectoryTree(path.join(dirPath, child)))
  }

  return info
}

const directoryTree = getDirectoryTree(rootDir)

const generateSvg = (
  directoryTree: FileNode,
  outputPath: string,
  width: number,
  height: number,
) => {
  const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
  const svg = d3
    .select(dom.window.document.body)
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  svg
    .append('rect')
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'white')

  const treeLayout = d3.tree<FileNode>().size([height - 50, width - 320])
  const root = d3.hierarchy(directoryTree)

  treeLayout(root)

  const g = svg.append('g').attr('transform', 'translate(80,0)')

  g.selectAll('line')
    .data(root.links())
    .enter()
    .append('line')
    .attr('x1', (d) => d.source.y! + 100)
    .attr('y1', (d) => d.source.x ?? 0)
    .attr('x2', (d) => d.target.y ?? 0)
    .attr('y2', (d) => d.target.x ?? 0)
    .attr('stroke', 'black')

  g.selectAll('circle')
    .data(root.descendants())
    .enter()
    .append('circle')
    .attr('cx', (d) => d.y!)
    .attr('cy', (d) => d.x!)
    .attr('r', 5)
    .attr('fill', 'blue')

  g.selectAll('text')
    .data(root.descendants())
    .enter()
    .append('text')
    .attr('x', (d) => d.y! + 10)
    .attr('y', (d) => d.x! + 3)
    .text((d) => d.data.name)
    .attr('font-size', '12px')
    .attr('font-family', 'Arial')
    .attr('font-weight', 'bold')

  try {
    const svgString = dom.window.document.body.innerHTML
    fs.writeFileSync(outputPath, svgString)
    console.log('SVG file generated at ' + outDir)
  } catch (error) {
    console.error('Error: ' + error)
  }
}

generateSvg(directoryTree, outDir, +width, +height)
