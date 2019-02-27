const Twit = require("twit");
const t = new Twit({
  // CONFIGURRATION
  consumer_key: "YOUR_KEY",
  consumer_secret: "YOUR_KEY",
  access_token: "YOUR_KEY",
  access_token_secret: "YOUR_KEY"
});

exports.postContent = (content, status) => {
  // POSTING GAMBAR
  t.post("media/upload", { media_data: content }, (err, data, response) => {
    if (err) {
      console.log("Terjadi error", err);
    } else {
      // GET ID IMAGE
      let id = data.media_id_string;
      // BUAT OBYEK STATUS
      let tweet = {
        status: status,
        media_ids: [id]
      };

      // POSTING STATUS DENGAN GAMBAR
      t.post("statuses/update", tweet, (err, data, response) => {
        if (err) {
          console.log("Terjadi error", err);
        } else {
          console.log("Success posting");
        }
      });
    }
  });
};
