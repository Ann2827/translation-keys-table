import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import bin from 'rollup-plugin-bin';
import { terser } from "rollup-plugin-terser";
import dev from 'rollup-plugin-dev';

export default [
  {
    input: "src/bin/index.ts",
    output: {
      name: "Library main bin script",
      exports: 'named',
      file: "dist/bin/index.cjs",
      format: "cjs",
      sourcemap: false
    },
    plugins: [
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      bin(),
      dev('.'),
      // terser({
      //   output: {
      //     comments: false
      //   }
      // }),
    ],
  },
  {
    input: "src/lib/index.ts",
    output: {
      name: "Library script",
      exports: 'named',
      file: "dist/lib/index.mjs",
      format: "es",
      sourcemap: false
    },
    plugins: [
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      dev('.'),
      // terser({
      //   output: {
      //     comments: false
      //   }
      // }),
    ],
  },
  {
    input: "src/bin/grantPerms.ts",
    output: {
      name: "Library grant permissions for read dir",
      exports: 'named',
      file: "dist/bin/grantPerms.mjs",
      format: "es",
      sourcemap: false
    },
    plugins: [
      json(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json", declaration: false }),
      // dev('.'),
      // terser({
      //   output: {
      //     comments: false
      //   }
      // }),
    ],
  },
];
