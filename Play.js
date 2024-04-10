class Game {
  constructor(N = 33) {
    this.N = N
    this.type = {}
    this.rules = {}
  }

  getTypeCount(type) { return this.type[type]?.group.length ?? 0 }

  addType(name, art) {
    this.type[name] = {
      group: new Group(),
      art: art ?? undefined
    }
  }

  addRule(a,b) {
    if( this.type[a] && this.type[b] ) {
      this.rules[a] = b
      this.type[a].group.overlaps(this.type[b].group, (winner,loser) => {
        this.addSprite( a, {x:loser.x, y:loser.y, velocity:loser.velocity})
        loser.remove()
      })
    }
  }

  addArt(type,art) {
    if( this.type[type] ) {
      this.type[type].art = art
    }
  }

  addSprite(type, {
      x = random(width),
      y = random(height),
      velocity = {x: random(-3,3), y: random(-3,3)},
    } = {}) {
    if( this.type[type] ) {
      const newSprite = new this.type[type].group.Sprite()
      if( this.type[type].art ) {
        newSprite.img = this.type[type].art
      }
      newSprite.x = x
      newSprite.y = y
      newSprite.velocity = velocity
      newSprite.rotation = atan2(newSprite.velocity.y, newSprite.velocity.x)
      newSprite.bounciness = 1.1
    }
  }

  populate(n = this.N) {
    for( const type in this.type ) {
      for( let i = 0; i < n; i++ ) {
        this.addSprite(type)
      }
    }
  }
}

Art = {
  Rock: `
aaaaaa
.a   aa
.a    aa
.a     a
.a    aa
.a   aa
.aaaa
.a  aa
.a   aa
.a    aa
.a     a
aa     aa
`,
Paper: `
bbbbbb
.b   bb
.b    bb
.b     b
.b    bb
.b   bb
.bbbbb
.b
.b
.b
.b
bb
`,
Scissors: `
.ccccc
cc   cc
cc    cc
.c     c
..c   cc
...cc 
....cc
cc....cc
c......c
cc.....c
.cc...cc
..ccccc
`
}