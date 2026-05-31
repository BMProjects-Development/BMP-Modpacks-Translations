const addBiomeTags = [
  {
    tagName: "ftb:is_stone",
    biomeIDs: ["ftb:lower/stone", "ftb:middle/stone", "ftb:upper/stone", "ftb:stone" ]
  },
  {
    tagName: "ftb:is_deepslate",
    biomeIDs: [
      "ftb:lower/deepslate",
      "ftb:middle/deepslate",
      "ftb:upper/deepslate",
      "ftb:deepslate"
    ]
  },
  {
    tagName: "ftb:is_nether",
    biomeIDs: ["ftb:lower/nether", "ftb:middle/nether", "ftb:upper/nether", "ftb:nether" ]
  },
  {
    tagName: "ftb:is_end",
    biomeIDs: ["ftb:lower/end", "ftb:middle/end", "ftb:upper/end", "ftb:end" ]
  },
  {
    tagName: "ftb:is_ocean",
    biomeIDs: ["ftb:lower/ocean", "ftb:middle/ocean", "ftb:upper/ocean", "ftb:ocean" ]
  },
  {
    tagName: "ftb:is_twilight_forest",
    biomeIDs: [
      "ftb:lower/twilight_forest",
      "ftb:middle/twilight_forest",
      "ftb:upper/twilight_forest",
      "ftb:twilight_forest"
    ]
  },
  {
    tagName: "ftb:is_void_chasms",
    biomeIDs: [
      "ftb:lower/void_chasms",
      "ftb:middle/void_chasms",
      "ftb:upper/void_chasms",
      "ftb:void_chasms"
    ]
  },
  {
    tagName: "ftb:is_any",
    biomeIDs: [
      "#ftb:is_stone",
      "#ftb:is_deepslate",
      "#ftb:is_nether",
      "#ftb:is_end",
      "#ftb:is_ocean",
      "#ftb:is_twilight_forest",
      "#ftb:is_void_chasms",
      "ftb:eternal_stone"
    ]
  },
  {
    tagName: "ftb:is_twilight",
    biomeIDs: ["ftb:lower/twilight_forest", "ftb:twilight_forest", "ftb:upper/twilight_forest"]
  },
  {
    tagName: "ftb:both_stones",
    biomeIDs: ["#ftb:is_stone", "#ftb:is_deepslate" ]
  },
  {
    tagName: "justdirethings:unstable_portal_fluid_viable",
    biomeIDs: ["#ftb:is_end"]
  }
]

const removeBiomeTags = []

ServerEvents.tags("worldgen/biome", (event) => {
  addBiomeTags.forEach((tag) => {
    event.add(tag.tagName, tag.biomeIDs)
  })

  removeBiomeTags.forEach((tag) => {
    event.remove(tag.tagName, tag.biomeIDs)
  })
})
