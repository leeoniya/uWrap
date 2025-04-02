import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const ver = "v" + pkg.version;
const urlVer = "https://github.com/leeoniya/uWrap (" + ver + ")";
const banner = [
  "/**",
  "* Copyright (c) " + new Date().getFullYear() + ", Leon Sorokin",
  "* All rights reserved. (MIT Licensed)",
  "*",
  "* uWrap.js",
  "* A small, fast line wrapping thing for Canvas2D",
  "* " + urlVer,
  "*/",
  "",
].join("\n");

function bannerlessESM() {
  return {
    name: 'stripBanner',
    resolveId(importee) {
      if (importee == 'uWrap')
        return importee;
      return null;
    },
    load(id) {
      if (id == 'uWrap')
        return fs.readFileSync('./dist/uWrap.mjs', 'utf8').replace(/\/\*\*.*?\*\//gms, '');
      return null;
    }
  };
}

const terserOpts = {
  compress: {
    inline: 0,
    passes: 2,
    keep_fargs: false,
    pure_getters: true,
    unsafe: true,
    unsafe_comps: true,
    unsafe_math: true,
    unsafe_undefined: true,
  },
  output: {
    comments: /^!/
  }
};

export default [
  {
    input: 'src/uWrap.ts',
    output: {
      file: 'dist/uWrap.mjs',
      format: 'es',
      banner,
    },
    plugins: [
      typescript(),
    ],
  },
  {
    input: 'dist/uWrap.mjs',
    output: {
      name: 'uWrap',
      file: 'dist/uWrap.iife.js',
      format: 'iife',
    },
    plugins: [
      bannerlessESM(),
    ],
  },
  {
    input: 'dist/uWrap.mjs',
    output: {
      name: 'uWrap',
      file: 'dist/uWrap.iife.min.js',
      format: 'iife',
      banner: "/*! " + urlVer + " */",
    },
    plugins: [
      bannerlessESM(),
      terser(terserOpts),
    ],
  }
];