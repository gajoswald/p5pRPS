class Play {
  static all = {}
  static art = {}
  
  static Type = {
    Rock: "Rock",
    Paper: "Paper",
    Scissors: "Scissors"
  }

  static Beats = {
    Rock: Play.Type.Scissors,
    Paper: Play.Type.Rock,
    Scissors: Play.Type.Paper
  }

  static initializeStatic() {
    for( const type in Play.Type ) {
      Play.all[type] = new Group()
      Play.art[type] = spriteArt(Play.Art[type],2,palette)
    }
  }

  static createPlay(type, {
    x = random(width),
    y = random(height),
    velocity = {x: random(-3,3), y: random(-3,3)},
  } = {}) {
    const newSprite = new Play.all[type].Sprite()
    newSprite.img = Play.art[type]
    newSprite.x = x
    newSprite.y = y
    newSprite.velocity.x = velocity.x
    newSprite.velocity.y = velocity.y
    newSprite.rotation = atan2(newSprite.velocity.y, newSprite.velocity.x)
    newSprite.bounciness = 1.1
  }

  static populate(n) {
    for( const type in Play.Type ) {
      for( let i = 0; i < n; i++ ) {
        Play.createPlay(type)
      }
    }

    for( const k in Play.Beats ) {
      console.log( k,  )
      Play.all[k].overlaps(Play.all[Play.Beats[k]], (a,b) => {
        const c = Play.createPlay( k, {x:b.x, y:b.y, velocity:b.velocity})
        b.remove()
      })
    }
  }
}

Play.Art = {
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