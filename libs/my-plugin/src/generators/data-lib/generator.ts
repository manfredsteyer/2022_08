import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  Tree,
} from '@nrwl/devkit';

// ng g lib
import {
  libraryGenerator,
} from '@nrwl/angular/generators';

import * as path from 'path';
import { MyPluginGeneratorSchema } from './schema';
import { names } from 'nx/src/utils/command-line-utils';

export default async function (tree: Tree, options: MyPluginGeneratorSchema) {

  tree.write('demo.txt', 'Just a test!');

  await libraryGenerator(tree, {
    ...options,
    tags: 'a,b,c'
  });

  const libsDir = getWorkspaceLayout(tree).libsDir;
  const projectRoot = `${libsDir}/${options.name}`;
  
  const entityFileName = names(options.entity).fileName;  // my-nice-file
  const entityClassName = names(options.entity).className; // MyNiceFile

  const templateOptions = {
    entityFileName,
    entityClassName,
    template: ''
  };

  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    projectRoot,
    templateOptions
  );

  const indexFileName = `${projectRoot}/src/index.ts`;
  const content = tree.read(indexFileName);
  const exportCommand = `export * from './lib/${entityFileName}'`;
  const updated = `${content}\n${exportCommand}\n`;
  tree.write(indexFileName, updated);

  await formatFiles(tree);
}
