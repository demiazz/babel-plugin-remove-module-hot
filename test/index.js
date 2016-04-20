import { readdir } from 'fs';
import { join } from 'path';
import { transformFile } from 'babel-core';
import test from 'ava';

import plugin from '../src';


const fixturesPath = join(__dirname, 'fixtures');


function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

function getTestsList() {
  return new Promise((resolve, reject) => {
    readdir(fixturesPath, (err, tests) => {
      return err ? reject(err) : resolve(tests);
    });
  });
}

function getActualResult(testName) {
  const fileName = join(fixturesPath, testName, 'source.js');

  return new Promise((resolve, reject) => {
    const options = { babelrc: false, plugins: [ plugin ] };

    transformFile(fileName, options, (err, result) => {
      return err ? reject(err) : resolve(trim(result.code));
    });
  });
}

function getExpectedResult(testName) {
  const fileName = join(fixturesPath, testName, 'expected.js');

  return new Promise((resolve, reject) => {
    const options = { babelrc: false };

    transformFile(fileName, options, (err, result) => {
      return err ? reject(err) : resolve(trim(result.code));
    });
  });
}

async function runTest(testName) {
  test(testName, async t => {
    const actual = await getActualResult(testName);
    const expected = await getExpectedResult(testName);

    t.is(actual, expected);
  });
}

async function runTests() {
  const tests = await getTestsList();

  tests.forEach(testName => runTest(testName));
}

runTests();
