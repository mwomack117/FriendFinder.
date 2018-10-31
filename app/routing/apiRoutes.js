
var friendsData = require("../data/friends.js")

module.exports = function (app) {

  // API GET requests and response JSON array of objects
  // (ex: localhost:PORT/api/fiends... they are shown a JSON of the data in the table)
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);

  });

  // API POST Requests
  app.post("/api/friends", function (req, res) {
    //push newFriend to friendsData array
    var newFriend = req.body;
    friendsData.push(newFriend);


    // ----- Find best match ----- //

    var bestMatch = {}; // Empty object where we will add closest match
    var matchedFriend = 0; // matched friend index from array
    var bestMatchedScore = 40; // Max different score would be 40 (50-10)

    // Loop through all friends in friendsData array
    for (let f = 0; f < friendsData.length; f++) {
      var totalDiff = 0;
      // Loop thorugh each friends scores
      for (let s = 0; s < friendsData[f].scores.length; s++) {
        var diff = Math.abs(parseInt(friendsData[f].scores) - parseInt(newFriend.scores[s]));
        totalDiff += diff;
      } // end inner loop
      // check to see if above logic works accurately
      console.log(totalDiff, friendsData[f].name)

      if (totalDiff < bestMatchedScore) {
        matchedFriend = f;
        bestMatchedScore = totalDiff;
      }

    } // end outer loop

    // best match found
    bestMatch = friendsData[matchedFriend];
    //return best match as JSON
    res.json(bestMatch);


  })

};