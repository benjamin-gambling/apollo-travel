# Migration `20200928235642-init`

This migration has been generated by Benjamin Gambling at 9/28/2020, 4:56:42 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"id" SERIAL,
"email" text   NOT NULL ,
"token" text   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Trip" (
"id" SERIAL,
"launchId" integer   NOT NULL ,
"userId" integer   NOT NULL ,
PRIMARY KEY ("id")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

ALTER TABLE "public"."Trip" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200928235642-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,22 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "postgresql"
+  url = "***"
+}
+
+model User {
+  id    Int    @default(autoincrement()) @id
+  email String @unique
+  token String
+  trips Trip[]
+}
+
+model Trip {
+  id       Int  @default(autoincrement()) @id
+  launchId Int
+  userId   Int
+  User     User @relation(fields: [userId], references: [id])
+}
```


