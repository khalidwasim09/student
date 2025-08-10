import { PrismaClient, SSOType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Institutions
  const uniA = await prisma.institution.upsert({
    where: { name: "University A" },
    update: {},
    create: {
      name: "University A",
      ssoType: SSOType.OIDC,
      status: "active",
      oidcConfig: {
        issuer: "https://login.microsoftonline.com/tenant-a/v2.0",
        clientId: "changeme",
        clientSecret: "changeme",
        scopes: ["openid", "email", "profile"],
        claimMappings: { affiliation: "eduperson_affiliation" }
      },
      domains: { create: [{ domain: "unia.ca" }, { domain: "students.unia.ca" }] }
    }
  });

  const uniB = await prisma.institution.upsert({
    where: { name: "University B" },
    update: {},
    create: {
      name: "University B",
      ssoType: SSOType.SAML,
      status: "active",
      samlConfig: {
        entityID: "https://idp.unib.ca/idp/shibboleth",
        idpMetadata: "<EntityDescriptor>...</EntityDescriptor>",
        acsUrl: "http://localhost:3000/api/auth/saml/acs",
        cert: "---BEGIN CERT---...---END CERT---",
        mappings: { affiliation: "eduPersonAffiliation" }
      },
      domains: { create: [{ domain: "unib.ca" }] }
    }
  });

  const collegeC = await prisma.institution.upsert({
    where: { name: "College C" },
    update: {},
    create: {
      name: "College C",
      ssoType: SSOType.NONE,
      status: "active",
      domains: { create: [{ domain: "collegec.ca" }, { domain: "students.collegec.ca" }] }
    }
  });

  console.log({ uniA, uniB, collegeC });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });