class RPSArt {
  static string = {
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
}
class Play {  
  static Rock = new Play("Rock")
  static Paper = new Play("Paper")
  static Scissors = new Play("Scissors")
  
  static random() {
    return random([Play.Rock, Play.Paper,Play.Scissors])
  }

  constructor( name ) { 
    this.name = name 
    this.art = spriteArt(RPSArt.string[name],2,palette)
  }
}