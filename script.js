new p5()

// https://sashamaps.net/docs/resources/20-colors/
let palette = {a:'#e6194b', b:'#3cb44b', c:'#ffe119', d:'#4363d8', e:'#f58231', f:'#911eb4', g:'#46f0f0', h:'#f032e6', i:'#bcf60c', j:'#fabebe', k:'#008080', l:'#e6beff', m:'#9a6324', n:'#fffac8', o:'#800000', p:'#aaffc3', q:'#808000', r:'#ffd8b1', s:'#000075', t:'#808080', y:'#ffffff', z:'#000000'}

let groups = {
  Rock:{},
  Paper:{},
  Scissors:{}
}

function setup() {
  new Canvas(windowWidth, windowHeight)
  for( [k,v] of Object.entries(palette) ) { palette[k] = color(v) }
  background(255)
  for( const g in groups ) {
    groups[g] = new Group()    
    for( let i = 0; i < 33; i++ ) {
      createPlay(g)
    }
  }

  new Sprite(0,0,width*2,1,"s")
  new Sprite(0,0,1,height*2,"s")
  new Sprite(0,height,width*2,1,"s")
  new Sprite(width,0,1,height*2,"s")

  groups.Rock.overlaps(groups.Scissors, (a,b) => {
    const c = createPlay( Play.Rock.name, {x:b.x, y:b.y, velocity:b.velocity} )
    b.remove()    
  })
  groups.Paper.overlaps(groups.Rock, (a,b) => {
    const c = createPlay( Play.Paper.name, {x:b.x, y:b.y, velocity:b.velocity} )
    b.remove()    
  })
  groups.Scissors.overlaps(groups.Paper, (a,b) => {
    const c = createPlay( Play.Scissors.name, {x:b.x, y:b.y, velocity:b.velocity} )
    b.remove()    
  })
}

function createPlay(type, {
  x = random(width),
  y = random(height),
  velocity = {x: random(-1,1), y: random(-1,1)},
} = {}) {
  const newSprite = new groups[type].Sprite()
  newSprite.img = Play[type].art
  newSprite.x = x
  newSprite.y = y
  newSprite.velocity.x = velocity.x
  newSprite.velocity.y = velocity.y
  newSprite.rotation = atan2(newSprite.velocity.y, newSprite.velocity.x)
}


function draw() {
  clear()
  fill( palette.a )
  text( `Rock: ${groups.Rock.length}`, 10, 10 )
  fill( palette.b )
  text(`Paper: ${groups.Paper.length}`, 10, 22 )
  fill( palette.c )
  text(`Scissors: ${groups.Scissors.length}`, 10, 34 )
}