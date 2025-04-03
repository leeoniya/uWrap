import test from 'node:test';
import assert from 'node:assert/strict';

import { varPreLine } from '../dist/uWrap.mjs';

import { Canvas, FontLibrary } from 'skia-canvas';

FontLibrary.use([import.meta.dirname + '/../demo/inter-v18-latin-regular.woff2']);
let font = "14px Inter, sans-serif";

let can = new Canvas();
let ctx = can.getContext("2d");
ctx.font = font;
ctx.letterSpacing = '0.15px';
// ctx.wordSpacing = '100px';

// console.log(can.engine);

const { each, split, count, test: utest } = varPreLine(ctx);

test('quick brown', async (t) => {
  const text = 'The quick brown fox jumps over the lazy dog.';
  let expect = [
    'The quick',
    'brown fox',
    'jumps over',
    'the lazy dog.',
  ];

  const width = 100;

  await t.test('width 100, each()', () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });

    assert.deepEqual(lines, expect);
  });

  await t.test('width 100, each(), early halt', () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));

      if (lines.length == 2)
        return false;
    });

    assert.deepEqual(lines, [
      'The quick',
      'brown fox',
    ]);
  });

  await t.test('width 100, split()', () => {
    assert.deepEqual(split(text, width), expect);
  });

  await t.test('width 100, split(), limit', () => {
    assert.deepEqual(split(text, width, 3), [
      'The quick',
      'brown fox',
      'jumps over',
    ]);
  });


  await t.test('width 100, count()', () => {
    assert.deepEqual(count(text, width), 4);
  });

  await t.test('width 100, test(), true', () => {
    assert.deepEqual(utest(text, width), true);
  });

  await t.test('width 100, test(), false', () => {
    assert.deepEqual(utest('abc', width), false);
  });

  await t.test('width 100, trailing and leading whitespace', () => {
    const text2 = `     ${text}  `;

    let lines = [];
    each(text2, width, (idx0, idx1) => {
      lines.push(text2.slice(idx0, idx1));
    });

    assert.deepEqual(lines, expect);
  });

  await t.test('width 105, explicit \\n', () => {
    const text2 = 'The\nquick\n\nbrown fox jumps over the lazy dog.';
    const width = 105;
    let expect = [
      'The',
      'quick',
      '',
      'brown fox',
      'jumps over the',
      'lazy dog.'
    ];

    let lines = [];
    each(text2, width, (idx0, idx1) => {
      lines.push(text2.slice(idx0, idx1));
    });

    assert.deepEqual(lines, expect);
  });
});

