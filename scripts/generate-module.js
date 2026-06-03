const fs = require('fs');
const path = require('path');

// 1. Get the module name from the terminal args (e.g., 'npm run generate profile')
const moduleName = process.argv[2];

if(!moduleName){
    console.error('\x1b[31m%s\x1b[0m', '❌ Error: Please provide a module name! (e.g., npm run generate profile)');
    process.exit(1);
}


const name = moduleName.toLowerCase();
const camelCaseName = name.charAt(0).toUpperCase() + name.slice(1);


// 2. Define path mappings
const targetDir = path.join(__dirname, '..', 'src', 'modules', name);


// 3. Define basic template strings for the feature-driven layout
const templates = {
  routes: `import { Router } from 'express';
import * as ${name}Controller from './${name}.controller';

const router = Router();

// Define your ${camelCaseName} module routes here
// router.get('/', ${name}Controller.get${camelCaseName}Data);

export default router;
`,

  controller: `import { Request, Response, NextFunction } from 'express';
import * as ${name}Service from './${name}.service';

export const get${camelCaseName}Data = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Interacting with the service layer
    // const data = await ${name}Service.fetchData();
    return res.status(200).json({ success: true, message: 'Hello from ${camelCaseName} Controller' });
  } catch (error) {
    next(error);
  }
};
`,

  service: `import { prisma } from '../../config/prisma';

// Write your core ${camelCaseName} database operations / business logic here
export const fetchData = async () => {
  // return await prisma.someModel.findMany();
  return { message: 'Data found' };
};
`,

  validation: `import { z } from 'zod';

// Build your structural runtime schema checks here
export const ${name}Schema = z.object({
  body: z.object({
    // field: z.string()
  }),
});
`
};


// 4. Execution Logic
const generateModule = () => {
  try {
    // Prevent overriding existing code accidents
    if (fs.existsSync(targetDir)) {
      console.warn('\x1b[33m%s\x1b[0m', `⚠️ Warning: Module "${name}" already exists at src/modules/${name}. Operation aborted.`);
      return;
    }

    // Create the module folder structure
    fs.mkdirSync(targetDir, { recursive: true });

    // Write all file assets out
    fs.writeFileSync(path.join(targetDir, `${name}.routes.ts`), templates.routes);
    fs.writeFileSync(path.join(targetDir, `${name}.controller.ts`), templates.controller);
    fs.writeFileSync(path.join(targetDir, `${name}.service.ts`), templates.service);
    fs.writeFileSync(path.join(targetDir, `${name}.validation.ts`), templates.validation);

    console.log('\x1b[32m%s\x1b[0m', `\n🚀 Scaffold Complete! Created modern MVC layout for module: "${name}"`);
    console.log(`📍 Location: src/modules/${name}/\n`);
    console.log(`Don't forget to mount it inside your central src/app.ts file!`);

  } catch (error) {
    console.error('\x1b[31m%s\x1b[0m', '💥 Something went wrong during generation:', error);
  }
};


generateModule();