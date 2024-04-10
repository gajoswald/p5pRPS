// https://sashamaps.net/docs/resources/20-colors/
let palette = {a:'#e6194b', b:'#3cb44b', c:'#ffe119', d:'#4363d8', e:'#f58231', f:'#911eb4', g:'#46f0f0', h:'#f032e6', i:'#bcf60c', j:'#fabebe', k:'#008080', l:'#e6beff', m:'#9a6324', n:'#fffac8', o:'#800000', p:'#aaffc3', q:'#808000', r:'#ffd8b1', s:'#000075', t:'#808080', y:'#ffffff', z:'#000000'}

let data = []
const N = 33
let game
function setup() {
  new Canvas(windowWidth-10, windowHeight-10)
  for( [k,v] of Object.entries(palette) ) { palette[k] = color(v) }
  background(255)
  game = new Game()
  game.addType("Rock",spriteArt(Art.Rock,2,palette))
  game.addType("Paper",spriteArt(Art.Paper,2,palette))
  game.addType("Scissors",spriteArt(Art.Scissors,2,palette))
  game.addRule("Rock","Scissors")
  game.addRule("Paper","Rock")
  game.addRule("Scissors","Paper")
  game.populate()
  boundaries() 
}

function boundaries() {
  createBoundary(0,0,width*2,1,"s")
  createBoundary(0,0,1,height*2,"s")
  createBoundary(0,height,width*2,1,"s")
  createBoundary(width,0,1,height*2,"s")
}

function createBoundary( x,y,w,h ) {
  const b = new Sprite(x,y,w,h,"s")
  b.friction = 0
}

function draw() {
  const rocks = game.getTypeCount("Rock")
  const papers = game.getTypeCount("Paper")
  const scissorss = game.getTypeCount("Scissors")
  clear()
  fill( palette.a )
  text( `Rock: ${rocks}`, 10, 10 )
  fill( palette.b )
  text(`Paper: ${papers}`, 10, 22 )
  fill( palette.c )
  text(`Scissors: ${scissorss}`, 10, 34 )
  data.push( [rocks,papers,scissorss] )
  if( rocks === N*3 || papers === N*3 || scissorss === N*3 ) {
    noLoop()
    allSprites.remove()
    fill('white')
    noStroke()
    const h_3 = height/4
    rect(0,h_3,width,2*h_3)
    const dx = width/data.length
    for( let i = 0; i < data.length; i++ ) {
      const d = data[i]
      fill(palette.a)
      circle(dx*i,map(d[0],0,99,3*h_3,h_3),2)
      fill(palette.b)
      circle(dx*i,map(d[1],0,99,3*h_3,h_3),2)
      fill(palette.c)
      circle(dx*i,map(d[2],0,99,3*h_3,h_3),2)
    }
  }
}

function keyPressed() {
  if( key === 'r' ) {
    data = []
    game.populate()
    boundaries()
    loop()
  }
  if( key === 's' ) {
    saveCanvas(`RPSresults${Date.now()}.png`)
  }
  if( key === 'v' ) {
    for( const s of allSprites ) {
      s.velocity = {x: random(-3,3), y: random(-3,3)}
    }
  }
}