// kubejs/server_scripts/world_engine_recipes.js

// Reusable structure presets. Add any you like, then reference by name in recipes.structures
const DEBUG_WE = false;
const STRUCTURES = {
  dark_void_upgrade: {
    keys: {
      a: "projecte:dark_matter_block",
      b: "xycraft_machines:void_container",
    },
    pattern: [
      ["a", " ", " ", " ", " ", " "],
      ["b", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", "m"],
    ]
  },
  infinity_upgrade: {
    keys: { a: "oritech:reactor_reflector", b: "avaritia:infinity_block" },
    pattern: [
      ["a", " ", " ", " ", " ", " "],
      ["a", " ", " ", " ", " ", " "],
      ["b", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", "m"],
    ]
  },
  euphonium_upgrade: {
    keys: { a: "ftb:euphonium" },
    pattern: [
      [
        "  aaa  ",
        " a   a ",
        "a     a",
        "a     a",
        "a     a",
        " a   a ",
        "  aaa  ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "   m   ",
      ],
    ]
  },
  tesseract_upgrade: {
    keys: { a: "tesseract:tesseract" },
    pattern: [
      ["a", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "m"],
    ]
  },
  chroniton_upgrade: {
    keys: { a: "ftb:chroniton_glass" },
    pattern: [
      [
        "   a a   ",
        "         ",
        "         ",
        "a       a",
        "         ",
        "a       a",
        "         ",
        "         ",
        "   a a   ",
        "         ",
      ],
      [
        "   a a   ",
        " aa   aa ",
        " a     a ",
        "a       a",
        "         ",
        "a       a",
        " a     a ",
        " aa   aa ",
        "   a a   ",
        "         ",
      ],
      [
        "   a a   ",
        "         ",
        "         ",
        "a       a",
        "         ",
        "a       a",
        "         ",
        "         ",
        "   a a   ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "    m    ",
      ],
    ]
  },
  quantum_tunnel_upgrade: {
    keys: { a: "ae2:quantum_ring", b: "ae2:quantum_link" },
    pattern: [
      ["   ", "aaa"],
      ["   ", "aba"],
      ["   ", "aaa"],
      ["   ", "   "],
      ["   ", "   "],
      ["   ", "   "],
      [" m ", "   "],
    ]
  },
  enchanting_upgrade: {
    keys: {
      a: "apothic_enchanting:deepshelf",
      b: "apothic_enchanting:echoing_deepshelf",
    },
    pattern: [
      [
        "aba",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "aba",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
      ],
      [
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        "   ",
        " m ",
      ],
    ]
  },
  ender_power_upgrade: {
    keys: { a: "powah:ender_cell_nitro" },
    pattern: [
      ["a", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
      [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "m"],
    ]
  },
  resonant_void_upgrade: {
    keys: { a: "ftb:resonant_void" },
    pattern: [
      ["a a", "   "],
      ["   ", " m "],
    ],
  },
  fortron_upgrade: {
    keys: { a: "ftb:fortron_infused_block" },
    pattern: [
      ["a   a", "     ", "     "],
      ["a   a", "     ", "     "],
      ["     ", "     ", "  m  "],
    ]
  },
  advanced_machine_upgrade: {
    keys: { a: "ftb:world_engine_advanced_machine_block" },
    pattern: [
      [
        "   a   a   ",
        "  a     a  ",
        " a       a ",
        "a         a",
        "           ",
        "           ",
        "           ",
        "a         a",
        " a       a ",
        "  a     a  ",
        "   a   a   ",
      ],
      [
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
      ],
      [
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
      ],
      [
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
      ],
      [
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
      ],
      [
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "           ",
        "     m     ",
      ],
    ]
  },
  enderium_upgrade: {
    keys: { a: "ftb:enderium_block" },
    pattern: [
      [
        "  a a  ",
        "       ",
        "a     a",
        "       ",
        "a     a",
        "       ",
        "  a a  ",
        "       ",
        "       ",
      ],
      [
        "  a a  ",
        "       ",
        "a     a",
        "       ",
        "a     a",
        "       ",
        "  a a  ",
        "       ",
        "       ",
      ],
      [
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "   m   ",
      ],
    ]
  },
  spirit_upgrade: {
    keys: { a: "ftb:spirit_block" },
    pattern: [
      [
        "a     a",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "a     a",
        "       ",
        "       ",
      ],
      [
        "a     a",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "a     a",
        "       ",
        "       ",
      ],
      [
        "a     a",
        "       ",
        "       ",
        "       ",
        "       ",
        "       ",
        "a     a",
        "       ",
        "   m   ",
      ],
    ]
  },
  machine_block_upgrade: {
    keys: { a: "ftb:world_engine_machine_block" },
    pattern: [
      [
        "   aaa   ",
        " aa   aa ",
        " a     a ",
        "a       a",
        "a       a",
        "a       a",
        " a     a ",
        " aa   aa ",
        "   aaa   ",
        "         ",
      ],
      [
        "    a    ",
        "         ",
        "         ",
        "         ",
        "a       a",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "    a    ",
        "         ",
        "         ",
        "         ",
        "a       a",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "    a    ",
        "         ",
        "         ",
        "         ",
        "a       a",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "   aaa   ",
        " aaa aaa ",
        " a     a ",
        "aa     aa",
        "a       a",
        "aa     aa",
        " a     a ",
        " aaa aaa ",
        "   a a   ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "    m    ",
      ],
    ]
  },
  twilight_upgrade: {
    keys: {
      a: "twilightforest:snow_queen_wall_trophy",
      b: "twilightforest:lich_trophy",
      c: "twilightforest:hydra_trophy",
      d: "twilightforest:alpha_yeti_trophy",
      e: "twilightforest:knight_phantom_trophy",
    },
    pattern: [
      [
        "    a    ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
      ],
      [
        "         ",
        "         ",
        "b       c",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "d       e",
        "         ",
      ],
      [
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "         ",
        "    m    ",
      ],
    ]
  },
  source_upgrade: {
    keys: { a: "ars_nouveau:sourcestone" },
    pattern: [
      ["a a", "   "],
      ["   ", "   "],
      ["   ", " m "],
    ],
  },
  shadow_casing_upgrade: {
    keys: {
      a: "create:shadow_steel_casing",
      b: "create:encased_chain_drive",
    },
    pattern: [
      [" aaa ", "aaaaa", "aa aa", "aaaaa", " aaa ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "     "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "  b  "],
      ["     ", "     ", "     ", "     ", "     ", "     ", "     ", "  m  "],
    ]
  },
  draconic_upgrade: {
    keys: {
      a: "avaritia:crystal_matrix_block",
      b: "draconicevolution:energy_core_stabilizer",
      c: "draconicevolution:energy_core",
    },
    pattern: [
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "        a   a        ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "        a   a        ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "          m          ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
      ],
      [
        "          b          ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "b         c         b",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "                     ",
        "          b          ",
      ],
    ]
  },
  awakened_core_upgrade: {
    keys: {
      a: "draconicevolution:awakened_draconium_block",
      b: "draconicevolution:draconium_block",
    },
    pattern: [
      [
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "      m      ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "             ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "             ",
        "             ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "   aaaaaaa   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   aaaaaaa   ",
        "             ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "   aaaaaaa   ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "   aaaaaaa   ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "   aaaaaaa   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   aaaaaaa   ",
        "             ",
      ],
      [
        "    aaaaa    ",
        "   abbbbba   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   abbbbba   ",
        "    aaaaa    ",
      ],
      [
        "    aaaaa    ",
        "   abbbbba   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   abbbbba   ",
        "    aaaaa    ",
      ],
      [
        "    aaaaa    ",
        "   abbbbba   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbb bbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   abbbbba   ",
        "    aaaaa    ",
      ],
      [
        "    aaaaa    ",
        "   abbbbba   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   abbbbba   ",
        "    aaaaa    ",
      ],
      [
        "    aaaaa    ",
        "   abbbbba   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        "abbbbbbbbbbba",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   abbbbba   ",
        "    aaaaa    ",
      ],
      [
        "             ",
        "   aaaaaaa   ",
        "  abbbbbbba  ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        " abbbbbbbbba ",
        "  abbbbbbba  ",
        "   aaaaaaa   ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "   aaaaaaa   ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "  abbbbbbba  ",
        "   aaaaaaa   ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "   aaaaaaa   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   abbbbba   ",
        "   aaaaaaa   ",
        "             ",
        "             ",
        "             ",
      ],
      [
        "             ",
        "             ",
        "             ",
        "             ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "    aaaaa    ",
        "             ",
        "             ",
        "             ",
        "             ",
      ],
    ]
  },
};

// ---------- Helpers ----------
// --- World Engine debug instrumentation ---
function weLog() {
  if (!DEBUG_WE) return;
  var s = "[WE]";
  for (var i = 0; i < arguments.length; i++) s += " " + String(arguments[i]);
  console.log(s);
}

function parseCountFromString(s) {
  var m = /^\s*(\d+)\s*x\s+/i.exec(s);
  return m ? parseInt(m[1]) : 1;
}

function describeIngredient(ing) {
  if (typeof ing === "string") {
    return { kind: "string", count: parseCountFromString(ing), bracket: ing };
  }
  try {
    var bracket = "" + ing;
    var count = null;
    try {
      count = ing.count || (ing.getCount && ing.getCount());
    } catch (_) {}
    return { kind: "stack", count: count || 1, bracket: bracket };
  } catch (e) {
    return { kind: "unknown", count: 1, bracket: String(ing) };
  }
}

function applyCount(ing, amount) {
  if (!amount || amount <= 0) return ing;
  if (typeof ing === "string") {
    if (/^\s*\d+\s*x\s+/i.test(ing)) return ing;
    return amount + "x " + ing;
  }
  try {
    if (typeof ing.withCount === "function") return ing.withCount(amount);
    if ("count" in ing) {
      ing.count = amount;
      return ing;
    }
  } catch (_) {}
  return ing;
}

function normalizePattern(p) {
  if (!Array.isArray(p) || p.length === 0) return null;
  // Allow ["aaa","ama","aaa"] → wrap as single floor
  if (typeof p[0] === "string") return [p];
  // Already floors -> rows
  return p;
}

function countAndValidateM(pattern) {
  var c = 0;
  for (var f = 0; f < pattern.length; f++) {
    var rows = pattern[f];
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      for (var k = 0; k < row.length; k++) if (row.charAt(k) === "m") c++;
    }
  }
  return c;
}

function gatherUsedLetters(pattern) {
  var used = {};
  for (var f = 0; f < pattern.length; f++) {
    var rows = pattern[f];
    var width = rows[0].length;
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      if (row.length !== width) {
        throw new Error("All rows in a floor must have same width");
      }
      for (var k = 0; k < row.length; k++) {
        var ch = row.charAt(k);
        if (ch !== " " && ch !== "m") used[ch] = true;
      }
    }
  }
  return Object.keys(used);
}

function ensureKeys(keysIn, lettersNeeded) {
  var keys = keysIn || {};
  for (var i = 0; i < lettersNeeded.length; i++) {
    var ch = lettersNeeded[i];
    if (ch === "m") continue;
    if (!keys.hasOwnProperty(ch)) {
      throw new Error("Missing key mapping for letter '" + ch + "'");
    }
    var v = keys[ch];
    if (typeof v !== "string" || v.length === 0) {
      throw new Error("Key '" + ch + "' must map to a block id or tag string");
    }
  }
  return keys;
}

function asItemStack(x) {
  if (typeof x === "string") return Item.of(x);
  if (x && typeof x === "object") {
    var id = x.id ? x.id : x.item ? x.item : x.tag ? x.tag : null;
    if (!id) return null;
    // Inputs may be tags; outputs must be items
    if (id.charAt && id.charAt(0) === "#") return Ingredient.of(id);
    if (x.tag) return Ingredient.of(x.tag);
    var count = x.count ? x.count : 1;
    var nbt = x.nbt ? x.nbt : null;
    return nbt ? Item.of(id, count, nbt) : Item.of(id, count);
  }
  return null;
}

function asFluidStack(x) {
  if (typeof x === "string") return Fluid.of(x, 1000);
  if (x && typeof x === "object") {
    var id = x.id ? x.id : x.fluid ? x.fluid : null;
    var amount = x.amount
      ? x.amount
      : x.mb
      ? x.mb
      : x.millibuckets
      ? x.millibuckets
      : 1000;
    return Fluid.of(id, amount);
  }
  return null;
}

function applySource(builder, r) {
  if (!r) return;
  // Total Source
  if (r.source != null && hasFn(builder, "requireSource")) {
    var amt =
      typeof r.source === "number"
        ? r.source
        : r.source && r.source.amount != null
        ? r.source.amount
        : null;
    if (amt != null) builder.requireSource(amt);
  }
  // Per-tick Source (optional)
  if (r.sourcePerTick != null && hasFn(builder, "requireSourcePerTick")) {
    var per =
      typeof r.sourcePerTick === "number"
        ? r.sourcePerTick
        : r.sourcePerTick && r.sourcePerTick.amount != null
        ? r.sourcePerTick.amount
        : null;
    if (per != null) builder.requireSourcePerTick(per);
  }
}

/**
 * structures can be:
 *   - ["presetName", ...]
 *   - [{ pattern, keys }, ...]   // inline
 * STRUCTURES is an optional global map of presets { pattern, keys }.
 */
function applyStructures(builder, defs) {
  if (!defs) return;
  var list = Array.isArray(defs) ? defs : [defs];
  var applied = 0;

  for (var i = 0; i < list.length; i++) {
    var ref = list[i];
    var def =
      typeof ref === "string"
        ? typeof STRUCTURES !== "undefined"
          ? STRUCTURES[ref]
          : null
        : ref;

    if (!def) {
      weLog("[WorldEngine] Structure preset not found: " + ref);
      continue;
    }

    var pat = normalizePattern(def.pattern);
    if (!pat) {
      weLog(
        "[WorldEngine] Invalid structure pattern for ref: " +
          JSON.stringify(ref)
      );
      continue;
    }

    try {
      var mCount = countAndValidateM(pat);
      if (mCount !== 1)
        throw new Error(
          "Pattern must contain exactly one 'm' (found " + mCount + ")"
        );

      var needed = gatherUsedLetters(pat);
      var keys = ensureKeys(def.keys, needed);

      builder.requireStructure(pat, keys);
      applied++;
    } catch (err) {
      weLog("[WorldEngine] requireStructure validation failed: " + err);
    }
  }

  if (applied === 0) {
    weLog("[WorldEngine] No structure requirement applied for this recipe.");
  }
}

function applySU(builder, su) {
  if (su == null) return;
  if (typeof su === "number") {
    builder.requireSU(su);
    return;
  }
  if (Array.isArray(su)) {
    var speedA = su.length > 0 ? su[0] : null;
    var stressA = su.length > 1 ? su[1] : null;
    if (stressA != null) builder.requireSU(speedA, stressA);
    else builder.requireSU(speedA);
    return;
  }
  if (typeof su === "object") {
    var speed = su.speed != null ? su.speed : null;
    var stress =
      su.stressImpact != null
        ? su.stressImpact
        : su.stress != null
        ? su.stress
        : null;
    if (speed == null) return;
    if (stress != null) builder.requireSU(speed, stress);
    else builder.requireSU(speed);
  }
}

// Temperature: CM expects a range string like "[50,120]", "[50,)", "*", or "1"
function applyTemp(builder, temp) {
  if (temp == null) return;

  var rangeStr = null;

  if (typeof temp === "string") {
    rangeStr = temp;
  } else if (typeof temp === "number") {
    rangeStr = String(temp);
  } else if (Array.isArray(temp)) {
    var minA = temp.length > 0 && temp[0] != null ? temp[0] : "";
    var maxA = temp.length > 1 && temp[1] != null ? temp[1] : "";
    rangeStr = "[" + minA + "," + maxA + "]";
  } else if (typeof temp === "object") {
    var min = temp.min != null ? temp.min : "";
    var max = temp.max != null ? temp.max : "";
    var lowerInc = temp.lowerInc === false ? "(" : "[";
    var upperInc = temp.upperInc === false ? ")" : "]";
    rangeStr = lowerInc + min + "," + max + upperInc;
  }

  if (rangeStr) {
    builder.requireTempCelsius(rangeStr);
  }
}

function hasFn(obj, name) {
  try {
    return obj && obj[name] != null;
  } catch (e) {
    return false;
  }
}

function normSlot(s) {
  if (s == null) return null;
  var v = String(s).toLowerCase();
  return v === "*" || v === "any" || v === "" ? null : String(s);
}

// helper: try tag-first, fall back to requireItem if the tag method isn't available in your CM build

// --- callRequire (final, no duplicates) ---
function callRequire(builder, opts) {
  var isTag = opts && opts.isTag ? true : false;
  var raw = opts ? opts.tagOrStack : null;
  var amount = opts ? opts.amount : 0;
  var slotId =
    opts && opts.slotId !== undefined && opts.slotId !== null
      ? String(opts.slotId)
      : null;

  // Prefer tag API when caller says this is a tag string like "#c:ingots/iron"
  try {
    if (isTag && typeof builder.requireItemTag === "function") {
      var tagIn = applyCount(raw, amount); // keep as string, allow "Nx #tag"
      var d1 = describeIngredient(tagIn);
      weLog(
        "requireItemTag",
        slotId !== null ? "slot=" + slotId : "slot=<any>",
        "kind=" + d1.kind,
        "count=" + d1.count,
        "payload=" + d1.bracket
      );
      if (slotId !== null) {
        return builder.requireItemTag(tagIn, d1.count, slotId);
      } else {
        return builder.requireItemTag(tagIn, d1.count);
      }
    }
  } catch (e) {
    weLog("requireItemTag ERROR:", String(e));
    // fall through to item path
  }

  // Normal item path: accept either a bracket string or an ItemStack
  var ingredient = applyCount(raw, amount);
  var d = describeIngredient(ingredient);
  weLog(
    "requireItem",
    slotId !== null ? "slot=" + slotId : "slot=<any>",
    "kind=" + d.kind,
    "count=" + d.count,
    "payload=" + d.bracket
  );

  if (slotId !== null) {
    return builder.requireItem(ingredient, slotId);
  } else {
    return builder.requireItem(ingredient);
  }
}

function buildComponentSuffix(componentsObj) {
  if (!componentsObj || typeof componentsObj !== "object") return "";
  const parts = [];
  for (const k in componentsObj) {
    if (!Object.prototype.hasOwnProperty.call(componentsObj, k)) continue;
    const v = componentsObj[k];
    // strings need quotes, numbers/bools don’t
    const val =
      typeof v === "string"
        ? `"${v}"`
        : typeof v === "number" || typeof v === "boolean"
        ? String(v)
        : // last resort: stringify (rarely needed)
          `"${String(v)}"`;
    parts.push(`${k}=${val}`);
  }
  return parts.length ? `[${parts.join(",")}]` : "";
}

function applyItemIO(builder, inputs, outputs) {
  // INPUTS
  if (inputs) {
    var inList = Array.isArray(inputs) ? inputs : [inputs];
    for (var i = 0; i < inList.length; i++) {
      var e = inList[i];
      if (!e) continue;

      var slotId = e.slot != null ? normSlot(e.slot) : null;
      var amount = e.amount != null ? e.amount : e.count != null ? e.count : 1;

      if (typeof e === "string") {
        if (e.charAt(0) === "#") {
          // tag string like "#forge:ingots/iron"
          callRequire(builder, {
            isTag: true,
            tagOrStack: e,
            amount: amount,
            slotId: slotId,
          });
        } else {
          // item id string (allow bracket-syntax strings with components)
          weLog("prepared stack", e);
          callRequire(builder, {
            isTag: false,
            tagOrStack: e,
            amount: amount,
            slotId: slotId,
          });
        }
      } else if (typeof e === "object") {
        if (e.tag) {
          // object tag form
          var tagStr = String(e.tag);
          callRequire(builder, {
            isTag: true,
            tagOrStack: tagStr,
            amount: amount,
            slotId: slotId,
          });
        } else {
          // object item form — support components + preserve existing bracket syntax
          var baseId = e.id ? e.id : e.item;
          if (!baseId) continue;

          var fullId = String(baseId);
          if (fullId.indexOf("[") === -1) {
            if (e.components && typeof e.components === "object") {
              fullId += buildComponentSuffix(e.components);
            }
          }

          weLog("prepared stack", fullId);
          callRequire(builder, {
            isTag: false,
            tagOrStack: fullId,
            amount: amount,
            slotId: slotId,
          });
        }
      }
    }
  }

  // OUTPUTS
  if (outputs) {
    var outList = Array.isArray(outputs) ? outputs : [outputs];
    for (var j = 0; j < outList.length; j++) {
      var o = outList[j];
      if (!o) continue;

      var slotOut = o.slot != null ? normSlot(o.slot) : null;
      // allow either a raw string (possibly already with [...] components) or an object
      if (typeof o === "string") {
        var outStackStr = o; // if caller included brackets, they’ll be respected
        var outStack = Item.of(outStackStr, 1);
        slotOut != null
          ? builder.produceItem(outStack, slotOut)
          : builder.produceItem(outStack);
        continue;
      }

      // object form
      var baseId = o.id ? o.id : o.item; // prefer 'id' but support 'item'
      var cnt = o.count != null ? o.count : o.amount != null ? o.amount : 1;

      // if user already passed bracket syntax in baseId, keep it
      var fullId = String(baseId);
      if (!fullId.includes("[")) {
        // append components if provided
        if (o.components && typeof o.components === "object") {
          fullId += buildComponentSuffix(o.components);
        }
      }

      var out = Item.of(fullId, cnt);
      slotOut != null
        ? builder.produceItem(out, slotOut)
        : builder.produceItem(out);
    }
  }
}

function applyFluids(builder, inputs, outputs) {
  // INPUTS
  if (inputs) {
    var inList = Array.isArray(inputs) ? inputs : [inputs];
    for (var i = 0; i < inList.length; i++) {
      var f = inList[i];
      if (!f) continue;

      var tank = f.tank != null ? String(f.tank) : null; // "fluid_input_1"
      var amt = f.amount != null ? f.amount : f.mb != null ? f.mb : 1000;

      if (f.tag) {
        var tag = String(f.tag); // should start with '#'
        // LOG
        weLog(
          "[WorldEngine] Fluid INPUT tag: " +
            tag +
            ", amt=" +
            amt +
            (tank ? ", tank=" + tank : "")
        );
        if (typeof builder.requireFluidTag === "function") {
          if (tank) builder.requireFluidTag(tag, amt, tank);
          else builder.requireFluidTag(tag, amt);
        } else if (typeof builder.requireFluid === "function") {
          // Some builds use requireFluid for both; try passing Ingredient-like tag
          var fs = Fluid.of(tag.replace(/^#/, ""), amt);
          if (tank) builder.requireFluid(fs, tank);
          else builder.requireFluid(fs);
        } else {
          weLog(
            "[WorldEngine] No requireFluidTag/requireFluid available on this builder."
          );
        }
        continue;
      }

      // Concrete fluid id path
      var fid = f.id ? f.id : f.fluid ? f.fluid : null;
      if (fid) {
        var fs2 = Fluid.of(String(fid), amt);
        // LOG
        weLog(
          "[WorldEngine] Fluid INPUT id: " +
            fid +
            ", amt=" +
            amt +
            (tank ? ", tank=" + tank : "")
        );
        if (typeof builder.requireFluid === "function") {
          if (tank) builder.requireFluid(fs2, tank);
          else builder.requireFluid(fs2);
        } else {
          weLog(
            "[WorldEngine] requireFluid not available; define and use a fluid TAG instead."
          );
        }
      }
    }
  }

  // OUTPUTS (only if you add a fluid output component)
  if (outputs) {
    var outList = Array.isArray(outputs) ? outputs : [outputs];
    for (var j = 0; j < outList.length; j++) {
      var fo = outList[j];
      if (!fo) continue;
      var amount = fo.amount != null ? fo.amount : fo.mb != null ? fo.mb : 1000;
      var tankOut = fo.tank != null ? String(fo.tank) : null;
      var ofid = fo.id ? fo.id : fo.fluid ? fo.fluid : null;
      if (ofid) {
        var ofs = Fluid.of(String(ofid), amount);
        weLog(
          "[WorldEngine] Fluid OUTPUT id: " +
            ofid +
            ", amt=" +
            amount +
            (tankOut ? ", tank=" + tankOut : "")
        );
        if (tankOut) builder.produceFluid(ofs, tankOut);
        else builder.produceFluid(ofs);
      }
    }
  }
}

function applyLoot(builder, loot) {
  if (!loot) return;
  if (typeof loot === "string") {
    builder.lootTableOutput(loot);
    return;
  }
  if (typeof loot === "object") {
    var table = loot.table ? loot.table : loot.id ? loot.id : null;
    var luck =
      loot.luck != null ? loot.luck : loot.bonus != null ? loot.bonus : null;
    if (table == null) return;
    if (luck != null) builder.lootTableOutput(table, luck);
    else builder.lootTableOutput(table);
  }
}

function applyCommands(builder, kind, value) {
  if (!value) return;
  var method =
    kind === "start"
      ? "runCommandOnStart"
      : kind === "tick"
      ? "runCommandEachTick"
      : "runCommandOnEnd";
  var list = Array.isArray(value) ? value : [value];
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    if (typeof c === "string") {
      builder[method](c);
    } else if (c && typeof c === "object") {
      var cmd = c.cmd ? c.cmd : c.command ? c.command : null;
      var perm =
        c.perm != null
          ? c.perm
          : c.permissionLevel != null
          ? c.permissionLevel
          : null;
      var log = c.log != null ? c.log : null;
      if (cmd == null) continue;
      if (perm != null && log != null) builder[method](cmd, perm, log);
      else if (perm != null) builder[method](cmd, perm);
      else if (log != null) builder[method](cmd, log);
      else builder[method](cmd);
    }
  }
}

// Core: feed it an array of recipe objects
function addWorldEngineRecipes(event, list) {
  if (!list || !Array.isArray(list)) {
    weLog("[WorldEngine] No recipe list provided");
    return;
  }

  for (var i = 0; i < list.length; i++) {
    var r = list[i];
    var machineId = r.machineId ? r.machineId : "ftb:world_engine";
    var builder;

    if (r.type === "craft") {
      var outDef = r.output
        ? r.output
        : r.outputs && r.outputs.length > 0
        ? r.outputs[0]
        : "minecraft:stone";
      var outStack =
        typeof outDef === "string"
          ? Item.of(outDef, 1)
          : outDef.nbt
          ? Item.of(outDef.item || outDef.id, outDef.count || 1, outDef.nbt)
          : Item.of(outDef.item || outDef.id, outDef.count || 1);
      builder = event.recipes.custommachinery.custom_craft(machineId, outStack);
    } else {
      var duration = r.duration != null ? r.duration : 200;
      builder = event.recipes.custommachinery.custom_machine(
        machineId,
        duration
      );
    }

    if (r.id) builder.id(r.id);

    // structures — if a recipe uses "fortron_upgrade", also require "machine_block_upgrade"
    if (r.structures || r.structure) {
      let structs = r.structures || r.structure;
      // normalize to array
      let arr = Array.isArray(structs) ? structs.slice() : [structs];

      // ensure both are present when fortron is used
      const hasFortron = arr.indexOf("fortron_upgrade") !== -1;
      const hasMachine = arr.indexOf("machine_block_upgrade") !== -1;
      if (hasFortron && !hasMachine) arr.push("machine_block_upgrade");

      applyStructures(builder, arr);
    }

    applySource(builder, r);

    // requirements
    if (r.energyPerTick != null) builder.requireEnergyPerTick(r.energyPerTick);
    if (r.su != null) {
      if (typeof r.su === "number") builder.requireSU(r.su);
      else if (Array.isArray(r.su) && r.su.length > 1)
        builder.requireSU(r.su[0], r.su[1]);
      else if (typeof r.su === "object") {
        var sp = r.su.speed != null ? r.su.speed : null;
        var st =
          r.su.stressImpact != null
            ? r.su.stressImpact
            : r.su.stress != null
            ? r.su.stress
            : null;
        if (sp != null && st != null) builder.requireSU(sp, st);
        else if (sp != null) builder.requireSU(sp);
      }
    }
    if (r.tempC != null || r.requireTempCelsius != null || r.temp != null) {
      applyTemp(
        builder,
        r.tempC != null
          ? r.tempC
          : r.requireTempCelsius != null
          ? r.requireTempCelsius
          : r.temp
      );
    }

    // fluids/items/loot/commands
    if (r.itemInputs || r.inputs || r.itemOutputs || r.outputs) {
      applyItemIO(
        builder,
        r.itemInputs || r.inputs,
        r.itemOutputs || r.outputs
      );
    }

    if (r.fluidInputs || r.fluidOutputs) {
      applyFluids(builder, r.fluidInputs, r.fluidOutputs);
    }
    if (r.loot || r.lootTableOutput) {
      var loot = r.loot ? r.loot : r.lootTableOutput;
      if (typeof loot === "string") builder.lootTableOutput(loot);
      else if (loot && typeof loot === "object") {
        var table = loot.table ? loot.table : loot.id;
        var luck = loot.luck != null ? loot.luck : loot.bonus;
        if (table) {
          if (luck != null) builder.lootTableOutput(table, luck);
          else builder.lootTableOutput(table);
        }
      }
    }

    if (r.commands) {
      if (r.commands.onStart) {
        var cs = Array.isArray(r.commands.onStart)
          ? r.commands.onStart
          : [r.commands.onStart];
        for (var a = 0; a < cs.length; a++) {
          var c1 = cs[a];
          if (typeof c1 === "string") builder.runCommandOnStart(c1);
          else builder.runCommandOnStart(c1.cmd, c1.perm, c1.log);
        }
      }
      if (r.commands.eachTick) {
        var ct = Array.isArray(r.commands.eachTick)
          ? r.commands.eachTick
          : [r.commands.eachTick];
        for (var b = 0; b < ct.length; b++) {
          var c2 = ct[b];
          if (typeof c2 === "string") builder.runCommandEachTick(c2);
          else builder.runCommandEachTick(c2.cmd, c2.perm, c2.log);
        }
      }
      if (r.commands.onEnd) {
        var ce = Array.isArray(r.commands.onEnd)
          ? r.commands.onEnd
          : [r.commands.onEnd];
        for (var d = 0; d < ce.length; d++) {
          var c3 = ce[d];
          if (typeof c3 === "string") builder.runCommandOnEnd(c3);
          else builder.runCommandOnEnd(c3.cmd, c3.perm, c3.log);
        }
      }
    }
  }
}

// ---------- Usage ----------
ServerEvents.recipes(function (event) {
  addWorldEngineRecipes(event, [
    {
      id: "ftb:world_engine/echo_encoder2",
      machineId: "ftb:world_engine",
      duration: 200,
      itemInputs: [
        { item: "irons_spellbooks:amethyst_resonance_charm", count: 1 },
        { item: "constructionstick:iron_stick", count: 1 },
      ],
      itemOutputs: [{ item: "ftbunearthed:echo_encoder", count: 1 }],
    },
    {
      id: "ftb:world_engine/stack_upgrade_tier_1_plus",
      machineId: "ftb:world_engine",
      duration: 80,
      energyPerTick: 1024,
      itemInputs: [
        { item: "minecraft:copper_ingot", count: 16 },
        { item: "sophisticatedstorage:stack_upgrade_tier_1", count: 1 },
      ],
      itemOutputs: [
        { item: "sophisticatedstorage:stack_upgrade_tier_1_plus", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/machine_frame",
      machineId: "ftb:world_engine",
      duration: 200,
      energyPerTick: 1024,
      itemInputs: [
        { item: "powah:dielectric_casing", count: 1 },
        { item: "immersiveengineering:component_steel", count: 2 },
        { item: "mekanism:basic_control_circuit", count: 1 },
        { item: "ftbmaterials:electrum_wire", count: 2 },
      ],
      itemOutputs: [{ item: "ftb:world_engine_machine_block", count: 16 }],
    },
    {
      id: "ftb:megatorch_from_magelight",
      machineId: "ftb:world_engine",
      duration: 220,
      structures: ["source_upgrade"],
      source: { amount: 2000 },

      itemInputs: [
        { item: "ars_nouveau:magelight_torch", count: 1 },
        { item: "ars_nouveau:archwood_planks", count: 2 },
        { item: "minecraft:diamond", count: 1 },
      ],
      itemOutputs: [{ item: "torchmaster:megatorch", count: 1 }],
    },
    // 1) Inscription Table — 1000 Source, 100 ticks
    {
      id: "ftb:world_engine/inscription_table",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["source_upgrade"],
      source: { amount: 1000 },
      itemInputs: [
        { item: "minecraft:writable_book", count: 1 },
        { item: "ars_nouveau:archwood_slab", count: 3 },
        { item: "ars_nouveau:archwood_fence", count: 2 },
      ],
      itemOutputs: [{ item: "irons_spellbooks:inscription_table", count: 1 }],
    },
    {
      id: "ftb:world_engine/enchanting_apparatus",
      machineId: "ftb:world_engine",
      structures: ["source_upgrade"],
      duration: 320,
      source: { amount: 2500 },
      itemInputs: [
        { item: "minecraft:diamond", count: 1 },
        { item: "ars_nouveau:sourcestone", count: 2 },
        { item: "ftbmaterials:electrum_nugget", count: 4 },
        { item: "minecraft:gold_ingot", count: 2 },
      ],
      itemOutputs: [{ item: "ars_nouveau:enchanting_apparatus", count: 1 }],
    },
    {
      id: "ftb:world_engine/basic_spell_turret",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["source_upgrade"],
      source: { amount: 500 },
      itemInputs: [
        { item: "ftbmaterials:electrum_ingot", count: 2 },
        { item: "ars_nouveau:redstone_relay", count: 1 },
      ],
      itemOutputs: [{ item: "ars_nouveau:basic_spell_turret", count: 1 }],
    },
    {
      id: "ftb:world_engine/jewelcrafting_station",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["source_upgrade"],
      source: { amount: 750 },
      itemInputs: [
        { item: "ars_nouveau:archwood_planks", count: 4 },
        { item: "minecraft:copper_ingot", count: 2 },
        { item: "minecraft:lapis_lazuli", count: 1 },
      ],
      itemOutputs: [{ item: "irons_jewelry:jewelcrafting_station", count: 1 }],
    },
    {
      id: "ftb:world_engine/blank_thread",
      machineId: "ftb:world_engine",
      structures: ["source_upgrade"],
      duration: 40,
      source: { amount: 500 },
      itemInputs: [
        { item: "ftbmaterials:electrum_wire", count: 3 },
        { item: "ars_nouveau:magebloom_fiber", count: 6 },
      ],
      itemOutputs: [{ item: "ars_nouveau:blank_thread", count: 1 }],
    },
    // 1) 4x Item Vault — "32 speed at 16 stress"
    {
      id: "ftb:world_engine/item_vault_x4",
      machineId: "ftb:world_engine",
      duration: 200, // not specified, so 200
      structures: ["shadow_casing_upgrade"],
      su: { speed: 32, stressImpact: 16 }, // speed=32, stress=16
      itemInputs: [
        { item: "ftbmaterials:iron_plate", count: 4 },
        { item: "minecraft:barrel", count: 1 },
      ],
      itemOutputs: [{ item: "create:item_vault", count: 4 }],
    },

    // 2) Mechanical Bearing — "Su 32 and 2 speed"
    //    Assumed: stress=32, speed=2
    {
      id: "ftb:world_engine/mechanical_bearing",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["shadow_casing_upgrade"],
      su: { speed: 2, stressImpact: 32 },
      itemInputs: [
        { item: "create:andesite_casing", count: 1 },
        { item: "minecraft:slime_ball", count: 1 },
        { item: "create:shaft", count: 1 },
      ],
      itemOutputs: [{ item: "create:mechanical_bearing", count: 1 }],
    },

    // 3) Electric Motor — "su 64 at 16 speed" + 256 FE/t
    //    Interpreted: stress=64, speed=16
    {
      id: "ftb:world_engine/electric_motor",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["shadow_casing_upgrade"],
      su: { speed: 16, stressImpact: 64 },
      energyPerTick: 256,
      itemInputs: [
        { item: "createaddition:capacitor", count: 1 },
        { item: "ftbmaterials:brass_plate", count: 6 },
        { item: "minecraft:redstone", count: 4 },
      ],
      itemOutputs: [{ item: "createaddition:electric_motor", count: 1 }],
    },

    // 4) Relay MK3 — "su 64 at 16 speed" + 2048 FE/t, duration 500
    {
      id: "ftb:world_engine/relay_mk3",
      machineId: "ftb:world_engine",
      duration: 500,
      structures: ["shadow_casing_upgrade"],
      su: { speed: 16, stressImpact: 64 },
      energyPerTick: 2048,
      itemInputs: [
        { item: "create:shadow_steel", count: 1 },
        { item: "appflux:charged_redstone", count: 16 },
        { item: "xycraft_world:xychorium_gem_dark", count: 1 },
        { item: "replication:replica_ingot", count: 8 },
      ],
      itemOutputs: [{ item: "projecte:relay_mk3", count: 1 }],
    },

    {
      id: "ftb:world_engine/repair_talisman",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 65536,
      itemInputs: [
        { item: "projecte:red_matter", count: 1 },
        { item: "ftbmaterials:diamond_dust", count: 8 },
        { item: "ftbmaterials:lapis_lazuli_dust", count: 16 },
        { item: "tempad:time_steel", count: 2 },
      ],
      itemOutputs: [{ item: "projecte:repair_talisman", count: 1 }],
    },

    // 5) Condenser MK2 — "su 64 at 16 speed" + 1048 FE/t, duration 250
    {
      id: "ftb:world_engine/condenser_mk2",
      machineId: "ftb:world_engine",
      duration: 250,
      structures: ["shadow_casing_upgrade"],
      su: { speed: 16, stressImpact: 64 },
      energyPerTick: 1048,
      itemInputs: [
        { item: "minecraft:lapis_lazuli", count: 16 },
        { item: "avaritia:diamond_lattice", count: 1 },
        { item: "replication:replica_ingot", count: 8 },
      ],
      itemOutputs: [{ item: "projecte:condenser_mk2", count: 1 }],
    },
    // Fusing Machine
    {
      id: "ftb:world_engine/fusing_machine",
      machineId: "ftb:world_engine",
      // duration omitted → helper defaults to 200
      itemInputs: [
        { item: "oritech:machine_core_2", count: 1 },
        { item: "minecraft:lava_bucket", count: 1 },
        { item: "createaddition:capacitor", count: 1 },
        { item: "immersiveengineering:component_iron", count: 2 },
      ],
      itemOutputs: [{ item: "ftbstuff:fusing_machine", count: 1 }],
    },

    // Super Cooler
    {
      id: "ftb:world_engine/super_cooler",
      machineId: "ftb:world_engine",
      itemInputs: [
        { item: "minecraft:water_bucket", count: 1 },
        { item: "createaddition:capacitor", count: 1 },
        { item: "oritech:machine_core_2", count: 1 },
        { item: "immersiveengineering:component_iron", count: 2 },
      ],
      itemOutputs: [{ item: "ftbstuff:super_cooler", count: 1 }],
    },
    // Sophisticated Storage Controller — 512 FE/t for 300 ticks
    {
      id: "ftb:world_engine/sophisticatedstorage_controller",
      machineId: "ftb:world_engine",
      duration: 300,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ftbmaterials:steel_plate", count: 4 },
        { item: "sophisticatedbackpacks:deposit_upgrade", count: 1 },
        { item: "minecraft:diamond", count: 1 },
      ],
      itemOutputs: [{ item: "sophisticatedstorage:controller", count: 1 }],
    },

    // Iron Furnaces Augment Generator — 512 FE/t for 200 ticks
    {
      id: "ftb:world_engine/augment_generator",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "minecraft:deepslate", count: 4 },
        { item: "mekanism:basic_control_circuit", count: 1 },
        { item: "ftbmaterials:copper_wire", count: 4 },
      ],
      itemOutputs: [{ item: "ironfurnaces:augment_generator", count: 1 }],
    },

    // Mekanism Basic Tier Installer — 1024 FE/t for 100 ticks
    {
      id: "ftb:world_engine/mekanism_basic_tier_installer",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "minecraft:iron_ingot", count: 2 },
        { item: "minecraft:redstone", count: 4 },
        { item: "mekanism:basic_control_circuit", count: 2 },
      ],
      itemOutputs: [{ item: "mekanism:basic_tier_installer", count: 1 }],
    },

    // AE2 Flawed Budding Quartz — 256 FE/t for 220 ticks
    {
      id: "ftb:world_engine/flawed_budding_quartz",
      machineId: "ftb:world_engine",
      duration: 220,
      structures: ["machine_block_upgrade"],
      energyPerTick: 256,
      itemInputs: [{ item: "minecraft:amethyst_block", count: 1 }],
      itemOutputs: [{ item: "ae2:flawless_budding_quartz", count: 1 }],
    },

    // RFTools Base Machine Frame — 328 FE/t for 220 ticks
    {
      id: "ftb:world_engine/rftoolsbase_machine_frame",
      machineId: "ftb:world_engine",
      duration: 220,
      structures: ["machine_block_upgrade"],
      energyPerTick: 328,
      itemInputs: [
        { item: "ftbmaterials:invar_plate", count: 4 },
        { item: "minecraft:lapis_lazuli", count: 2 },
        { item: "minecraft:redstone", count: 1 },
      ],
      itemOutputs: [{ item: "rftoolsbase:machine_frame", count: 1 }],
    },

    // RFTools Builder — 2048 FE/t for 200 ticks
    {
      id: "ftb:world_engine/rftoolsbuilder_builder",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "rftoolsbase:machine_frame", count: 1 },
        { item: "powah:aerial_pearl", count: 1 },
        { item: "constructionstick:diamond_stick", count: 1 },
      ],
      itemOutputs: [{ item: "rftoolsbuilder:builder", count: 1 }],
    },

    // Personal Shrinking Device — 2048 FE/t for 320 ticks
    {
      id: "ftb:world_engine/personal_shrinking_device",
      machineId: "ftb:world_engine",
      duration: 320,
      structures: ["machine_block_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "ftbmaterials:iron_plate", count: 4 },
        { item: "compactmachines:shrinking_module", count: 1 },
        { item: "compactmachines:enlarging_module", count: 1 },
      ],
      itemOutputs: [
        { item: "compactmachines:personal_shrinking_device", count: 1 },
      ],
    },

    // AE2 Crystal Resonance Generator — 512 FE/t for 200 ticks
    {
      id: "ftb:world_engine/ae2_crystal_resonance_generator",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ae2:fluix_block", count: 1 },
        { item: "ftbmaterials:copper_wire", count: 4 },
        { item: "ftbmaterials:iron_plate", count: 4 },
      ],
      itemOutputs: [{ item: "ae2:crystal_resonance_generator", count: 1 }],
    },

    // AE2 Energy Acceptor — 256 FE/t for 300 ticks
    {
      id: "ftb:world_engine/ae2_energy_acceptor",
      machineId: "ftb:world_engine",
      duration: 300,
      structures: ["machine_block_upgrade"],
      energyPerTick: 256,
      itemInputs: [
        { item: "ae2:quartz_glass", count: 4 },
        { item: "ftbmaterials:copper_wire", count: 4 },
        { item: "ftbmaterials:iron_plate", count: 4 },
      ],
      itemOutputs: [{ item: "ae2:energy_acceptor", count: 1 }],
    },

    // 16x Item Pipez — 512 FE/t for 800 ticks
    {
      id: "ftb:world_engine/pipez_item_pipe_x16",
      machineId: "ftb:world_engine",
      duration: 800,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ftbmaterials:steel_ingot", count: 2 },
        { item: "minecraft:redstone", count: 1 },
        { item: "minecraft:chest", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:item_pipe", count: 16 }],
    },

    // 16x Fluid Pipez — 512 FE/t for 800 ticks
    {
      id: "ftb:world_engine/pipez_fluid_pipe_x16",
      machineId: "ftb:world_engine",
      duration: 800,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ftbmaterials:steel_ingot", count: 2 },
        { item: "minecraft:redstone", count: 1 },
        { item: "minecraft:bucket", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:fluid_pipe", count: 16 }],
    },

    // Energy Pipez — 512 FE/t for 800 ticks (set count to 16 if desired)
    {
      id: "ftb:world_engine/pipez_energy_pipe_x16",
      machineId: "ftb:world_engine",
      duration: 800,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ftbmaterials:steel_ingot", count: 2 },
        { item: "enderio:redstone_alloy_ingot", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:energy_pipe", count: 16 }],
    },

    // 16x Gas Pipez — 512 FE/t for 800 ticks
    {
      id: "ftb:world_engine/pipez_gas_pipe_x16",
      machineId: "ftb:world_engine",
      duration: 800,
      structures: ["machine_block_upgrade"],
      energyPerTick: 512,
      itemInputs: [
        { item: "ftbmaterials:steel_ingot", count: 2 },
        { item: "mekanism:alloy_infused", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:gas_pipe", count: 16 }],
    },

    // Replication Replicator — 768 FE/t for 600 ticks
    {
      id: "ftb:world_engine/replication_replicator",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: ["machine_block_upgrade"],
      energyPerTick: 768,
      itemInputs: [
        { item: "oritech:machine_core_2", count: 1 },
        { item: "replication:replica_ingot", count: 6 },
        { item: "mekanism:alloy_infused", count: 2 },
      ],
      itemOutputs: [{ item: "replication:replicator", count: 1 }],
    },
    {
      id: "ftb:world_engine/mekanism_superheating_element",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "mekanism:steel_casing", count: 1 },
        { item: "oritech:magnetic_coil", count: 4 },
        { item: "mekanism:alloy_infused", count: 4 },
      ],
      itemOutputs: [{ item: "mekanism:superheating_element", count: 1 }],
    },
    {
      id: "ftb:world_engine/energizing_orb",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade"],
      energyPerTick: 2048,
      tempC: { min: 350 },
      itemInputs: [
        { item: "powah:dielectric_casing", count: 1 },
        { item: "mekanism:advanced_control_circuit", count: 1 },
        { item: "enderio:fused_quartz", count: 4 },
      ],
      itemOutputs: [{ item: "powah:energizing_orb", count: 1 }],
    },
    {
      id: "ftb:world_engine/prometheum_battleaxe",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade"],
      energyPerTick: 4096,
      tempC: { min: 500 },
      itemInputs: [
        { item: "oritech:prometheum_ingot", count: 4 },
        { item: "oritech:treefeller_block", count: 2 },
      ],
      itemOutputs: [{ item: "oritech:promethium_axe", count: 1 }],
    },
    {
      id: "ftb:world_engine/prometheum_pickaxe",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade"],
      energyPerTick: 4096,
      tempC: { min: 500 },
      itemInputs: [
        { item: "oritech:prometheum_ingot", count: 3 },
        { item: "oritech:destroyer_block", count: 2 },
      ],
      itemOutputs: [{ item: "oritech:promethium_pickaxe", count: 1 }],
    },
    {
      id: "ftb:world_engine/ultimate_machine_core",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade"],
      energyPerTick: 4096,
      tempC: { min: 250 },
      itemInputs: [
        { item: "oritech:prometheum_ingot", count: 8 },
        { item: "oritech:superconductor", count: 1 },
      ],
      itemOutputs: [{ item: "oritech:machine_core_7", count: 1 }],
    },
    {
      id: "ftb:world_engine/shadow_steel_x32",
      machineId: "ftb:world_engine",
      // duration omitted → defaults to 200 (set if you want a specific time)
      structures: ["shadow_casing_upgrade"],
      su: { speed: 32, stressImpact: 16 },
      itemInputs: [{ item: "enderio:dark_steel_ingot", count: 1 }],
      itemOutputs: [{ item: "create:shadow_steel", count: 32 }],
    },
    {
      id: "ftb:world_engine/dominion_wand",
      machineId: "ftb:world_engine",
      duration: 100,
      itemInputs: [
        { item: "minecraft:stick", count: 1 },
        { item: "minecraft:gold_ingot", count: 1 },
        { item: "ars_nouveau:source_gem", count: 2 },
      ],
      itemOutputs: [{ item: "ars_nouveau:dominion_wand", count: 1 }],
    },
    {
      id: "ftb:world_engine/encoder_recharge",
      machineId: "ftb:world_engine",
      duration: 100,
      itemInputs: [{ item: "ftbunearthed:echo_encoder", count: 1 }],
      itemOutputs: [{ item: "ftbunearthed:echo_encoder", count: 1 }],
    },
    {
      id: "ftb:world_engine/time_steel",
      machineId: "ftb:world_engine",
      duration: 10,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 2048,
      itemInputs: [{ item: "powah:steel_energized", count: 1 }],
      itemOutputs: [{ item: "tempad:time_steel", count: 1 }],
    },
    {
      id: "ftb:world_engine/chroniton_glass_and_depleted_star",
      machineId: "ftb:world_engine",
      duration: 800,
      structures: ["machine_block_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "ftb:fortron_star", count: 1 },
        { item: "xycraft_world:glass_viewer_reinforced", count: 32 },
        { item: "ftbmaterials:aluminum_ingot", count: 32 },
        { item: "minecraft:obsidian", count: 8 },
      ],
      itemOutputs: [
        { item: "ftb:chroniton_glass", count: 64 },
        { item: "ftb:depleted_fortron_star", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/fortron_star_restore",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "ftb:depleted_fortron_star", count: 1 },
        { item: "minecraft:nether_star", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:fortron_star", count: 1 }],
    },
    {
      id: "ftb:world_engine/enderstorage_ender_chest_x2",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "justdirethings:blazegold_ingot", count: 4 },
        { item: "minecraft:obsidian", count: 2 },
        { item: "ironchest:iron_chest", count: 1 },
      ],
      itemOutputs: [{ item: "enderstorage:ender_chest", count: 2 }],
    },
    {
      id: "ftb:world_engine/enderstorage_ender_tank_x2",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "justdirethings:blazegold_ingot", count: 4 },
        { item: "minecraft:obsidian", count: 2 },
        { item: "mob_grinding_utils:tank", count: 1 },
      ],
      itemOutputs: [{ item: "enderstorage:ender_tank", count: 2 }],
    },
    {
      id: "ftb:world_engine/projecte_collector_mk1",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "minecraft:glowstone", count: 4 },
        { item: "ae2:quartz_vibrant_glass", count: 1 },
        { item: "ironfurnaces:iron_furnace", count: 1 },
      ],
      itemOutputs: [{ item: "projecte:collector_mk1", count: 1 }],
    },
    {
      id: "ftb:world_engine/loot_fabricator",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "ftbmaterials:obsidian_plate", count: 4 },
        { item: "replication:replicator_enclosure", count: 1 },
        { item: "mekanism:elite_control_circuit", count: 1 },
      ],
      itemOutputs: [{ item: "hostilenetworks:loot_fabricator", count: 1 }],
    },
    {
      id: "ftb:world_engine/sim_chamber",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "ftbmaterials:obsidian_plate", count: 4 },
        { item: "cognition:mending_neurogel", count: 1 },
        { item: "mekanism:elite_control_circuit", count: 1 },
      ],
      itemOutputs: [{ item: "hostilenetworks:sim_chamber", count: 1 }],
    },
    {
      id: "ftb:world_engine/powercell_card",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "minecraft:redstone", count: 2 },
        { item: "minecraft:paper", count: 1 },
      ],
      itemOutputs: [{ item: "rftoolspower:powercell_card", count: 1 }],
    },
    {
      id: "ftb:world_engine/dimensionalcell_simple",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 1024,
      itemInputs: [
        { item: "mekanism:steel_casing", count: 1 },
        { item: "ftbmaterials:dimensional_shard_gem", count: 1 },
      ],
      itemOutputs: [{ item: "rftoolspower:dimensionalcell_simple", count: 1 }],
    },
    {
      id: "ftb:world_engine/portalgun",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "chroniton_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "minecraft:ender_eye", count: 1 },
        { item: "justdirethings:blazegold_ingot", count: 5 },
      ],
      itemOutputs: [{ item: "justdirethings:portalgun", count: 1 }],
    },
    {
      id: "ftb:world_engine/raw_brilliance_from_jelly",
      machineId: "ftb:world_engine",
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 1000 },
      itemInputs: [{ item: "cognition:fluorescent_jelly", count: 1 }],
      itemOutputs: [{ item: "malum:raw_brilliance", count: 2 }],
    },
    {
      id: "ftb:world_engine/thread_spellpower",
      machineId: "ftb:world_engine",
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 4000 },
      itemInputs: [{ item: "ars_nouveau:blank_thread", count: 1 }],
      itemOutputs: [{ item: "ars_nouveau:thread_spellpower", count: 1 }],
    },
    {
      id: "ftb:world_engine/villager_spell_book",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 4000 },
      itemInputs: [
        { item: "irons_spellbooks:diamond_spell_book", count: 1 },
        { item: "ftbunearthed:worker_token", count: 1 },
      ],
      itemOutputs: [{ item: "irons_spellbooks:villager_spell_book", count: 1 }],
    },
    {
      id: "ftb:world_engine/enchanted_book_knowledge_3",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:looting":3}}]',
          count: 1,
        },
        {
          item: 'minecraft:potion[potion_contents={potion:"apothic_attributes:strong_knowledge"}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"apothic_enchanting:knowledge_of_the_ages":3}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_scavenger_3",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:looting":3}}]',
          count: 1,
        },
        { item: "minecraft:wither_skeleton_skull", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"apothic_enchanting:scavenger":3}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_boon_5",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:diamond_pickaxe", count: 1 },
        { item: "#c:ores", count: 16 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"apothic_enchanting:boon_of_the_earth":5}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_efficiency_9",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:diamond_pickaxe", count: 1 },
        {
          item: 'minecraft:potion[potion_contents={potion:"apothic_attributes:strong_haste"}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:efficiency":9}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_fishing_combo",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:fishing_rod", count: 1 },
        {
          item: 'minecraft:potion[potion_contents={potion:"apothic_attributes:strong_haste"}]',
          count: 1,
        },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:fortune":3}}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:luck_of_the_sea":8,"minecraft:lure":8}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_mana_combo",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "ars_nouveau:amulet_of_mana_regen", count: 1 },
        { item: "ars_nouveau:amulet_of_mana_boost", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"ars_nouveau:mana_boost":7,"ars_nouveau:mana_regen":7}},repair_cost=1]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_reaper_9",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 1000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "enderio:soularium_ingot", count: 4 },
        { item: "occultism:fragile_soul_gem", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"draconicevolution:reaper":9}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_spirit_plunder_6",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "malum:ring_of_esoteric_spoils", count: 1 },
        { item: "malum:spirit_jar", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"malum:spirit_plunder":6}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_backstabbing_8",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "farmersdelight:diamond_knife", count: 1 },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:swift_sneak":5}}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"farmersdelight:backstabbing":8}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_endless_quiver",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "supplementaries:quiver", count: 1 },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:infinity":1}}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"apothic_enchanting:endless_quiver":1}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_unbreaking_8",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:obsidian", count: 16 },
        { item: "create:super_glue", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:unbreaking":8}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_mending",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:experience_bottle", count: 1 },
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:unbreaking":8}}]',
          count: 1,
        },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:mending":1}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_silk_touch",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:glass", count: 32 },
        { item: "chancecubes:silk_touch_pendant", count: 1 },
        { item: "", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:silk_touch":1}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_soulbound",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "modularrouters:player_module", count: 1 },
        { item: "enderio:soul_vial", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"ars_elemental:soulbound":1}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_sneak_5",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:echo_shard", count: 1 },
        { item: "create:cardboard_leggings", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"minecraft:swift_sneak":5}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_chill_8",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 2000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "minecraft:blue_ice", count: 8 },
        { item: "minecraft:shield", count: 1 },
        { item: "ars_nouveau:glyph_freeze", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"twilightforest:chill_aura":8}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/enchanted_book_",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "enchanting_upgrade",
      ],
      source: { amount: 4000 },
      itemInputs: [
        { item: "minecraft:book", count: 1 },
        { item: "actuallyadditions:empowered_palis_crystal_block", count: 1 },
        { item: "ars_nouveau:enchanters_shield", count: 1 },
        { item: "ars_elemental:spell_mirror", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'minecraft:enchanted_book[stored_enchantments={levels:{"ars_elemental:mirror_shield":7}}]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/portalgun_upgrade",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "justdirethings:portalgun", count: 1 },
        { item: "justdirethings:celestigem", count: 1 },
        { item: "justdirethings:portal_fluid_catalyst", count: 1 },
        { item: "justdirethings:fluid_canister", count: 1 },
      ],
      itemOutputs: [{ item: "justdirethings:portalgun_v2", count: 1 }],
    },
    {
      id: "ftb:world_engine/fortron_infused_ingot_x9",
      machineId: "ftb:world_engine",
      duration: 20,
      energyPerTick: 4096,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      itemInputs: [
        { item: "minecraft:iron_ingot", count: 8 },
        { item: "ftbmaterials:platinum_ingot", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 4000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "ftb:fortron_infused_ingot", count: 9 }],
    },
    {
      id: "ftb:world_engine/mekanism_advanced_tier_installer",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "mekanism:basic_tier_installer", count: 1 },
        { item: "mekanism:advanced_control_circuit", count: 1 },
      ],
      itemOutputs: [{ item: "mekanism:advanced_tier_installer", count: 1 }],
    },
    {
      id: "ftb:world_engine/mekanism_teleporter",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "mekanism:advanced_control_circuit", count: 4 },
        { item: "mekanism:steel_casing", count: 4 },
        { item: "mekanism:teleportation_core", count: 4 },
        { item: "ftbmaterials:refined_obsidian_ingot", count: 8 },
        { item: "ftbmaterials:refined_glowstone_ingot", count: 1 },
      ],
      itemOutputs: [
        { item: "mekanism:teleporter", count: 1 },
        { item: "mekanism:teleporter_frame", count: 9 },
      ],
    },
    {
      id: "ftb:world_engine/enderio_travel_anchor",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "minecraft:iron_ingot", count: 4 },
        { item: "enderio:conduit_binder", count: 4 },
        { item: "enderio:pulsating_crystal", count: 1 },
      ],
      itemOutputs: [{ item: "enderio:travel_anchor", count: 1 }],
    },
    {
      id: "ftb:world_engine/laserio_logic_chip_x16",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "minecraft:quartz", count: 16 },
        { item: "appflux:charged_redstone", count: 1 },
      ],
      itemOutputs: [{ item: "laserio:logic_chip", count: 16 }],
    },
    {
      id: "ftb:world_engine/ae2_controller",
      machineId: "ftb:world_engine",
      duration: 300,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "ae2:fluix_glass_cable", count: 2 },
        { item: "appflux:energy_processor", count: 1 },
        { item: "ae2:quartz_glass", count: 4 },
      ],
      itemOutputs: [{ item: "ae2:controller", count: 1 }],
    },
    {
      id: "ftb:world_engine/ae2_crafting_unit",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "ae2:fluix_glass_cable", count: 2 },
        { item: "ae2:calculation_processor", count: 1 },
        { item: "ae2:quartz_glass", count: 4 },
      ],
      itemOutputs: [{ item: "ae2:crafting_unit", count: 1 }],
    },
    {
      id: "ftb:world_engine/ae2_storage_bus",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "ae2:annihilation_core", count: 1 },
        { item: "ae2:formation_core", count: 1 },
        { item: "minecraft:iron_ingot", count: 4 },
        { item: "ae2:quartz_fiber", count: 1 },
      ],
      itemOutputs: [{ item: "ae2:storage_bus", count: 1 }],
    },
    {
      id: "ftb:world_engine/modular_router",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: ["machine_block_upgrade", "fortron_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "modularrouters:blank_module", count: 1 },
        { item: "minecraft:redstone", count: 4 },
        { item: "minecraft:iron_ingot", count: 4 },
      ],
      itemOutputs: [{ item: "modularrouters:modular_router", count: 1 }],
    },
    {
      id: "ftb:world_engine/spirit_block",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["source_upgrade", "machine_block_upgrade"],
      source: { amount: 4000 },
      energyPerTick: 1024,
      itemInputs: [
        { item: "minecraft:emerald_block", count: 1 },
        { item: "minecraft:ender_pearl", count: 4 },
        { item: "malum:soul_stained_steel_ingot", count: 2 },
        { item: "cataclysm:ignitium_ingot", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:spirit_block", count: 12 }],
    },
    {
      id: "ftb:world_engine/music_disc_pigstep",
      machineId: "ftb:world_engine",
      duration: 180,
      structures: ["machine_block_upgrade"],
      energyPerTick: 4096,
      itemInputs: [
        { item: "minecraft:netherite_scrap", count: 1 },
        { item: "justdirethings:blazegold_ingot", count: 4 },
      ],
      fluidInputs: [
        {
          fluid: "industrialforegoing:latex",
          amount: 100,
          tank: "fluid_input_1",
        },
      ],
      itemOutputs: [{ item: "minecraft:music_disc_pigstep", count: 1 }],
    },
    {
      id: "ftb:world_engine/deep_dark_catalyst",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["source_upgrade", "machine_block_upgrade", "spirit_upgrade"],
      source: { amount: 4000 },
      itemInputs: [
        { item: "minecraft:sculk", count: 4 },
        { item: "rftoolsbase:infused_enderpearl", count: 1 },
      ],
      itemOutputs: [
        { item: "deepdarkdimdungeons:deep_dark_catalyst", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/blade_of_vitality",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["source_upgrade", "machine_block_upgrade", "spirit_upgrade"],
      source: { amount: 6000 },
      itemInputs: [
        { item: "cognition:cognitive_sword", count: 1 },
        { item: "twilightforest:transformation_powder", count: 2 },
        { item: "occultism:echo_dust", count: 2 },
        { item: "occultism:afrit_essence", count: 1 },
      ],
      itemOutputs: [{ item: "bhc:blade_of_vitality", count: 1 }],
    },
    {
      id: "ftb:world_engine/vigor_bow",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["source_upgrade", "machine_block_upgrade", "spirit_upgrade"],
      source: { amount: 6000 },
      itemInputs: [
        { item: "cognition:cognitive_bow", count: 1 },
        { item: "twilightforest:transformation_powder", count: 2 },
        { item: "occultism:echo_dust", count: 2 },
        { item: "occultism:afrit_essence", count: 1 },
      ],
      itemOutputs: [{ item: "bhc:vigor_bow", count: 1 }],
    },
    {
      id: "ftb:world_engine/flux_dust_x2",
      machineId: "ftb:world_engine",
      duration: 10,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "ae2:sky_dust", count: 1 },
        { item: "minecraft:redstone", count: 1 },
      ],
      itemOutputs: [{ item: "fluxnetworks:flux_dust", count: 2 }],
    },
    {
      id: "ftb:world_engine/universal_pipe_x8",
      machineId: "ftb:world_engine",
      duration: 10,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "ftbmaterials:steel_ingot", count: 8 },
        { item: "pipez:item_pipe", count: 1 },
        { item: "pipez:fluid_pipe", count: 1 },
        { item: "pipez:energy_pipe", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:universal_pipe", count: 8 }],
    },
    {
      id: "ftb:world_engine/xnet_controller",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "rftoolsbase:machine_frame", count: 1 },
        { item: "ae2:calculation_processor", count: 1 },
        { item: "ftbmaterials:electrum_wire", count: 4 },
      ],
      itemOutputs: [{ item: "xnet:controller", count: 1 }],
    },
    {
      id: "ftb:world_engine/matter_receiver",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "rftoolsbase:machine_frame", count: 1 },
        { item: "ae2:annihilation_core", count: 1 },
        { item: "ftbmaterials:electrum_wire", count: 4 },
      ],
      itemOutputs: [{ item: "rftoolsutility:matter_receiver", count: 1 }],
    },
    {
      id: "ftb:world_engine/matter_transmitter",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "rftoolsbase:machine_frame", count: 1 },
        { item: "ae2:formation_core", count: 1 },
        { item: "ftbmaterials:electrum_wire", count: 4 },
      ],
      itemOutputs: [{ item: "rftoolsutility:matter_transmitter", count: 1 }],
    },
    {
      id: "ftb:world_engine/sfm_manager",
      machineId: "ftb:world_engine",
      duration: 500,
      structures: ["machine_block_upgrade"],
      energyPerTick: 16384,
      itemInputs: [
        { item: "oritech:processing_unit", count: 1 },
        { item: "appflux:energy_processor", count: 1 },
        { item: "sfm:cable", count: 4 },
      ],
      itemOutputs: [{ item: "sfm:manager", count: 1 }],
    },
    {
      id: "ftb:world_engine/ironfurnaces_augment_factory",
      machineId: "ftb:world_engine",
      duration: 10,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "ftbmaterials:diamond_gear", count: 1 },
        { item: "mekanism:basic_control_circuit", count: 1 },
        { item: "minecraft:deepslate", count: 4 },
      ],
      itemOutputs: [{ item: "ironfurnaces:augment_factory", count: 1 }],
    },
    {
      id: "ftb:world_engine/projecte_collector_mk2",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      energyPerTick: 8096,
      itemInputs: [
        { item: "projecte:collector_mk1", count: 1 },
        { item: "projecte:dark_matter_block", count: 1 },
      ],
      itemOutputs: [{ item: "projecte:collector_mk2", count: 1 }],
    },
    {
      id: "ftb:world_engine/world_engine_machine_block_x8",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "oritech:flux_gate", count: 2 },
        { item: "chicken_roost:ingot_enderium", count: 16 },
        {
          item: "actuallyadditions:empowered_diamatine_crystal_block",
          count: 1,
        },
        { item: "industrialforegoing:machine_frame_advanced", count: 1 },
      ],
      itemOutputs: [
        { item: "ftb:world_engine_advanced_machine_block", count: 8 },
      ],
    },
    {
      id: "ftb:world_engine/gateway_coralssus",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "avaritia:diamond_lattice", count: 2 },
        { item: "ars_nouveau:water_essence", count: 4 },
        {
          item: "projecte:dark_matter",
          count: 1,
        }
      ],
      itemOutputs: [
        { item: 'gateways:gate_pearl[gateways:gateway="gateways:coralssus"]', count: 1 },
      ],
    },

    {
      id: "ftb:world_engine/stack_upgrade_tier_2",
      machineId: "ftb:world_engine",
      duration: 80,
      energyPerTick: 2048,
      structures: ["basic_machine_upgrade"],
      itemInputs: [
        { item: "minecraft:iron_ingot", count: 16 },
        { item: "sophisticatedstorage:stack_upgrade_tier_1_plus", count: 1 },
      ],
      itemOutputs: [
        { item: "sophisticatedstorage:stack_upgrade_tier_2", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/stack_upgrade_tier_3",
      machineId: "ftb:world_engine",
      duration: 80,
      energyPerTick: 4096,
      structures: ["basic_machine_upgrade"],
      itemInputs: [
        { item: "minecraft:gold_ingot", count: 16 },
        { item: "sophisticatedstorage:stack_upgrade_tier_2", count: 1 },
      ],
      itemOutputs: [
        { item: "sophisticatedstorage:stack_upgrade_tier_3", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/soul_cage",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["advanced_machine_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "chicken_roost:ingot_enderium", count: 4 },
        { item: "irons_spellbooks:ender_rune", count: 1 },
        { item: "enderio:broken_spawner", count: 1 },
        { item: "apothic_enchanting:infused_breath", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:soulcage", count: 1 }],
    },
    {
      id: "ftb:world_engine/entangled_block_x2",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["advanced_machine_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "oritech:duratium_ingot", count: 4 },
        { item: "oritech:energite_ingot", count: 2 },
        { item: "rftoolsbase:infused_enderpearl", count: 1 },
      ],
      itemOutputs: [{ item: "entangled:block", count: 2 }],
    },
    {
      id: "ftb:world_engine/dragon_egg_enderium",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["machine_block_upgrade", "ender_power_upgrade"],
      energyPerTick: 8192,
      fluidInputs: [
        {
          fluid: "productivemetalworks:molten_ender",
          amount: 800,
          tank: "fluid_input_1",
        },
      ],
      itemInputs: [{ item: "minecraft:dragon_egg", count: 1 }],
      itemOutputs: [{ item: "ftb:enderium_block", count: 8 }],
    },
    {
      id: "ftb:world_engine/apotheosis_mythic_material_x16",
      machineId: "ftb:world_engine",
      duration: 300,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
      ],
      energyPerTick: 32768,
      source: { amount: 10000 },
      itemInputs: [
        { item: "projecte:red_matter", count: 1 },
        { item: "rftoolsbase:infused_enderpearl", count: 16}
      ],
      itemOutputs: [{ item: "apotheosis:mythic_material", count: 16 }],
    },
    {
      id: "ftb:world_engine/dragon_heart",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "draconicevolution:draconium_core", count: 4 },
        { item: "apothic_enchanting:infused_breath", count: 1 },
        { item: "projecte:life_stone", count: 1 },
        { item: "twilightforest:fiery_blood", count: 1 },
      ],
      fluidInputs: [
        {
          fluid: "industrialforegoing:ether_gas",
          amount: 1000,
          tank: "fluid_input_2",
        },
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "draconicevolution:dragon_heart", count: 1 }],
    },
    {
      id: "ftb:world_engine/dm_pedestal",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "projecte:dark_matter_block", count: 4 },
        { item: "draconicevolution:dislocator_pedestal", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "projecte:dm_pedestal", count: 1 }],
    },
    {
      id: "ftb:world_engine/reaction_chamber",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "quantum_tunnel_upgrade",
      ],
      energyPerTick: 32768,
      itemInputs: [
        { item: "extendedae:machine_frame", count: 1 },
        { item: "mekanism:ultimate_control_circuit", count: 2 },
        { item: "ae2:dense_energy_cell", count: 1 },
      ],
      itemOutputs: [{ item: "advanced_ae:reaction_chamber", count: 1 }],
    },
    {
      id: "ftb:world_engine/elite_tier_installer",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "quantum_tunnel_upgrade",
      ],
      energyPerTick: 32768,
      itemInputs: [{ item: "mekanism:advanced_tier_installer", count: 1 }],
      itemOutputs: [{ item: "mekanism:elite_tier_installer", count: 1 }],
    },
    {
      id: "ftb:world_engine/pipez_ultimate_upgrade",
      machineId: "ftb:world_engine",
      duration: 90,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "quantum_tunnel_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "pipez:advanced_upgrade", count: 1 },
        { item: "actuallyadditions:empowered_restonia_crystal", count: 1 },
      ],
      itemOutputs: [{ item: "pipez:ultimate_upgrade", count: 1 }],
    },
    {
      id: "ftb:world_engine/xp_synthesiser",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "quantum_tunnel_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "cognition:cognitive_crystal_block", count: 1 },
        { item: "actuallyadditions:empowered_emeradic_crystal", count: 1 },
      ],
      itemOutputs: [{ item: "xp_synthesiser:xp_synthesiser", count: 1 }],
    },
    {
      id: "ftb:world_engine/warp_scroll",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "twilight_upgrade",
      ],
      source: { amount: 6000 },
      itemInputs: [
        { item: "ars_nouveau:blank_parchment", count: 1 },
        { item: "minecraft:ender_pearl", count: 1 },
      ],
      itemOutputs: [{ item: "ars_nouveau:warp_scroll", count: 1 }],
    },
    {
      id: "ftb:world_engine/ur_ghast",
      machineId: "ftb:world_engine",
      duration: 100,
      energyPerTick: 65536,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "twilight_upgrade",
      ],
      source: { amount: 6000 },
      itemInputs: [
        { item: "minecraft:ghast_tear", count: 8 },
        { item: "minecraft:ender_pearl", count: 1 },
        { item: "hostilenetworks:blank_data_model", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'hostilenetworks:data_model[hostilenetworks:data_model="hostilenetworks:twilightforest/ur_ghast",hostilenetworks:data=64]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/shapers_focus",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["source_upgrade", "twilight_upgrade"],
      source: { amount: 10000 },
      itemInputs: [
        { item: "minecraft:netherite_ingot", count: 4 },
        { item: "ars_nouveau:wilden_spike", count: 1 },
        { item: "cognition:transforming_focus", count: 1 },
        { item: "actuallyadditions:empowered_diamatine_crystal", count: 1 },
      ],
      itemOutputs: [{ item: "ars_nouveau:shapers_focus", count: 1 }],
    },
    {
      id: "ftb:world_engine/soul_laser_base",
      machineId: "ftb:world_engine",
      duration: 90,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "euphonium_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "minecraft:echo_shard", count: 4 },
        { item: "industrialforegoing:machine_frame_supreme", count: 1 },
      ],
      itemOutputs: [
        { item: "industrialforegoingsouls:soul_laser_base", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/ultimate_tier_installer",
      machineId: "ftb:world_engine",
      duration: 90,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "mekanism:elite_tier_installer", count: 1 },
        { item: "mekanism:ultimate_control_circuit", count: 1 },
      ],
      itemOutputs: [{ item: "mekanism:ultimate_tier_installer", count: 1 }],
    },
    {
      id: "ftb:world_engine/sigil_of_supremacy",
      machineId: "ftb:world_engine",
      duration: 280,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 131072,
      itemInputs: [
        { item: "apotheosis:sigil_of_rebirth", count: 1 },
        { item: "draconicevolution:awakened_draconium_ingot", count: 2 },
        { item: "apotheosis:mythic_material", count: 1 },
      ],
      itemOutputs: [{ item: "apotheosis:sigil_of_supremacy", count: 1 }],
    },
    {
      id: "ftb:world_engine/collector_mk3",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 65536,
      itemInputs: [
        { item: "projecte:collector_mk2", count: 1 },
        { item: "projecte:red_matter_block", count: 1 },
      ],
      itemOutputs: [{ item: "projecte:collector_mk3", count: 1 }],
    },
    {
      id: "ftb:world_engine/time_crystal_x4",
      machineId: "ftb:world_engine",
      duration: 60,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
      ],
      energyPerTick: 131072,
      itemInputs: [
        { item: "extendedae:entro_crystal", count: 1 },
        { item: "oritech:fluxite", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
        {
          fluid: "justdirethings:refined_t3_fluid_source",
          amount: 1000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "justdirethings:time_crystal", count: 4 }],
    },
    {
      id: "ftb:world_engine/glyph_animate_block",
      machineId: "ftb:world_engine",
      duration: 500,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
      ],
      energyPerTick: 8192,
      source: { amount: 10000 },
      itemInputs: [
        { item: "ars_nouveau:blank_glyph", count: 1 },
        { item: "malum:imitation_heart", count: 1 },
      ],
      itemOutputs: [{ item: "ars_nouveau:glyph_animate_block", count: 1 }],
    },
    {
      id: "ftb:world_engine/dragon_head",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
      ],
      energyPerTick: 30720,
      itemInputs: [
        { item: "draconicevolution:dragon_heart", count: 1 },
        { item: "minecraft:dragon_egg", count: 1 },
        { item: "draconicevolution:wyvern_core", count: 2 },
        { item: "irons_spellbooks:dragonskin", count: 4 },
        { item: "mob_grinding_utils:saw_upgrade_beheading", count: 8 },
      ],
      itemOutputs: [{ item: "minecraft:dragon_head", count: 1 }],
    },
    {
      id: "ftb:world_engine/worker_token_feed_bread",
      machineId: "ftb:world_engine",
      duration: 200,
      itemInputs: [
        { item: "ftbunearthed:worker_token", count: 1 }, // no components on input
        { item: "minecraft:bread", count: 32 },
      ],
      itemOutputs: [
        'ftbunearthed:worker_token[ftbunearthed:worker_data={level:1,profession:"minecraft:none",type:"ftb:stone"}]',
        'ftbunearthed:worker_token[ftbunearthed:worker_data={level:1,profession:"minecraft:none",type:"ftb:stone"}]',
      ],
    },
    {
      id: "ftb:world_engine/worker_token_feed_baked_potato",
      machineId: "ftb:world_engine",
      duration: 200,
      itemInputs: [
        { item: "ftbunearthed:worker_token", count: 1 }, // no components on input
        { tag: "minecraft:baked_potato", count: 32 },
      ],
      itemOutputs: [
        'ftbunearthed:worker_token[ftbunearthed:worker_data={level:1,profession:"minecraft:none",type:"ftb:stone"}]',
        'ftbunearthed:worker_token[ftbunearthed:worker_data={level:1,profession:"minecraft:none",type:"ftb:stone"}]',
      ],
    },
    {
      id: "ftb:world_engine/infernal_dust",
      machineId: "ftb:world_engine",
      duration: 80,
      structures: ["machine_block_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "minecraft:redstone", count: 2 },
        { item: "minecraft:glowstone_dust", count: 1 },
        { item: "irregular_implements:blackout_powder", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:infernal_dust", count: 4 }],
    },
    {
      id: "ftb:world_engine/structure_compass",
      machineId: "ftb:world_engine",
      duration: 80,
      structures: ["machine_block_upgrade"],
      energyPerTick: 2048,
      itemInputs: [
        { item: "minecraft:compass", count: 1 },
        { item: "occultism:amethyst_dust", count: 2 },
        { item: "justdirethings:ferricore_ingot", count: 4 },
      ],
      itemOutputs: [{ item: "explorerscompass:explorerscompass", count: 1 }],
    },

    {
      id: "ftb:world_engine/interdiction_torch",
      machineId: "ftb:world_engine",
      duration: 80,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      tempC: { min: 350 }, // → "[5000,)"
      energyPerTick: 2048,
      itemInputs: [
        { item: "occultism:spirit_torch", count: 1 },
        { item: "enderio:vibrant_crystal", count: 1 },
        { item: "ftb:infernal_dust", count: 1 },
      ],
      itemOutputs: [{ item: "projecte:interdiction_torch", count: 1 }],
    },
    {
      id: "ftb:world_engine/dm_smithing_template",
      machineId: "ftb:world_engine",
      duration: 160,
      structures: ["machine_block_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "minecraft:netherite_upgrade_smithing_template", count: 1 },
        { item: "projecte:dark_matter", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:dark_matter_smithing_template", count: 1 }],
    },
    {
      id: "ftb:world_engine/rm_smithing_template",
      machineId: "ftb:world_engine",
      duration: 320,
      structures: ["machine_block_upgrade"],
      energyPerTick: 8192,
      itemInputs: [
        { item: "ftb:dark_matter_smithing_template", count: 1 },
        { item: "projecte:red_matter", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:red_matter_smithing_template", count: 1 }],
    },
    {
      id: "ftb:world_engine/iron_band",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      tempC: { min: 350 }, // → "[5000,)"
      energyPerTick: 2048,
      itemInputs: [
        { item: "ftb:magmalith", count: 1 },
        { item: "ftbmaterials:iron_plate", count: 8 },
      ],
      itemOutputs: [{ item: "projecte:iron_band", count: 1 }],
    },
    {
      id: "ftb:world_engine/iron_amulet",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      tempC: { min: 350 }, // → "[5000,)"
      energyPerTick: 2048,
      itemInputs: [
        { item: "ftb:magmalith", count: 1 },
        { item: "minecraft:chain", count: 2 },
        { item: "ftbmaterials:iron_plate", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:iron_amulet", count: 1 }],
    },
    {
      id: "ftb:world_engine/blank_slate",
      machineId: "ftb:world_engine",
      duration: 100,
      structures: ["machine_block_upgrade", "enderium_upgrade"],
      tempC: { min: 350 }, // → "[5000,)"
      energyPerTick: 2048,
      itemInputs: [
        { item: "ftb:magmalith", count: 1 },
        { item: "minecraft:deepslate", count: 1 },
      ],
      itemOutputs: [{ item: "ftb:blank_slate", count: 1 }],
    },
    {
      id: "ftb:world_engine/create/unbreakable_brush",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["shadow_casing_upgrade", "machine_block_upgrade"],
      energyPerTick: 4096,
      su: { speed: 32, stressImpact: 16 },
      itemInputs: [
        { item: "minecraft:netherite_scrap", count: 2 },
        { item: "ftbunearthed:reinforced_brush", count: 1 },
      ],
      itemOutputs: [{ item: "ftbunearthed:unbreakable_brush", count: 1 }],
    },
    {
      id: "ftb:world_engine/unbreakable_brush_ars",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["source_upgrade", "machine_block_upgrade"],
      energyPerTick: 4096,
      source: { amount: 1000 },
      itemInputs: [
        { item: "minecraft:netherite_scrap", count: 2 },
        { item: "ftbunearthed:reinforced_brush", count: 1 },
      ],
      itemOutputs: [{ item: "ftbunearthed:unbreakable_brush", count: 1 }],
    },
    {
      id: "ftb:world_engine/draconic_crafting_core",
      machineId: "ftb:world_engine",
      duration: 500,
      structures: ["advanced_machine_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "projecte:red_matter", count: 1 },
        { item: "replication:replica_ingot", count: 32 },
        { item: "minecraft:lapis_block", count: 8 },
        { item: "draconicevolution:draconium_core", count: 4 },
        { item: "avaritia:crystal_matrix_ingot", count: 1 },
      ],
      itemOutputs: [{ item: "draconicevolution:crafting_core", count: 1 }],
    },
    {
      id: "ftb:world_engine/psu_1",
      machineId: "ftb:world_engine",
      duration: 120,
      itemInputs: [
        { item: "minecraft:iron_ingot", count: 4 },
        { item: "minecraft:piston", count: 2 },
        { item: "minecraft:chest", count: 1 },
        { item: "minecraft:redstone_block", count: 1 },
      ],
      itemOutputs: [{ item: "pocketstorage:psu_1", count: 1 }],
    },
    {
      id: "ftb:world_engine/oritech_particle_collector_block",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: ["advanced_machine_upgrade"],
      energyPerTick: 32768,
      itemInputs: [
        { item: "ftbmaterials:electrum_ingot", count: 8 },
        { item: "oritech:duratium_ingot", count: 1 },
        { item: "oritech:superconductor", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 500, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "oritech:particle_collector_block", count: 1 }],
    },
    {
      id: "ftb:world_engine/neutron_activator",
      machineId: "ftb:world_engine",
      duration: 120,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
      ],
      energyPerTick: 16384,
      itemInputs: [
        { item: "mekanism:steel_casing", count: 1 },
        { item: "mekanism:elite_control_circuit", count: 2 },
        { item: "mekanism:hdpe_sheet", count: 4 },
        { item: "mekanism:alloy_reinforced", count: 2 },
        { item: "ftbmaterials:bronze_plate", count: 3 },
      ],
      itemOutputs: [
        {
          item: 'custommachinery:custom_machine_item[custommachinery:machine="ftb:neutron_activator"]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/advanced_coke_oven_machine_item",
      machineId: "ftb:world_engine",
      duration: 200,
      itemInputs: [
        { item: "immersiveengineering:cokebrick", count: 27 },
        { item: "minecraft:iron_block", count: 1 },
      ],
      fluidInputs: [
        { fluid: "minecraft:lava", amount: 1000, tank: "fluid_input_1" },
      ],
      itemOutputs: [
        {
          item: "custommachinery:custom_machine_item",
          count: 1,
          components: {
            "custommachinery:machine": "ftb:advanced_coke_oven",
          },
        },
      ],
    },
    {
      id: "ftb:world_engine/chronon_resonator",
      machineId: "ftb:world_engine",
      duration: 300,
      energyPerTick: 131072,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
      ],
      itemInputs: [
        { item: "ftb:chroniton_glass", count: 32 },
        { item: "draconicevolution:wyvern_core", count: 16 },
        { item: "justdirethings:time_crystal", count: 8 },
        { item: "tempad:chronon_battery", count: 1 },
        { item: "mekanism:teleportation_core", count: 16 },
      ],
      source: { amount: 20000 },
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 4000, tank: "fluid_input_1" },
        {
          fluid: "oritech:still_sheol_fire",
          amount: 10000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "ftb:chronon_resonator", count: 1 }],
    },
    {
      id: "ftb:world_engine/euphonium_x8",
      machineId: "ftb:world_engine",
      duration: 240,
      energyPerTick: 65536,
      structures: ["source_upgrade", "advanced_machine_upgrade"],
      itemInputs: [
        { item: "cataclysm:cursium_ingot", count: 1 },
        { item: "chicken_roost:ingot_enderium", count: 16 },
        { item: "enderio:vibrant_alloy_ingot", count: 16 },
        { item: "minecraft:sculk", count: 32 },
      ],
      source: { amount: 10000 },
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
        {
          fluid: "enderio:fluid_liquid_darkness_still",
          amount: 10000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "ftb:euphonium", count: 8 }],
    },
    {
      id: "ftb:world_engine/resonant_void_x2",
      machineId: "ftb:world_engine",
      duration: 240,
      energyPerTick: 199999,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
      ],
      itemInputs: [
        { item: "actuallyadditions:empowered_void_crystal", count: 4 },
        { item: "immersiveengineering:resonanz_engineering", count: 4 },
        { item: "oritech:prometheum_ingot", count: 4 },
        { item: "chicken_roost:ingot_enderium", count: 48 },
        { item: "megacells:sky_osmium_ingot", count: 32 },
        { item: "cataclysm:abyssal_egg", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
        {
          fluid: "justdirethings:refined_t3_fluid_source",
          amount: 4000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "ftb:resonant_void", count: 2 }],
    },
    {
      id: "ftb:world_engine/clavis_lock_pick_x5",
      machineId: "ftb:world_engine",
      duration: 60,
      energyPerTick: 1024,
      itemInputs: [
        { item: "minecraft:copper_ingot", count: 2 },
        { item: "irregular_implements:spectre_ingot", count: 1 },
      ],
      fluidInputs: [
        { fluid: "minecraft:lava", amount: 1000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "clavis:lock_pick", count: 5 }],
    },
    {
      id: "ftb:world_engine/chicken/draconium",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 8192,
      structures: ["advanced_machine_upgrade"],
      tempC: { min: 625 },
      itemInputs: [
        { item: "chicken_roost:chicken_food_tier_8", count: 1 },
        { item: "occultism:awakened_feather", count: 8 },
        { item: "malum:refined_soulstone", count: 1 },
        { item: "draconicevolution:draconium_block", count: 4 },
      ],
      fluidInputs: [
        {
          fluid: "productivemetalworks:meat",
          amount: 180,
          tank: "fluid_input_1",
        },
      ],
      itemOutputs: [{ item: "chicken_roost:c_draconium", count: 1 }],
    },
    {
      id: "ftb:world_engine/chicken/neutronium",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 8192,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      tempC: { min: 500 },
      itemInputs: [
        { item: "chicken_roost:chicken_food_tier_9", count: 1 },
        { item: "occultism:awakened_feather", count: 8 },
        { item: "minecraft:heavy_core", count: 1 },
        { item: "avaritia:neutronium_block", count: 4 },
      ],
      fluidInputs: [
        {
          fluid: "productivemetalworks:meat",
          amount: 180,
          tank: "fluid_input_1",
        },
      ],
      itemOutputs: [{ item: "chicken_roost:c_neutron", count: 1 }],
    },
    {
      id: "ftb:world_engine/chicken/timey_wimey",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 8192,
      structures: ["advanced_machine_upgrade"],
      tempC: { min: 500 },
      itemInputs: [
        { item: "chicken_roost:chicken_food_tier_9", count: 1 },
        { item: "ftb:fortron_infused_block", count: 1 },
        { item: "occultism:awakened_feather", count: 8 },
        { item: "justdirethings:time_crystal", count: 4 },
        { item: "tempad:time_steel", count: 36 },
        { item: "create:mysterious_cuckoo_clock", count: 1 },
      ],
      fluidInputs: [
        {
          fluid: "productivemetalworks:meat",
          amount: 180,
          tank: "fluid_input_1",
        },
        {
          fluid: "justdirethings:time_fluid_source",
          amount: 4000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "chicken_roost:c_time", count: 1 }],
    },
    {
      id: "ftb:world_engine/chicken/skystone",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 1024,
      structures: ["machine_block_upgrade"],
      tempC: { min: 150 },
      itemInputs: [
        { item: "chicken_roost:chicken_food_tier_6", count: 1 },
        { item: "occultism:awakened_feather", count: 8 },
        { item: "occultism:otherrock", count: 4 },
        { item: "megacells:sky_steel_block", count: 4 },
      ],
      fluidInputs: [
        {
          fluid: "productivemetalworks:meat",
          amount: 180,
          tank: "fluid_input_1",
        },
      ],
      itemOutputs: [{ item: "chicken_roost:c_skystone", count: 1 }],
    },
    {
      id: "ftb:world_engine/mekanism/gas_burning_generator",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 1024,
      tempC: { min: 350 },
      structures: ["machine_block_upgrade"],
      itemInputs: [
        { item: "mekanism:electrolytic_core", count: 2 },
        { item: "mekanism:superheating_element", count: 1 },
        { item: "ftbmaterials:osmium_ingot", count: 4 },
        { item: "mekanism:alloy_reinforced", count: 8 },
        { item: "powah:thermoelectric_plate", count: 2 },
        { item: "mekanism:elite_control_circuit", count: 1 },
      ],
      itemOutputs: [
        { item: "mekanismgenerators:gas_burning_generator", count: 1 },
      ],
    },
    {
      id: "ftb:world_engine/ftb/circuit_fabricator",
      machineId: "ftb:world_engine",
      duration: 1200,
      energyPerTick: 1024,
      structures: ["machine_block_upgrade"],
      itemInputs: [
        { item: "ftbmaterials:iron_plate", count: 6 },
        { item: "minecraft:piston", count: 2 },
        { item: "ftbmaterials:copper_plate", count: 1 },
        { item: "minecraft:diamond", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'custommachinery:custom_machine_item[custommachinery:machine="ftb:circuit_fabricator"]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/infinity_sword",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_sword", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 2 },
        { item: "avaritia:infinity_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
        {
          fluid: "create_shimmer:carminite_solution",
          amount: 10000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:infinity_sword", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_bow",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "cataclysm:cursed_bow", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 2 },
        { item: "avaritia:infinity_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
        {
          fluid: "create_shimmer:carminite_solution",
          amount: 10000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:infinity_bow", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_shovel",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_shovel", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 6 },
        { item: "avaritia:infinity_ingot", count: 9 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_shovel", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_hoe",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_hoe", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 6 },
        { item: "avaritia:infinity_ingot", count: 9 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_hoe", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_axe",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_axe", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 6 },
        { item: "avaritia:infinity_ingot", count: 9 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_axe", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_pickaxe_fortune",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_pick", count: 1 },
        { item: "avaritia:neutronium_ingot", count: 6 },
        { item: "avaritia:infinity_ingot", count: 9 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_pickaxe", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_chestplate",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_chestplate", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 2 },
        { item: "avaritia:neutronium_ingot", count: 32 },
        { item: "avaritia:crystal_matrix_ingot", count: 16 },
        { item: "avaritia:infinity_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_chestplate", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_helmet",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_helmet", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 2 },
        { item: "avaritia:neutronium_ingot", count: 16 },
        { item: "avaritia:crystal_matrix_ingot", count: 12 },
        { item: "avaritia:infinity_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_helmet", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_leggings",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_leggings", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 2 },
        { item: "avaritia:neutronium_ingot", count: 16 },
        { item: "avaritia:crystal_matrix_ingot", count: 16 },
        { item: "avaritia:infinity_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_leggings", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_boots",
      machineId: "ftb:world_engine",
      duration: 600,
      structures: [
        "source_upgrade",
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 250000,
      source: { amount: 10000 },
      tempC: { min: 1000 },
      itemInputs: [
        { item: "projecte:rm_boots", count: 1 },
        { item: "avaritia:infinity_catalyst", count: 2 },
        { item: "avaritia:neutronium_ingot", count: 16 },
        { item: "avaritia:crystal_matrix_ingot", count: 8 },
        { item: "avaritia:infinity_ingot", count: 10 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:infinity_boots", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_catalyst",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 150000,
      tempC: { min: 750 },
      itemInputs: [
        { item: "avaritia:neutronium_ingot", count: 1 },
        { item: "avaritia:crystal_matrix_ingot", count: 1 },
        { item: "avaritia:endest_pearl", count: 1 },
        { item: "avaritia:infinity_singularity", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 10000, tank: "fluid_input_1" },
        {
          fluid: "justdirethings:time_fluid_source",
          amount: 10000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:infinity_catalyst", count: 1 }],
    },
    {
      id: "ftb:world_engine/neutron_collector",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: ["advanced_machine_upgrade"],
      energyPerTick: 50000,
      tempC: { min: 250 },
      itemInputs: [
        { item: "oritech:reactor_reflector", count: 1 },
        { item: "avaritia:crystal_matrix_ingot", count: 2 },
        { item: "oritech:machine_core_4", count: 4 },
        { item: "oritech:small_plutonium_pellet", count: 3 },
        { item: "fluxnetworks:flux_core", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
        {
          fluid: "oritech:still_strange_matter",
          amount: 1000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:neutron_collector", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_ingot",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 225000,
      tempC: { min: 750 },
      itemInputs: [
        { item: "avaritia:infinity_catalyst", count: 8 },
        { item: "ftb:fortron_infused_ingot", count: 8 },
        { item: "avaritia:neutronium_ingot", count: 16 },
        { item: "avaritia:crystal_matrix_ingot", count: 32 },
        { item: "chicken_roost:ingot_enderium", count: 8 },
        { item: "ftb:stable_antimatter", count: 4 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
        {
          fluid: "justdirethings:time_fluid_source",
          amount: 1000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:infinity_ingot", count: 1 }],
    },
    {
      id: "ftb:world_engine/infinity_singularity",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "awakened_core_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 200000,
      tempC: { min: 750 },
      itemInputs: [
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="duratium_singularity"]',
          count: 1,
        },
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="fortron_infused_singularity"]',
          count: 1,
        },
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="enderium_singularity"]',
          count: 1,
        },
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="energite_singularity"]',
          count: 1,
        },
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="infused_pearl_singularity"]',
          count: 1,
        },
        {
          item: 'avaritia:json_singularity[avaritia:singularity_id="uraninite_singularity"]',
          count: 1,
        },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
        {
          fluid: "oritech:still_strange_matter",
          amount: 100,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:infinity_singularity", count: 1 }],
    },
    {
      id: "ftb:world_engine/endest_pearl",
      machineId: "ftb:world_engine",
      duration: 60,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 200000,
      itemInputs: [
        { item: "minecraft:end_stone", count: 32 },
        { item: "minecraft:ender_pearl", count: 16 },
        { item: "avaritia:neutronium_ingot", count: 4 },
        { item: "minecraft:nether_star", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:endest_pearl", count: 1 }],
    },
    {
      id: "ftb:world_engine/cosmic_stew",
      machineId: "ftb:world_engine",
      duration: 40,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 200000,
      itemInputs: [
        { item: "productivemetalworks:meat_ingot", count: 2 },
        { item: "minecraft:rabbit_stew" },
        { item: "farmersdelight:beef_stew", count: 1 },
        { item: "farmersdelight:fish_stew", count: 1 },
        { item: "farmersdelight:baked_cod_stew", count: 1 },
        { item: "minecraft:mushroom_stew", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:ultimate_stew", count: 1 }],
    },
    {
      id: "ftb:world_engine/cosmic_meatballs",
      machineId: "ftb:world_engine",
      duration: 20,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 200000,
      itemInputs: [
        { item: "productivemetalworks:meat_ingot", count: 2 },
        { item: "minecraft:porkchop", count: 2 },
        { item: "minecraft:chicken", count: 2 },
        { item: "minecraft:beef", count: 2 },
        { item: "avaritia:neutron_pile", count: 1 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
      ],
      itemOutputs: [{ item: "avaritia:cosmic_meatballs", count: 1 }],
    },
    {
      id: "ftb:world_engine/avaritia_compressor",
      machineId: "ftb:world_engine",
      duration: 240,
      structures: [
        "machine_block_upgrade",
        "advanced_machine_upgrade",
        "draconic_upgrade",
        "resonant_void_upgrade",
        "dark_void_upgrade",
      ],
      energyPerTick: 225000,
      itemInputs: [
        { item: "oritech:machine_core_7", count: 1 },
        { item: "enderio:vibrant_gear", count: 2 },
        { item: "avaritia:neutronium_ingot", count: 4 },
        { item: "avaritia:crystal_matrix_ingot", count: 16 },
      ],
      fluidInputs: [
        { fluid: "mffs:fortron_fluid", amount: 2000, tank: "fluid_input_1" },
        {
          fluid: "justdirethings:time_fluid_source",
          amount: 4000,
          tank: "fluid_input_2",
        },
      ],
      itemOutputs: [{ item: "avaritia:compressor", count: 1 }],
    },
    {
      id: "ftb:world_engine/ars_nouveau/sourceberry_bush",
      machineId: "ftb:world_engine",
      duration: 160,
      structures: ["source_upgrade"],
      source: { amount: 500 },
      itemInputs: [{ item: "minecraft:sweet_berries", count: 1 }],
      itemOutputs: [{ item: "ars_nouveau:sourceberry_bush", count: 1 }],
    },
    {
      id: "ftb:world_engine/ars_nouveau/duality_ring",
      machineId: "ftb:world_engine",
      duration: 160,
      structures: ["enchanting_upgrade"],
      source: { amount: 500 },
      itemInputs: [
        { item: "irons_spellbooks:magic_cloth", count: 1 },
        { item: "ars_nouveau:ring_of_potential", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'irons_jewelry:recipe[irons_jewelry:stored_pattern="irons_jewelry:duality_ring"]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/ars_nouveau/duality_necklace",
      machineId: "ftb:world_engine",
      duration: 160,
      structures: ["enchanting_upgrade"],
      source: { amount: 500 },
      itemInputs: [
        { item: "irons_spellbooks:magic_cloth", count: 1 },
        { item: "ars_nouveau:dull_trinket", count: 1 },
      ],
      itemOutputs: [
        {
          item: 'irons_jewelry:recipe[irons_jewelry:stored_pattern="irons_jewelry:duality_necklace"]',
          count: 1,
        },
      ],
    },
    {
      id: "ftb:world_engine/ftb/soul_cage",
      machineId: "ftb:world_engine",
      duration: 200,
      structures: ["enchanting_upgrade", "spirit_upgrade"],
      source: { amount: 2000 },
      energyPerTick: 4096,
      itemInputs: [
        { item: "minecraft:spawner", count: 1 },
        { item: "minecraft:soul_lantern", count: 1 },
        { item: "minecraft:nether_star", count: 2 },
      ],
      itemOutputs: [{ item: "ftb:soulcage", count: 1 }],
    },
    {
      id: "ftb:world_engine/ars_glyph_interact",
      machineId: "ftb:world_engine",
      duration: 210,
      energyPerTick: 256,
      structures: ["source_upgrade"],
      source: { amount: 3500 },
      itemInputs: [
        { item: "ars_nouveau:manipulation_essence", count: 1 },
        { item: "megacells:sky_steel_ingot", count: 4 },
        { item: "ars_nouveau:blank_glyph", count: 1 },
      ],
      itemOutputs: [{ item: "ars_nouveau:glyph_interact", count: 1 }],
    },

    /* Please leave this as a structure reference
        "dark_void_upgrade",
        "infinity_upgrade",
        "euphonium_upgrade",
        "tesseract_upgrade",
        "chroniton_upgrade",
        "quantum_tunnel_upgrade",
        "enchanting_upgrade",
        "ender_power_upgrade",
        "resonant_void_upgrade",
        "fortron_upgrade",
        "advanced_machine_upgrade",
        "enderium_upgrade",
        "spirit_upgrade",
        "machine_block_upgrade",
        "twilight_upgrade",
        "source_upgrade",
        "shadow_casing_upgrade",
        "draconic_upgrade",
        "awakened_core_upgrade"
    */
  ]);

  const souls = [
    "chicken_roost:chicken_essence_tier_1",
    "chicken_roost:chicken_essence_tier_2",
    "chicken_roost:chicken_essence_tier_3",
    "chicken_roost:chicken_essence_tier_4",
    "chicken_roost:chicken_essence_tier_5",
    "chicken_roost:chicken_essence_tier_6",
    "chicken_roost:chicken_essence_tier_7",
    "chicken_roost:chicken_essence_tier_8",
    "chicken_roost:chicken_essence_tier_9",
  ];

  const catalysts = [
    "minecraft:clay",
    "minecraft:redstone_block",
    "actuallyadditions:black_quartz_block",
    "minecraft:diamond_block",
    "minecraft:emerald_block",
    "ftbmaterials:platinum_block",
    "minecraft:nether_star",
    "draconicevolution:awakened_draconium_ingot",
  ];

  const gen = [];

  for (var i = 0; i < catalysts.length; i++) {
    var tier = i + 1; // 1..8
    var idStr = "ftb:we/chicken_souls_t" + tier + "_to_t" + (tier + 1);
    var et = 1024 * tier;

    gen.push({
      id: idStr,
      machineId: "ftb:world_engine",
      duration: 240,
      energyPerTick: et,
      itemInputs: [
        { item: souls[i], count: 3 },
        { item: catalysts[i], count: 1 },
      ],
      itemOutputs: [{ item: souls[i + 1], count: 1 }],
    });

    //weLog("[WorldEngine] Reg: " + idStr + " | T" + tier + "->T" + (tier + 1) + " | E/t=" + et + " | in:3x " + souls[i] + " + " + catalysts[i] + " -> out: " + souls[i + 1]    );
  }
  addWorldEngineRecipes(event, gen);
});

// Lang keys (add these to your pack's lang if you want pretty messages)
const WE_LANG = {
  ONLY_PLAYER: "ftb.world_engine.msg.only_player", // "This command can only be used by a player."
  NEED_BASE: "ftb.world_engine.need_base", // "You don't have a team base."
  WRONG_DIM: "ftb.world_engine.wrong_dimension", // "Use this command inside your Team Base dimension."
  UNKNOWN: "ftb.world_engine.unknown_upgrade", // "Unknown upgrade: %s"
  IN_PROGRESS: "ftb.world_engine.in_progress", // "Upgrade %s is Already in progress"
  NO_PATTERN: "ftb.world_engine.no_pattern", // "Upgrade has no valid pattern."
  MULTI_M: "ftb.world_engine.bad_pattern_multi_m", // "Pattern must contain exactly one 'm' (found %s)."
  BAD_ROWS: "ftb.world_engine.bad_rows", // "All rows in a floor must have the same width."
  MISSING_KEY: "ftb.world_engine.missing_key", // "Missing key mapping for letter '%s'."
  TAG_UNSUP: "ftb.world_engine.tag_unsupported", // "Tags in structure keys aren't supported here: %s"
  PLACING: "ftb.world_engine.placing", // "Placing structure '%s'…"
  DONE: "ftb.world_engine.done", // "Placed %s blocks for '%s'."
  ERROR: "ftb.world_engine.error", // "Could not place structure."
  USAGE: "ftb.world_engine.usage", // "Usage: /worldengine <upgrade>"
  AVAILABLE: "ftb.world_engine.available_prefix", // "Available: "
  RESET: "ftb.world_engine.reset_complete", // "World Engine reset: %s"
  RESET_ALL: "ftb.world_engine.reset_all_complete", // "World Engine Upgrades Reset all"
};

// Anchor (the machine block 'm' in every pattern)
const WE_ANCHOR = { x: 3, y: -20, z: 3 };

// Normalize STRUCTURES[...].pattern to [floors][rows][cols]
function weNormalizePattern(pat) {
  if (!pat || !pat.length) return null;
  if (typeof pat[0] === "string") return [pat];
  return pat;
}

// Find the unique 'm' within a normalized pattern
function weFindAnchor(pFloors) {
  var found = null;
  for (var f = 0; f < pFloors.length; f++) {
    var rows = pFloors[f];
    for (var r = 0; r < rows.length; r++) {
      var row = rows[r];
      for (var c = 0; c < row.length; c++) {
        if (row.charAt(c) === "m") {
          if (found) return { multiple: true };
          found = { f: f, r: r, c: c };
        }
      }
    }
  }
  return found || null;
}

// Make a safe /setblock string; states/NBT aren’t used here—just the id
function makeSetblockCmd(x, y, z, blockId) {
  return `setblock ${x} ${y} ${z} ${blockId} replace`;
}

// Autocomplete list from your STRUCTURES map
function structureNames() {
  try {
    return Object.keys(STRUCTURES || {});
  } catch (_) {
    return [];
  }
}

function weSetBlockCmd(x, y, z, id) {
  return "setblock " + x + " " + y + " " + z + " " + id + " replace";
}

function getArgString(ctx, key) {
  var JString = Java.type("java.lang.String");
  return String(ctx.getArgument(key, JString));
}

// Add/remove forceload on those chunks in the current level
function weSetForceLoad(level, add) {
  var pts = weAnchorChunks();
  for (var i = 0; i < pts.length; i++) {
    var b = pts[i];
    // forceload works on block positions; each point targets its chunk
    var cmd =
      "execute in " +
      level.dimension +
      " run " +
      (add ? "forceload add " : "forceload remove ") +
      b.x +
      " " +
      b.z;
    try {
      level.server.runCommandSilent(cmd);
    } catch (e) {
      weLog("[WorldEngine] forceload failed: " + cmd + " -> " + e);
    }
  }
}

// Compute block coords inside the 2×2 chunk area around (2, -20, 2)
function weAnchorChunks() {
  // chunk coords around anchor (2,2) → (-1,-1), (0,-1), (-1,0), (0,0)
  var pairs = [
    { cx: -1, cz: -1 },
    { cx: 0, cz: -1 },
    { cx: -1, cz: 0 },
    { cx: 0, cz: 0 },
  ];
  // pick a representative block inside each chunk (chunk * 16)
  var blocks = [];
  for (var i = 0; i < pairs.length; i++) {
    var p = pairs[i];
    blocks.push({ x: p.cx * 16 + 8, z: p.cz * 16 + 8 }); // center-ish of chunk
  }
  return blocks;
}

// Core placer used by both single-upgrade and "all"
function wePlaceOne(structName, structDef, base_level, tellFn) {
  var floors = weNormalizePattern(structDef.pattern);
  if (!floors) {
    if (tellFn) tellFn(WE_LANG.NO_PATTERN);
    return { ok: false, placed: 0, reason: "no_pattern" };
  }

  let rowsValidated = validatePatternRows(floors, tellFn);
  if (!rowsValidated.ok) return rowsValidated;

  // find anchor
  var anchor = weFindAnchor(floors);
  if (!anchor || anchor.multiple) {
    var countStr = anchor && anchor.multiple ? "multiple" : "0";
    if (tellFn) tellFn(WE_LANG.MULTI_M, String(countStr));
    return { ok: false, placed: 0, reason: "anchor" };
  }

  var keyCheck = validateStructureKeys(structDef, tellFn);
  if (!keyCheck.ok) return keyCheck;
  if (tellFn) tellFn(WE_LANG.PLACING, structName);

  weSetForceLoad(base_level, true);
  WorldEngineStateMachine.setState(base_level, WORLDENGINE_STATES.ACTIVE);
  WorldEngineStateMachine.setStructure(base_level, structName);
  let blockPosMap = createBlockMap(base_level, structDef);
  blockPosMap = randomizeMap(blockPosMap);
  let block_delay = getBlockDelayForStructure(blockPosMap, 12 * 1000);
  let delay = 0;
  let iteration = 0;

  base_level.runCommandSilent(
    `execute in ${base_level.dimension} positioned ${WE_ANCHOR.x} ${WE_ANCHOR.y} ${WE_ANCHOR.z} run playsound mekanism:tile.machine.antiprotonic_nucleosynthesizer`
  );
  blockPosMap.forEach((value, key) => {
    base_level.getBlock(key.x, key.y, key.z).set("minecraft:air"); // DEV: remove existing block for testing!
    let alreadyThere = base_level.getBlock(key.x, key.y, key.z).id === value;
    if (alreadyThere) {
      iteration++;
      if (iteration === blockPosMap.size) {
        WorldEngineStateMachine.setState(
          base_level,
          WORLDENGINE_STATES.FINISHED
        );
        WorldEngineStateMachine.killDisplays(base_level);
        if (tellFn) tellFn(WE_LANG.DONE, String(iteration), structName);
      }
      return;
    }

    let scale = 0.5;
    delay += block_delay;
    base_level.server.runCommandSilent(
      `execute in ${base_level.dimension} run summon block_display ${key.x} ${key.y} ${key.z} {transformation:{left_rotation:[0f,0f,0f,1f],right_rotation:[0f,0f,0f,1f],scale:[${scale}f,${scale}f,${scale}f],translation:[-0.25f,0.25f,-0.25f]},block_state:{Name:"irregular_implements:translucent_luminous_block_lime"}}`
    );
    base_level.server.schedule(delay, () => {
      if (base_level.getServer().getConnection().running == false) {
        return;
      }
      let x = key.x;
      let y = key.y;
      let z = key.z;
      let spread = 1.5;
      base_level.spawnParticles(
        "ae2:vibrant_fx ",
        true,
        x,
        y,
        z,
        spread,
        spread,
        spread,
        200,
        1
      );
    });
    // actual placement
    base_level.server.schedule(delay, () => {
      if (base_level.getServer().getConnection().running == false) {
        return;
      }
      iteration++;
      let x = key.x;
      let y = key.y;
      let z = key.z;
      let blockId = value;
      base_level.getBlock(x, y, z).set(blockId);
      base_level.server.runCommandSilent(
        `execute in ${base_level.dimension} run execute positioned ${x} ${y} ${z} run kill @e[type=minecraft:block_display,distance=..1,limit=1,sort=nearest]`
      );
      if (iteration === blockPosMap.size) {
        WorldEngineStateMachine.setState(
          base_level,
          WORLDENGINE_STATES.FINISHED
        );
        if(POST_EVENTS && POST_EVENTS[structName]) {
          POST_EVENTS[structName](base_level);
        }
        WorldEngineStateMachine.killDisplays(base_level);
        if (tellFn) tellFn(WE_LANG.DONE, String(iteration), structName);
      }
    });
    const total = blockPosMap.size || 1;
    // const step = Math.max(1, Math.round(total / 10));
  });
}

const createBlockMap = (level, structDef) => {
  let map = new Map();
  let floors = weNormalizePattern(structDef.pattern);
  let anchor = weFindAnchor(floors);
  let ax = WE_ANCHOR.x;
  let ay = WE_ANCHOR.y;
  let az = WE_ANCHOR.z;
  for (let f = 0; f < floors.length; f++) {
    let rows = floors[f];
    for (let r = 0; r < rows.length; r++) {
      let row = rows[r];
      for (let c = 0; c < row.length; c++) {
        let ch = row.charAt(c);
        if (ch === " " || ch === "m") continue;
        let x = ax + (c - anchor.c);
        let y = ay + (f - anchor.f);
        let z = az + (r - anchor.r);
        map.set(level.getBlock(x, y, z).pos, structDef.keys[ch]);
      }
    }
  }
  return map;
};

const randomizeMap = (map) => {
  let entries = Array.from(map.entries());
  for (let i = entries.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let tmp = entries[i];
    entries[i] = entries[j];
    entries[j] = tmp;
  }
  return new Map(entries);
};

/**
 *
 * @param {Map<any, any>} structure
 * @param {number} time_limit Time limit in ticks
 */
function getBlockDelayForStructure(structure, time_limit) {
  return 1 / (structure.size / time_limit);
}

// validate keys (extracted to helper)
function validateStructureKeys(structDef, tellFn) {
  var keys = structDef.keys || {};
  for (var ch in keys) {
    if (!Object.prototype.hasOwnProperty.call(keys, ch)) continue;
    var id = String(keys[ch]);
    if (!id || id.length === 0) {
      if (tellFn) tellFn(WE_LANG.MISSING_KEY, ch);
      return { ok: false, placed: 0, reason: "missing_key:" + ch };
    }
    if (id.charAt(0) === "#") {
      if (tellFn) tellFn(WE_LANG.TAG_UNSUP, id);
      return { ok: false, placed: 0, reason: "tag:" + id };
    }
  }
  return { ok: true };
}

// helper: validate that all rows in each floor have the same width
function validatePatternRows(floors, tellFn) {
  if (!Array.isArray(floors)) return { ok: true };
  for (var f = 0; f < floors.length; f++) {
    var rows = floors[f];
    if (!rows || !rows.length) continue;
    var width = rows[0].length;
    for (var r = 0; r < rows.length; r++) {
      if (rows[r].length !== width) {
        if (tellFn) tellFn(WE_LANG.BAD_ROWS);
        return { ok: false, placed: 0, reason: "bad_rows" };
      }
    }
  }
  return { ok: true };
}

ServerEvents.commandRegistry(function (event) {
  var Commands = event.commands;

  // Collect upgrade names from STRUCTURES
  var STRUCTS = typeof STRUCTURES !== "undefined" ? STRUCTURES : {};
  var UPGRADE_KEYS = [];
  for (var k in STRUCTS)
    if (Object.prototype.hasOwnProperty.call(STRUCTS, k)) UPGRADE_KEYS.push(k);

  // Root literal
  var root = Commands.literal("worldengine").requires(src => src.hasPermission(3));

   // --- /worldengine all ---
  root = root.then(
    Commands.literal("all").executes(function (context) {
      var source = context.getSource();
      var player;
      try {
        player = source.getPlayerOrException();
      } catch (e) {
        source.sendSuccess(Text.translate(WE_LANG.ONLY_PLAYER), false);
        return 0;
      }

      // base check
      var baseOpt = $BaseInstanceManager
        .get(source.getServer())
        .getBaseForPlayer(player);
      if (!baseOpt.isPresent()) {
        player.sendSystemMessage(Text.translate(WE_LANG.NEED_BASE));
        return 1;
      }

      // dimension check
      var base = baseOpt.get();
      var baseDim = base.dimension();
      let base_level = player
        .getServer()
        ["getLevel(net.minecraft.resources.ResourceKey)"](baseDim);

      player[
        "teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"
      ](base_level, 3.5, -20, 5.5, 180, 0);
      player.sendSystemMessage(Text.translate(WE_LANG.ALL_START), true);

      var totalPlaced = 0;
      var successCount = 0;
      var failed = [];

      for (var i = 0; i < UPGRADE_KEYS.length; i++) {
        var name = UPGRADE_KEYS[i];
        var struct = STRUCTS[name];
        if (!struct) {
          failed.push(name);
          continue;
        }

        var res = wePlaceOne(name, struct, base_level, function (key) {
          player.sendSystemMessage(Text.translate.apply(Text, arguments), true);
        });

        if (res?.ok) {
          successCount++;
          totalPlaced += res.placed;
        } else {
          failed.push(name);
        }
      }

      var failedStr = failed.length ? failed.join(", ") : "none";
      player.sendSystemMessage(
        Text.translate(
          WE_LANG.ALL_SUM,
          String(totalPlaced),
          String(successCount),
          failedStr
        )
      );
      return 1;
    })
  );

  // --- /worldengine <upgrade>  ---
  for (var i = 0; i < UPGRADE_KEYS.length; i++) {
    (function (upgradeName) {
      root = root.then(
        Commands.literal(upgradeName).executes(function (context) {
          var source = context.getSource();
          var player;
          try {
            player = source.getPlayerOrException();
          } catch (e) {
            source.sendSuccess(Text.translate(WE_LANG.ONLY_PLAYER), false);
            return 0;
          }

          var baseOpt = $BaseInstanceManager
            .get(source.getServer())
            .getBaseForPlayer(player);
          if (!baseOpt.isPresent()) {
            player.sendSystemMessage(Text.translate(WE_LANG.NEED_BASE));
            refundWorldEngineQuest(player, upgradeName);
            return 0;
          }

          var base = baseOpt.get();
          var baseDim = base.dimension();
          var struct = STRUCTS[upgradeName];
          if (!struct) {
            player.sendSystemMessage(
              Text.translate(WE_LANG.UNKNOWN, upgradeName)
            );
            refundWorldEngineQuest(player, upgradeName);
            return 0;
          }

          let base_level = player
            .getServer()
            ["getLevel(net.minecraft.resources.ResourceKey)"](baseDim);

          if (
            WorldEngineStateMachine.getState(base_level) ==
            WORLDENGINE_STATES.ACTIVE
          ) {
            player.sendSystemMessage(
              Text.translate(WE_LANG.IN_PROGRESS, upgradeName)
            );
            refundWorldEngineQuest(player, upgradeName);
            return 0;
          }
          player["teleportTo(net.minecraft.server.level.ServerLevel,double,double,double,float,float)"](base_level, 3.5, -20, 5.5, 180, 0)
          if(STRUCTS[upgradeName].cutscene){
            player.level.server.scheduleInTicks(20, () => {
              console.log("Starting cutscene for structure:", upgradeName);
              STRUCTS[upgradeName].cutscene(player);
            })
          }
          var res = wePlaceOne(upgradeName, struct, base_level, function () {
            player.sendSystemMessage(Text.translate.apply(Text, arguments));
          });
          return 1; // still return success so the chain completes
        })
      );
    })(UPGRADE_KEYS[i]);
  }



  // Bare /worldengine -> usage + list
  root = root.executes(function (context) {
    var source = context.getSource();
    var list = [];
    for (var i = 0; i < UPGRADE_KEYS.length; i++) list.push(UPGRADE_KEYS[i]);
    source.sendSuccess(Text.translate(WE_LANG.USAGE), false);
    source.sendSuccess(
      Text.translate(WE_LANG.AVAILABLE).append(
        Text.of("all, " + list.join(", "))
      ),
      false
    );
    return 1;
  });

  root = root.then(Commands.literal("reset").then(Commands.literal("all").executes(function (context) {
    var source = context.getSource();
    var player;
    try {
      player = source.getPlayerOrException();
    } catch (e) {
      source.sendSuccess(Text.translate(WE_LANG.ONLY_PLAYER), false);
      return 0;
    }
    var baseOpt = $BaseInstanceManager
      .get(source.getServer())
      .getBaseForPlayer(player);
    if (!baseOpt.isPresent()) {
      player.sendSystemMessage(Text.translate(WE_LANG.NEED_BASE));
      return 1;
    }
    var base = baseOpt.get();
    var baseDim = base.dimension();
    let base_level = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](baseDim)
    // for all STRUCTURES, remove placed blocks with air
    Object.values(STRUCTURES).forEach((structDef, structName) => {
      setBlocksToAir(base_level, structDef);
    });
    player.tell(Text.translate(WE_LANG.RESET_ALL));
    return 1;
  })));

  Object.keys(STRUCTURES).forEach(structName => {
    root = root.then(Commands.literal("reset").then(Commands.literal(structName).executes(function (context) {
      var source = context.getSource();
      var player;
      try {
        player = source.getPlayerOrException();
      }
      catch (e) {
        source.sendSuccess(Text.translate(WE_LANG.ONLY_PLAYER), false);
        return 0;
      }
      var baseOpt = $BaseInstanceManager
        .get(source.getServer())
        .getBaseForPlayer(player);
      if (!baseOpt.isPresent()) {
        player.sendSystemMessage(Text.translate(WE_LANG.NEED_BASE));
        return 1;
      }
      var base = baseOpt.get();
      var baseDim = base.dimension();
      let base_level = player.getServer()["getLevel(net.minecraft.resources.ResourceKey)"](baseDim)
      var structDef = STRUCTURES[structName];
      if (!structDef) {
        player.sendSystemMessage(Text.translate(WE_LANG.UNKNOWN, structName));
        return 0;
      }
      setBlocksToAir(base_level, structDef);
      console.log(`[WorldEngine] Reset structure: ${structName}`);
      // player.tell(Text.translate(WE_LANG.RESET, structName));
      return 1;
    })));
  });
  
  event.register(root);
});

const setBlocksToAir = (level, struct) => {
  let floors = weNormalizePattern(struct.pattern);
      let anchor = weFindAnchor(floors);
      let ax = WE_ANCHOR.x
      let ay = WE_ANCHOR.y
      let az = WE_ANCHOR.z
      for (let f = 0; f < floors.length; f++) {
        let rows = floors[f];
        for (let r = 0; r < rows.length; r++) {
          let row = rows[r];
          for (let c = 0; c < row.length; c++) {
            let ch = row.charAt(c);
            if (ch === " " || ch === "m") continue;
            let x = ax + (c - anchor.c);
            let y = ay + (f - anchor.f);
            let z = az + (r - anchor.r);
            level.getBlock(x, y, z).set("minecraft:air");
          }
        }
      }
}


const WORLDENGINE_AUTOBUILD_QUESTS = {
  source_upgrade: "3917A0EC517F70E6",
  machine_block_upgrade: "76673B8374630924",
  shadow_casing_upgrade: "04E68DA90DC83B45",
  enchanting_upgrade: "50B0E45705EDB5F2",
  chroniton_upgrade: "101B8D9769D835AB",
  spirit_upgrade: "0FF5D73B3256F400",
  ender_power_upgrade: "7EEBD17F0EA6EE0C",
  tesseract_upgrade: "727070B13B966DE1",
  enderium_upgrade: "2EA7D8A9632F845F",
  fortron_upgrade: "55D17BDE3E9C81CC",
  advanced_machine_upgrade: "21E1A72027DBF236",
  draconic_upgrade: "51B3EF0BCEB804A4",
  quantum_tunnel_upgrade: "02BC8FCDB2D94F0E",
  euphonium_upgrade: "14537A63D3BDC09B",
  resonant_void_upgrade: "5FDB9EC42FE936C6",
  twilight_upgrade: "383DAD591823C746",
  awakened_core_upgrade: "5C8773D5561D7245",
  dark_void_upgrade: "65B10C46C1AE5026",
  infinity_upgrade: "5804356B2AFCF14A",
};
const refundWorldEngineQuest = (player, upgradeKey) => {
  let questId = WORLDENGINE_AUTOBUILD_QUESTS[upgradeKey];
  if (!questId) return;
  let quest = getQuestObject(player.level, questId);
  if (!quest) return;
  let children = quest.getChildren();
  children.forEach((child) => {
    player.give(
      Item.of(child.getItemStack()).withCount(child.getMaxProgress())
    );
  });
};

const WORLDENGINE_STATES = {
  IDLE: 0,
  ACTIVE: 1,
  FINISHED: 2,
};

const WorldEngineStateMachine = {
  init: function (level) {
    var data = level.persistentData;
    if (!data["world_engine"]) {
      data["world_engine"] = {
        state: WORLDENGINE_STATES.IDLE,
        structure: null,
      };
    }
  },
  reset: function (level) {
    var data = level.persistentData;
    data["world_engine"]["state"] = WORLDENGINE_STATES.IDLE;
    data["world_engine"]["structure"] = null;
  },
  tryContinue: function (level, player) {
    if (this.getState(level) !== WORLDENGINE_STATES.ACTIVE) return;
    let struct = this.getStructure(level);
    if (!struct) return;
    var structDef = STRUCTURES[struct];
    if (!structDef) return;
    wePlaceOne(struct, structDef, level, function () {
      player.sendSystemMessage(Text.translate.apply(Text, arguments));
    });
  },
  getData: function (level) {
    var data = level.persistentData;
    return data["world_engine"] || null;
  },
  getState: function (level) {
    var data = level.persistentData;
    switch (data["world_engine"]["state"].getAsInt()) {
      case 1:
        return WORLDENGINE_STATES.ACTIVE;
      case 2:
        return WORLDENGINE_STATES.FINISHED;
      default:
        return WORLDENGINE_STATES.IDLE;
    }
  },
  setState: function (level, state) {
    var data = level.persistentData;
    if (!data["world_engine"]) {
      this.init(level);
    }
    data["world_engine"]["state"] = state;
    if (state == WORLDENGINE_STATES.FINISHED) {
      weSetForceLoad(level, false);
    }
  },
  getStructure: function (level) {
    var data = level.persistentData;
    return data["world_engine"]["structure"].getAsString() || null;
  },
  setStructure: function (level, struct) {
    var data = level.persistentData;
    if (!data["world_engine"]) {
      this.init(level);
    }
    data["world_engine"]["structure"] = struct;
  },
  killDisplays: function (level) {
    let center = WE_ANCHOR;
    let offset = 25;
    level.server.runCommandSilent(
      `execute in ${level.dimension} positioned ${center.x + offset} ${
        center.y + offset
      } ${
        center.z + offset
      } run kill @e[type=minecraft:block_display,distance=..128,sort=nearest]`
    );
  },
};

// On player login, check if WE was active in their team dim and continue if so
PlayerEvents.loggedIn((event) => {
  const { level, player, server } = event;
  let teamDim = Teams.getTeamsDimensionByPlayer(player);
  if (!teamDim) return;
  WorldEngineStateMachine.init(teamDim);
  WorldEngineStateMachine.tryContinue(teamDim, player);
});


