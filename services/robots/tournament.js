const axios = require("axios");
const config = require("dotenv").config();

const url = process.env.lichess_url;
const ndjson = require("ndjson-to-json-text");
const state = require("./state.js");

async function robot(content) {
  const result = await axios.get(`${url}tournament/${content.id}/results`);
  var data = JSON.parse(ndjson.ndjsonToJsonText(result.data));

  state.save(content);

  //content.data = data;
  content.dataMz = [];

  data.forEach(async function (p) {
    try {
      const player = await axios.get(`${url}user/${p.username}`).data;
      if (player.profile.country === "MZ") {
        content.dataMz.push(p);
      }
    } catch (e) {}
  });
}

module.exports = robot;
