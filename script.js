//login and get player info
var email = localStorage.getItem('email');
var password = localStorage.getItem('password');
var user;
firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    user = userCredential.user;
    console.log('User signed in:', user);
    localStorage.setItem('userInfo', user);
  if (user.displayName == null){
    user.displayName = prompt("Enter a display name");
  }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert('Incorrect Credentials');
    console.log('Error signing in:', errorCode, errorMessage);
  });

//setting up canvas
let playerposx = 0;
let playerposy = 0;
let map = "\
gggggggggggggggg\
gggqwwwwwwegqwwb\
ggqntsrxysdgatdg\
ggahstvwnhvwnhcg";
let maptop = "\
                \
              r \
                \
                "
function printTile(tileset, xtile, ytile, printx, printy) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  ctx.drawImage(tileset, xtile * 64, ytile * 64, 64, 64, printx * (canvas.width / 16) - playerposx, printy * (canvas.height / 10) - playerposy, canvas.width / 16, canvas.height / 10);
}
function getTile(tile, j, i, tileset) {
  if (tile == "q") {
    printTile(tileset, 0, 0, j, i);
  } else if (tile == "w") {
    printTile(tileset, 1, 0, j, i);
  } else if (tile == "e") {
    printTile(tileset, 2, 0, j, i);
  } else if (tile == "r") {
    printTile(tileset, 3, 0, j, i);
  } else if (tile == "t") {
    printTile(tileset, 4, 0, j, i);
  } else if (tile == "y") {
    printTile(tileset, 5, 0, j, i)
  } else if (tile == "a") {
    printTile(tileset, 0, 1, j, i);
  } else if (tile == "s") {
    printTile(tileset, 1, 1, j, i);
  } else if (tile == "d") {
    printTile(tileset, 2, 1, j, i);
  } else if (tile == "f") {
    printTile(tileset, 3, 1, j, i);
  } else if (tile == "g") {
    printTile(tileset, 4, 1, j, i);
  } else if (tile == "h") {
    printTile(tileset, 5, 1, j, i);
  } else if (tile == "z") {
    printTile(tileset, 0, 2, j, i);
  } else if (tile == "x") {
    printTile(tileset, 1, 2, j, i);
  } else if (tile == "c") {
    printTile(tileset, 2, 2, j, i);
  } else if (tile == "v") {
    printTile(tileset, 3, 2, j, i);
  } else if (tile == "b") {
    printTile(tileset, 4, 2, j, i);
  } else if (tile == "n") {
    printTile(tileset, 5, 2, j, i);
  }
}
function printMap() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const tileset_meadow = document.getElementById("tileset_meadow_id");
  ctx.drawImage(tileset_meadow, 64, 64, 64, 64, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j++) {
      let tile = map[i * 16 + j];
      getTile(tile, j, i, tileset_meadow)
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 16; j++) {
      let tile = maptop[i * 16 + j];
      getTile(tile, j, i, tileset_meadow)
    }
  }
};
window.onload = function() {
  var key_w = 87;
  var key_a = 65;
  var key_s = 83;
  var key_d = 68;

  window.onkeydown = function(gfg) {
    if (gfg.keyCode === key_w) {
      playerposy = playerposy - 16;
    };
    if (gfg.keyCode === key_s) {
      playerposy = playerposy + 16;
    };
    if (gfg.keyCode === key_a) {
      playerposx = playerposx - 16;
    };
    if (gfg.keyCode === key_d) {
      playerposx = playerposx + 16;
    };
    writeData(playerposx, user.displayName+"/x/")
    writeData(playerposy, user.displayName+"/y/")
    printMap()
  };
};
