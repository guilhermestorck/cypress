import { Architect } from '@angular-devkit/architect';
import { TestingArchitectHost } from '@angular-devkit/architect/testing';
import { schema } from '@angular-devkit/core';
import { join } from 'path';
import { expect } from 'chai';

describe('@cypress/schematic: builder', () => {
  let architect: Architect;
  let architectHost: TestingArchitectHost;

  beforeEach(async () => {
    const registry = new schema.CoreSchemaRegistry();


    registry.addPostTransform(schema.transforms.addUndefinedDefaults);

    // TestingArchitectHost() takes workspace and current directories.
    architectHost = new TestingArchitectHost('sandbox', __dirname);
    console.log("🚀 ~ file: index_spec.ts ~ line 18 ~ beforeEach ~ architectHost", architectHost)
    architect = new Architect(architectHost, registry);
    console.log("🚀 ~ file: index_spec.ts ~ line 19 ~ beforeEach ~ architect", architect)

    // This will either take a Node package name, or a path to the directory
    // for the package.json file.
    await architectHost.addBuilderFromPackage(join(__dirname, './../../..'),);
  });

  it('runs cypress', async () => {
    const run = await architect.scheduleBuilder('@cypress/schematic:cypress', {});

    const output = await run.result;

    // Stop the builder from running. This stops Architect from keeping
    // the builder-associated states in memory, since builders keep waiting
    // to be scheduled.
    await run.stop();

    // Expect that the test was successful
    expect(output).to.have.property("success", true);
  });
});
