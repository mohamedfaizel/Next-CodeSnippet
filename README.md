1. npx create-next-app@latest
2. npm install prisma
3. npx prisma init --datasource-provider sqlite
    <!-- new folder created prisma with file schema.prisma  -->
    <!-- edit schema.prisma (add the db model)  -->
4. npx prisma migrate dev
    <!--  custom commit name need to add -->
    <!-- db setup done -->

<!-- Note: if any error come to missing module like below
module not found :  @prisma/client -->
5. npm add @prisma/client



 <!-- Absolute Path Import Shortcut -->
If you have any issues with the imports, please try one of the following two solutions:

Solution #1 (Latest Versions of Next.js)
Update your tsconfig.json's path field to look like this:

"paths": {
."@/*": ["./src/*"],
"public/*": ["./public/*"]
}
Solution #2

Add a / character in front of public anytime you need to import a static image:

import homeImg from '/public/home.jpg';