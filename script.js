new p5()

// https://sashamaps.net/docs/resources/20-colors/
let palette = {a:'#e6194b', b:'#3cb44b', c:'#ffe119', d:'#4363d8', e:'#f58231', f:'#911eb4', g:'#46f0f0', h:'#f032e6', i:'#bcf60c', j:'#fabebe', k:'#008080', l:'#e6beff', m:'#9a6324', n:'#fffac8', o:'#800000', p:'#aaffc3', q:'#808000', r:'#ffd8b1', s:'#000075', t:'#808080', y:'#ffffff', z:'#000000'}

let groups = {
  Rock:{},
  Paper:{},
  Scissors:{}
}

let data = []

function setup() {
  new Canvas(windowWidth-10, windowHeight-10)
  for( [k,v] of Object.entries(palette) ) { palette[k] = color(v) }
  background(255)

  populate()
  boundaries() 
}

function populate() {
  for( const g in groups ) {
    groups[g] = new Group()    
    for( let i = 0; i < 33; i++ ) {
      createPlay(g)
    }
  }
  
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

function createPlay(type, {
  x = random(width),
  y = random(height),
  velocity = {x: random(-3,3), y: random(-3,3)},
} = {}) {
  const newSprite = new groups[type].Sprite()
  newSprite.img = Play[type].art
  newSprite.x = x
  newSprite.y = y
  newSprite.velocity.x = velocity.x
  newSprite.velocity.y = velocity.y
  newSprite.rotation = atan2(newSprite.velocity.y, newSprite.velocity.x)
  newSprite.bounciness = 1.1
}


function draw() {
  clear()
  fill( palette.a )
  text( `Rock: ${groups.Rock.length}`, 10, 10 )
  fill( palette.b )
  text(`Paper: ${groups.Paper.length}`, 10, 22 )
  fill( palette.c )
  text(`Scissors: ${groups.Scissors.length}`, 10, 34 )
  data.push( [groups.Rock.length,groups.Paper.length,groups.Scissors.length] )
  if( groups.Rock.length === 99 || groups.Paper.length === 99 || groups.Scissors.length === 99 ) {
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
    populate()
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