test('actors', async (t) => {
  const text = 'Rodney Dangerfield, Keith Gordon, Sally Kellerman, Robert Downey jr., Burt Young, Ned Beatty, Terry Farrell, Paxton Whitehead, M. Emmet Walsh, Adrienne Barbeau';

  let width = 101;
  let expect = [
    'Rodney',
    'Dangerfield,',
    'Keith Gordon,',
    'Sally',
    'Kellerman,',
    'Robert',
    'Downey jr.,',
    'Burt Young,',
    'Ned Beatty,',
    'Terry Farrell,',
    'Paxton',
    'Whitehead, M.',
    'Emmet Walsh,',
    'Adrienne',
    'Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });


  width = 121;
  expect = [
    'Rodney',
    'Dangerfield,',
    'Keith Gordon,',
    'Sally Kellerman,',
    'Robert Downey',
    'jr., Burt Young,',
    'Ned Beatty, Terry',
    'Farrell, Paxton',
    'Whitehead, M.',
    'Emmet Walsh,',
    'Adrienne',
    'Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });

  width = 134;
  expect = [
    'Rodney',
    'Dangerfield, Keith',
    'Gordon, Sally',
    'Kellerman, Robert',
    'Downey jr., Burt',
    'Young, Ned Beatty,',
    'Terry Farrell,',
    'Paxton Whitehead,',
    'M. Emmet Walsh,',
    'Adrienne Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });

  width = 152;
  expect = [
    'Rodney Dangerfield,',
    'Keith Gordon, Sally',
    'Kellerman, Robert',
    'Downey jr., Burt',
    'Young, Ned Beatty,',
    'Terry Farrell, Paxton',
    'Whitehead, M. Emmet',
    'Walsh, Adrienne',
    'Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });

  width = 205;
  expect = [
    'Rodney Dangerfield, Keith',
    'Gordon, Sally Kellerman,',
    'Robert Downey jr., Burt',
    'Young, Ned Beatty, Terry',
    'Farrell, Paxton Whitehead, M.',
    'Emmet Walsh, Adrienne',
    'Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });

  width = 300;
  expect = [
    'Rodney Dangerfield, Keith Gordon, Sally',
    'Kellerman, Robert Downey jr., Burt Young,',
    'Ned Beatty, Terry Farrell, Paxton',
    'Whitehead, M. Emmet Walsh, Adrienne',
    'Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });

  width = 407;
  expect = [
    'Rodney Dangerfield, Keith Gordon, Sally Kellerman, Robert',
    'Downey jr., Burt Young, Ned Beatty, Terry Farrell, Paxton',
    'Whitehead, M. Emmet Walsh, Adrienne Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});

test('actors (wrap after dash)', async (t) => {
  const text = 'Rodney-Dangerfield, Keith Gordon, Sally Kellerman, Robert-Downey jr., Burt Young, Ned Beatty, Terry Farrell, Paxton Whitehead, M. Emmet Walsh, Adrienne Barbeau';

  let width = 134;
  let expect = [
    'Rodney-',
    'Dangerfield, Keith',
    'Gordon, Sally',
    'Kellerman, Robert-',
    'Downey jr., Burt',
    'Young, Ned Beatty,',
    'Terry Farrell,',
    'Paxton Whitehead,',
    'M. Emmet Walsh,',
    'Adrienne Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});

test('actors (wrap includes dash)', async (t) => {
  const text = 'Rodney-Dangerfield, Keith Gordon, Sally Kellerman, Robert3-Downey jr., Burt Young, Ned Beatty, Terry Farrell, Paxton Whitehead, M. Emmet Walsh, Adrienne Barbeau';

  let width = 135;
  let expect = [
    'Rodney-',
    'Dangerfield, Keith',
    'Gordon, Sally',
    'Kellerman,',
    'Robert3-Downey',
    'jr., Burt Young, Ned',
    'Beatty, Terry',
    'Farrell, Paxton',
    'Whitehead, M.',
    'Emmet Walsh,',
    'Adrienne Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});

test('actors (long unbreakable line)', async (t) => {
  const text = 'RodneyDangerfield,KeithGordon,SallyKellerman,RobertDowneyjr., Burt Young, Ned Beatty, Terry Farrell, Paxton Whitehead, M. Emmet Walsh, Adrienne Barbeau';

  let width = 300;
  let expect = [
    'RodneyDangerfield,KeithGordon,SallyKellerman,RobertDowneyjr.,',
    'Burt Young, Ned Beatty, Terry Farrell,',
    'Paxton Whitehead, M. Emmet Walsh,',
    'Adrienne Barbeau'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});

test('movie', async (t) => {
  const text = "Bugs Bunny's Third Movie: 1001 Rabbit Tales";

  let width = 136;
  let expect = [
    "Bugs Bunny's Third",
    'Movie: 1001 Rabbit',
    'Tales'
  ];

  await t.test(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});

test('test', async (t) => {
  const text = "They were lost without the knowledgeable pig that composed their prune.";

  let width = 234;
  let expect = [
    "They were lost without the",
    'knowledgeable pig that composed', // should not wrap "composed" to next line
    'their prune.'
  ];

  await t.skip(`width ${width}`, () => {
    let lines = [];
    each(text, width, (idx0, idx1) => {
      lines.push(text.slice(idx0, idx1));
    });
    assert.deepEqual(lines, expect);
  });
});